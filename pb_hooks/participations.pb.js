/// <reference path="..\pb_data\types.d.ts" />


onRecordAfterCreateSuccess((e) => {

  const { syncTeamLeaderRole } = require(`${__hooks}/utils/teamLeader.js`)

  syncTeamLeaderRole($app, e.record.getString("user"))
  e.next()

}, "participations")


onRecordAfterUpdateSuccess((e) => {

  const { syncTeamLeaderRole } = require(`${__hooks}/utils/teamLeader.js`)

  const current = e.record.getString("user")
  const previous = e.record.original().getString("user")

  syncTeamLeaderRole($app, current)
  if (previous && previous !== current) syncTeamLeaderRole($app, previous)

  e.next()

}, "participations")


onRecordAfterDeleteSuccess((e) => {

  const { syncTeamLeaderRole } = require(`${__hooks}/utils/teamLeader.js`)

  syncTeamLeaderRole($app, e.record.getString("user"))
  e.next()

}, "participations")
