

onRecordEnrich((e) => {

  const { isRevealed } = require(`${__hooks}/utils/weiTeams.js`)

  if (!isRevealed(e)) {
    e.record.hide("name")
    e.record.hide("description")
    e.record.hide("color")
    e.record.hide("faction")
  }

  e.next()

}, "teams")


onRecordEnrich((e) => {

  const { isRevealed } = require(`${__hooks}/utils/weiTeams.js`)

  if (!isRevealed(e)) {
    e.record.hide("name")
    e.record.hide("description")
    e.record.hide("color")
    e.record.hide("faction")
    e.record.hide("score")
    e.record.hide("validations_count")
  }

  e.next()

}, "team_scores")


onRecordEnrich((e) => {

  const { isRevealed } = require(`${__hooks}/utils/weiTeams.js`)

  if (!isRevealed(e)) {
    e.record.hide("team")
    e.record.hide("role")
    e.record.hide("score")
    e.record.hide("validations_count")
  }

  e.next()

}, "participation_scores")


onRecordCreateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  const { checkFaction } = require(`${__hooks}/utils/weiTeams.js`)

  checkPermission(e,"teams", "create")
  checkFaction(e.record)

  e.next()

}, "teams")


onRecordUpdateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  const { checkFaction } = require(`${__hooks}/utils/weiTeams.js`)

  checkPermission(e,"teams", "update")
  checkFaction(e.record)

  e.next()

}, "teams")


onRecordDeleteRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"teams", "delete")

  let members = []
  try {
    members = $app.findRecordsByFilter("participations", "team = {:teamId}", "", 500, 0, { teamId: e.record.id })
  } catch (_) {
    members = []
  }

  if (members.length) {
    throw new BadRequestError("Team not empty.", {
      teams: new ValidationError(
        "team_not_empty",
        `Cette équipe compte encore ${members.length} membre(s). Retirez-les avant de la supprimer.`
      )
    })
  }

  e.next()

}, "teams")


onRecordsListRequest((e) => {

  const { checkWeiAccess } = require(`${__hooks}/utils/weiAccess.js`)
  checkWeiAccess(e, "teams")
  e.next()

}, "teams", "team_scores", "participation_scores")


onRecordViewRequest((e) => {

  const { checkWeiAccess } = require(`${__hooks}/utils/weiAccess.js`)
  checkWeiAccess(e, "teams")
  e.next()

}, "teams", "team_scores", "participation_scores")
