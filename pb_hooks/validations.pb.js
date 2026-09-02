/// <reference path="..\pb_data\types.d.ts" />


onRecordCreateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    if (!e.record.getString("reviewed_at") &&
        (e.record.getString("status") === "accepted" || e.record.getString("status") === "refused")) {
      e.record.set("reviewed_at", new Date().toISOString())
    }

    return e.next()
  }

  const { hasPermission } = require(`${__hooks}/utils/permissions.js`)

  if (hasPermission(e, "validations", "create")) {
    if (!e.record.getString("reviewed_at") &&
        (e.record.getString("status") === "accepted" || e.record.getString("status") === "refused")) {
      e.record.set("reviewed_at", new Date().toISOString())
    }

    return e.next()
  }

  const user = e.auth
  const now = new Date()

  e.record.set("user", user.id)

  let challenge = null
  try {
    challenge = $app.findRecordById("challenges", e.record.getString("challenge"))
  } catch (_) {
    challenge = null
  }

  if (!challenge) {
    throw new NotFoundError("Challenge not found.", {
      challenge: new ValidationError("challenge_not_found", "Ce défi n'existe plus.")
    })
  }

  const start = new Date(challenge.getString("start_date"))
  const end = new Date(challenge.getString("end_date"))

  if (start > now || end <= now) {
    throw new ForbiddenError("Challenge closed.", {
      validations: new ValidationError("challenge_closed", "Ce défi n'est pas ouvert aux demandes de validation.")
    })
  }

  let participation = null
  try {
    participation = $app.findFirstRecordByFilter(
      "participations",
      "wei = {:weiId} && user = {:userId}",
      { weiId: challenge.getString("wei"), userId: user.id }
    )
  } catch (_) {
    participation = null
  }

  if (!participation || participation.getString("state") !== "assigned" || !participation.getString("team")) {
    throw new ForbiddenError("Not assigned.", {
      validations: new ValidationError("not_assigned", "Vous devez être inscrit au WEI et affecté à une équipe.")
    })
  }

  if (participation.getString("role") !== "student") {
    throw new ForbiddenError("Team leaders cannot submit proofs.", {
      validations: new ValidationError("leader_cannot_submit", "Les chefs d'équipe ne peuvent pas envoyer de preuve.")
    })
  }

  const teamId = participation.getString("team")
  const isTeamScope = challenge.getString("scope") === "team"

  e.record.set("team", teamId)

  const existingFilter = isTeamScope
    ? 'challenge = {:challengeId} && team = {:teamId} && status != "refused"'
    : 'challenge = {:challengeId} && user = {:userId} && status != "refused"'

  const existingParams = isTeamScope
    ? { challengeId: challenge.id, teamId: teamId }
    : { challengeId: challenge.id, userId: user.id }

  let existing = null
  try {
    existing = $app.findFirstRecordByFilter("validations", existingFilter, existingParams)
  } catch (_) {
    existing = null
  }

  if (existing) {
    if (isTeamScope) {
      throw new ForbiddenError("Already submitted by team.", {
        validations: new ValidationError("team_already_submitted", "Une preuve a déjà été envoyée par ton équipe pour ce défi.")
      })
    }

    throw new ForbiddenError("Already submitted.", {
      validations: new ValidationError("already_submitted", "Vous avez déjà envoyé une preuve pour ce défi.")
    })
  }

  const proofTypes = challenge.get("proof_type") || []
  const uploads = [].concat(e.record.get("proof_file") || []).filter((upload) => !!upload)
  const hasFile = uploads.length > 0
  const hasText = !!e.record.getString("proof_text")

  if (hasText && proofTypes.indexOf("link") === -1) {
    throw new ForbiddenError("Invalid proof type.", {
      proof_text: new ValidationError("invalid_proof_type", "Ce défi n'accepte pas de preuve sous forme de lien.")
    })
  }

  if (hasFile) {
    const maxProofs = challenge.getInt("proof_count") || 1

    if (uploads.length > maxProofs) {
      throw new BadRequestError("Too many proof files.", {
        proof_file: new ValidationError("too_many_files", "Vous avez joint trop de fichiers pour ce défi.")
      })
    }

    for (const upload of uploads) {
      if (!upload.originalName) continue

      const isVideo = /\.(mp4|mov|m4v|webm|avi|mkv)$/i.test(upload.originalName)
      const kind = isVideo ? "video" : "image"

      if (proofTypes.indexOf(kind) === -1) {
        throw new ForbiddenError("Invalid proof type.", {
          proof_file: new ValidationError("invalid_proof_type", "Ce type de preuve n'est pas accepté pour ce défi.")
        })
      }

      const maxProofBytes = 8 * 1024 * 1024

      if (upload.size && upload.size > maxProofBytes) {
        throw new BadRequestError("Proof too large.", {
          proof_file: new ValidationError("validation_file_size_limit", "Ce fichier est trop lourd.")
        })
      }
    }
  }

  if (!hasFile && !hasText) {
    throw new BadRequestError("Missing proof.", {
      proof_file: new ValidationError("validation_required", "Une preuve est requise.")
    })
  }

  e.record.set("status", "pending")
  e.record.set("submitted_at", now.toISOString())
  e.record.set("validator", "")
  e.record.set("reviewed_at", "")
  e.record.set("reason", "")
  e.record.set("points_awarded", 0)

  e.next()

}, "validations")


onRecordUpdateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    if (!e.record.getString("reviewed_at") &&
        (e.record.getString("status") === "accepted" || e.record.getString("status") === "refused")) {
      e.record.set("reviewed_at", new Date().toISOString())
    }

    return e.next()
  }

  const { checkPermission, checkNoUnauthorizedFieldChanges } = require(`${__hooks}/utils/permissions.js`)

  checkPermission(e, "validations", "update")
  checkNoUnauthorizedFieldChanges(e, ["status", "reason", "points_awarded"])

  if (e.record.getString("user") === e.auth.id) {
    throw new ForbiddenError("Cannot review own validation.", {
      validations: new ValidationError("own_validation", "Vous ne pouvez pas valider votre propre preuve.")
    })
  }

  const status = e.record.getString("status")

  if (status !== "accepted" && status !== "refused") {
    throw new BadRequestError("Invalid status.", {
      status: new ValidationError("invalid_status", "Statut de validation invalide.")
    })
  }

  if (status === "refused") {
    if (!e.record.getString("reason").trim()) {
      throw new BadRequestError("Missing reason.", {
        reason: new ValidationError("validation_required", "Un motif est requis pour refuser cette preuve.")
      })
    }
    e.record.set("points_awarded", 0)
  }

  if (status === "accepted") {
    let challenge = null
    try {
      challenge = $app.findRecordById("challenges", e.record.getString("challenge"))
    } catch (_) {
      challenge = null
    }

    if (!challenge) {
      throw new NotFoundError("Challenge not found.", {
        challenge: new ValidationError("challenge_not_found", "Ce défi n'existe plus.")
      })
    }

    const points = e.record.getInt("points_awarded")

    if (!Number.isInteger(points) || points < 0) {
      throw new BadRequestError("Invalid points.", {
        points_awarded: new ValidationError("invalid_points", "Le nombre de points attribués est invalide.")
      })
    }

    e.record.set("points_awarded", points)
  }

  e.record.set("validator", e.auth.id)
  e.record.set("reviewed_at", new Date().toISOString())

  e.next()

}, "validations")


onRecordDeleteRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e, "validations", "delete")
  e.next()

}, "validations")


onRecordEnrich((e) => {

  const info = e.requestInfo

  if (info && info.hasSuperuserAuth()) {
    return e.next()
  }

  const { hasPermission } = require(`${__hooks}/utils/permissions.js`)

  const isOwner = !!info && !!info.auth && info.auth.id === e.record.getString("user")
  const canView = !!info && !!info.auth && hasPermission(info, "validations", "view")

  if (!isOwner && !canView && !e.record.getBool("public")) {
    e.record.hide("proof_file")
    e.record.hide("proof_text")
  }

  if (!isOwner && !canView) {
    e.record.hide("reason")
    e.record.hide("validator")
  }

  e.next()

}, "validations")
