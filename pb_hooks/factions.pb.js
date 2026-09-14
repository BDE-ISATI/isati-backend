/// <reference path="..\pb_data\types.d.ts" />


onRecordCreateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"factions", "create")
  e.next()

}, "factions")


onRecordUpdateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"factions", "update")
  e.next()

}, "factions")


onRecordDeleteRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"factions", "delete")

  let teams = []
  try {
    teams = $app.findRecordsByFilter("teams", "faction = {:factionId}", "", 500, 0, { factionId: e.record.id })
  } catch (_) {
    teams = []
  }

  if (teams.length) {
    throw new BadRequestError("Faction not empty.", {
      factions: new ValidationError(
        "faction_has_teams",
        `Cette faction contient encore ${teams.length} équipe(s). Retirez-les de la faction ou supprimez-les avant de la supprimer.`
      )
    })
  }

  e.next()

}, "factions")
