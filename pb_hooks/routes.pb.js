

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
    throw new BadRequestError("Invalid password.", {
      "password": new ValidationError("invalid_password", "Mot de passe incorrect.")
    })
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