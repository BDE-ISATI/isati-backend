

routerAdd("POST", "/api/isati/delete-user", (e) => {
  const data = new DynamicModel({
    password: "",
    id: ""
  })
  e.bindBody(data)


  const targetId = data.id || e.auth.id
  const isSelf = targetId === e.auth.id 
  let record

  if (isSelf) {
    if (!e.auth?.validatePassword(data.password)) {
      throw new BadRequestError("Invalid password.", {
        "password": new ValidationError("invalid_password", "Mot de passe incorrect.")
      })
    }
    record = e.auth
  } else {
    const { hasPermission } = require(`${__hooks}/utils/permissions.js`)
    if (!hasPermission(e, "users", "delete_account")) {
      throw new ForbiddenError("Insufficient permissions.", {
        "account": new ValidationError("insufficient_permissions", "Vous n'avez pas le droit de supprimer ce compte.")
      })
    }
    try {
      record = $app.findRecordById("users", targetId)
    } catch (err) {
      throw new NotFoundError("User not found.", {
        "id": new ValidationError("user_not_found", "Utilisateur introuvable.")
      })
    }
  }

  const originalEmail = record.get("email")
  const originalUsername = record.get("username")

  record.set("email", `${record.id}@deleted.user`)
  record.set("verified", false)
  record.set("username", `deleted_user_${record.id}`)
  record.set("avatar", "")
  record.set("roles", [])
  record.set("account_type", "deleted")
  record.set("username_changed_at", "")
  record.set("deleted", new Date())

  const randomPassword = $security.randomString(30)
  record.set("password", randomPassword)
  record.set("passwordConfirm", randomPassword)

  $app.save(record)

  const { sendDeletedAccountEmail } = require(`${__hooks}/utils/mail.js`)
  sendDeletedAccountEmail(originalEmail, originalUsername)

  return e.json(200, { success: true })
  
}, $apis.requireAuth() )


// Route pour l'inscription au wei
routerAdd("POST","/api/isati/wei/{id_user}/register", (e) => {
    const { hasPermission } = require(`${__hooks}/utils/permissions.js`);

    const caller = e.auth;
    const now = new DateTime();
    const nowStr = now.string();

    const targetId = e.request.pathValue("id_user");

    const isSelf = targetId === caller.id;
    const isAdmin = hasPermission(e, "participations", "create");

    if (!isSelf && !isAdmin) {
      throw new ForbiddenError("Insufficient permissions.", {
        account: new ValidationError("insufficient_permissions","Vous n'avez pas le droit d'inscrire un autre utilisateur.")
      });
    }

    let target = null;
    try {
      target = $app.findRecordById("users", targetId);
    } catch (_) {
      target = null;
    }

    if (!target) {
      throw new NotFoundError("User not found.", {
        id: new ValidationError("user_not_found", "Utilisateur introuvable.")
      });
    }

    if (target.getString("account_type") === "deleted") {
      throw new ForbiddenError("Account deleted.", {
        account: new ValidationError("account_deleted", "Ce compte n'existe plus.")
      });
    }

    if (!target.getBool("verified")) {
      throw new ForbiddenError("Email not verified.", {
        account: new ValidationError("email_not_verified","Cette adresse email n'a pas été vérifiée.")
      });
    }

    if (target.getString("level") !== "ingenieur" || target.getString("school_year") !== "1") {
      throw new ForbiddenError("Insufficient permissions.", {
        account: new ValidationError("insufficient_permissions","Le WEI est réservé aux étudiants de première année du cycle ingénieur.")
      });
    }

    let sanction = null;
    try {
      sanction = $app.findFirstRecordByFilter(
        "status",
        'user = {:userId} && (issued_at = "" || issued_at <= {:now}) && (expires_at = "" || expires_at > {:now})',
        { userId: target.id, now: nowStr }
      );
    } catch (_) {
      sanction = null;
    }

    if (sanction) {
      throw new ForbiddenError("Active sanction.", {
        account: new ValidationError(
          "account_suspended",
          "Ce compte fait l'objet d'une sanction en cours."
        ),
      });
    }

    const filter = isAdmin
      ? 'weekend_ends_at != "" && weekend_ends_at > {:now}'
      : 'registration_opens_at != "" && registration_opens_at <= {:now} && ' +
        'registration_closes_at != "" && registration_closes_at > {:now}';

    const weis = $app.findRecordsByFilter("weis", filter, "-year", 1, 0, { now: nowStr });
    const wei = weis.length ? weis[0] : null;

    if (!wei) {
      throw new BadRequestError("Registrations closed.", {
        wei: new ValidationError("registrations_closed","Les inscriptions au WEI ne sont pas ouvertes.")
      });
    }

    let created;

    $app.runInTransaction((txApp) => {
      let existing = null;
      try {
        existing = txApp.findFirstRecordByFilter("participations","wei = {:weiId} && user = {:userId}",
          { weiId: wei.id, userId: target.id }
        );
      } catch (_) {
        existing = null;
      }

      if (existing) {
        throw new BadRequestError("Already registered.", {
          wei: new ValidationError("already_registered","Cet utilisateur est déjà inscrit à ce WEI.")
        });
      }

      const collection = txApp.findCollectionByNameOrId("participations");
      const record = new Record(collection);

      record.set("wei", wei.id);
      record.set("user", target.id);
      record.set("team", "");
      record.set("role", "student");
      record.set("state", "pending");
      record.set("registered_at", now);

      try {
        txApp.save(record);
      } catch (err) {
        const message = String(err && err.message ? err.message : err);
        if (message.indexOf("UNIQUE") !== -1 || message.indexOf("not_unique") !== -1) {
          throw new BadRequestError("Already registered.", {
            wei: new ValidationError("already_registered","Cet utilisateur est déjà inscrit à ce WEI.")
          });
        }
        throw err;
      }

      created = record;
    });

    return e.json(200, {
      id: created.id,
      wei: wei.id,
      user: target.id,
      state: created.getString("state"),
      role: created.getString("role"),
      registered_at: created.getString("registered_at"),
    });
  },
  $apis.requireAuth()
);