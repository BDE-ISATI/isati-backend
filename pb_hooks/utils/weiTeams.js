const PARCOURS_CACHE_TTL = 30 * 1000
const parcoursCache = {}

function parcoursStarted(weiId) {

  if (!weiId) return false

  const now = Date.now()
  const cached = parcoursCache[weiId]
  if (cached && now - cached.ts < PARCOURS_CACHE_TTL) return cached.started

  let wei = null
  try {
    wei = $app.findRecordById("weis", weiId)
  } catch (_) {
    wei = null
  }

  const startsAt = wei ? wei.getString("parcours_starts_at") : ""
  const started = !!startsAt && new Date(startsAt) <= new Date()

  parcoursCache[weiId] = { started: started, ts: now }

  return started

}

function isRevealed(e) {

  const info = e.requestInfo

  if (info && info.hasSuperuserAuth()) return true

  const { hasPermission } = require(`${__hooks}/utils/permissions.js`)

  const canView = !!info && !!info.auth && hasPermission(info, "teams", "view")

  return canView || parcoursStarted(e.record.getString("wei"))

}

function checkFaction(record) {

  const factionId = record.getString("faction")

  if (!factionId) return

  let faction = null
  try {
    faction = $app.findRecordById("factions", factionId)
  } catch (_) {
    faction = null
  }

  if (!faction) {
    throw new NotFoundError("Faction not found.", {
      faction: new ValidationError("faction_not_found", "Cette faction n'existe plus.")
    })
  }

  if (faction.getString("wei") !== record.getString("wei")) {
    throw new BadRequestError("Faction from another WEI.", {
      faction: new ValidationError("faction_not_found", "Cette faction appartient à un autre WEI.")
    })
  }

}

function teamMemberContext(e, action) {

  const { hasPermission } = require(`${__hooks}/utils/permissions.js`)

  if (!hasPermission(e, "participations", action)) {
    throw new ForbiddenError("Insufficient permissions.", {
      account: new ValidationError("insufficient_permissions", "Vous n'avez pas le droit de gérer les équipes.")
    })
  }

  const teamId = e.request.pathValue("id_team")
  const userId = e.request.pathValue("id_user")

  let team = null
  try {
    team = $app.findRecordById("teams", teamId)
  } catch (_) {
    team = null
  }

  if (!team) {
    throw new NotFoundError("Team not found.", {
      teams: new ValidationError("team_not_found", "Cette équipe n'existe plus.")
    })
  }

  let target = null
  try {
    target = $app.findRecordById("users", userId)
  } catch (_) {
    target = null
  }

  if (!target) {
    throw new NotFoundError("User not found.", {
      id: new ValidationError("user_not_found", "Utilisateur introuvable.")
    })
  }

  return { team: team, target: target }

}

function memberPayload(record) {
  return {
    id: record.id,
    wei: record.getString("wei"),
    user: record.getString("user"),
    team: record.getString("team"),
    role: record.getString("role"),
    state: record.getString("state"),
  }
}

module.exports = { parcoursStarted, isRevealed, checkFaction, teamMemberContext, memberPayload }
