/// <reference path="..\pb_data\types.d.ts" />


const MAX_PROOF_BYTES = 8 * 1024 * 1024


onRecordCreateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { hasPermission } = require(`${__hooks}/utils/permissions.js`)

  if (hasPermission(e, "validations", "create")) {
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

  e.record.set("team", participation.getString("team"))

  let existing = null
  try {
    existing = $app.findFirstRecordByFilter(
      "validations",
      'challenge = {:challengeId} && user = {:userId} && select != "refused"',
      { challengeId: challenge.id, userId: user.id }
    )
  } catch (_) {
    existing = null
  }

  if (existing) {
    throw new ForbiddenError("Already submitted.", {
      validations: new ValidationError("already_submitted", "Vous avez déjà envoyé une preuve pour ce défi.")
    })
  }

  const proofTypes = challenge.get("proof_type") || []
  const hasFile = !!e.record.get("proof_file")
  const hasText = !!e.record.getString("proof_text")

  if (hasText && proofTypes.indexOf("link") === -1) {
    throw new ForbiddenError("Invalid proof type.", {
      proof_text: new ValidationError("invalid_proof_type", "Ce défi n'accepte pas de preuve sous forme de lien.")
    })
  }

  if (hasFile) {
    const uploads = [].concat(e.record.get("proof_file"))
    for (const upload of uploads) {
      if (!upload || !upload.originalName) continue

      const isVideo = /\.(mp4|mov|m4v|webm|avi|mkv)$/i.test(upload.originalName)
      const kind = isVideo ? "video" : "image"

      if (proofTypes.indexOf(kind) === -1) {
        throw new ForbiddenError("Invalid proof type.", {
          proof_file: new ValidationError("invalid_proof_type", "Ce type de preuve n'est pas accepté pour ce défi.")
        })
      }

      if (upload.size && upload.size > MAX_PROOF_BYTES) {
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

  e.record.set("select", "pending")
  e.record.set("submitted_at", now.toISOString())
  e.record.set("validator", "")
  e.record.set("reviewed_at", "")
  e.record.set("reason", "")
  e.record.set("points_awarded", 0)

  e.next()

}, "validations")


onRecordUpdateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e, "validations", "update")
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

  e.next()

}, "validations")
