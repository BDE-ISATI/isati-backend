const TEAM_LEADER_ROLE = "team_leader_wei"

function findTeamLeaderRole(app) {
  try {
    return app.findFirstRecordByFilter("roles", "code = {:code}", { code: TEAM_LEADER_ROLE })
  } catch (_) {
    return null
  }
}

function syncTeamLeaderRole(app, userId) {

  if (!userId) return

  const role = findTeamLeaderRole(app)
  if (!role) return

  let user = null
  try {
    user = app.findRecordById("users", userId)
  } catch (_) {
    user = null
  }
  if (!user) return

  let leads = []
  try {
    leads = app.findRecordsByFilter(
      "participations",
      'user = {:userId} && role = "team_leader" && state = "assigned"',
      "", 1, 0, { userId: userId }
    )
  } catch (_) {
    leads = []
  }

  const roles = user.get("roles") || []
  const has = roles.indexOf(role.id) !== -1
  const should = leads.length > 0

  if (has === should) return

  user.set("roles", should ? roles.concat([role.id]) : roles.filter((id) => id !== role.id))
  app.save(user)

}

module.exports = { TEAM_LEADER_ROLE, findTeamLeaderRole, syncTeamLeaderRole }
