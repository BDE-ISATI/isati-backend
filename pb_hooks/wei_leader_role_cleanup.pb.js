/// <reference path="..\pb_data\types.d.ts" />

cronAdd("wei_leader_role_cleanup", "0 4 * * *", () => {

  const { findTeamLeaderRole, TEAM_LEADER_ROLE } = require(`${__hooks}/utils/teamLeader.js`)

  const role = findTeamLeaderRole($app)

  if (!role) {
    $app.logger().warn("wei_leader_role_cleanup: role introuvable", "code", TEAM_LEADER_ROLE)
    return
  }

  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().replace("T", " ")

  let holders = []
  try {
    holders = $app.findRecordsByFilter("users", "roles ?= {:roleId}", "", 500, 0, { roleId: role.id })
  } catch (_) {
    holders = []
  }

  let removed = 0

  for (const user of holders) {

    let active = null
    try {
      active = $app.findFirstRecordByFilter(
        "participations",
        'user = {:userId} && role = "team_leader" && state = "assigned" && ' +
          '(wei.weekend_ends_at = "" || wei.weekend_ends_at > {:cutoff})',
        { userId: user.id, cutoff: cutoff }
      )
    } catch (_) {
      active = null
    }

    if (active) continue

    try {
      user.set("roles", (user.get("roles") || []).filter((id) => id !== role.id))
      $app.save(user)
      removed++
    } catch (err) {
      $app.logger().error("wei_leader_role_cleanup: echec", "user", user.id, "error", String(err))
    }
  }

  $app.logger().info("wei_leader_role_cleanup", "removed", removed)

})
