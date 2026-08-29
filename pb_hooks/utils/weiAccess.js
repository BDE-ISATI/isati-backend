function isWeiParticipant(userId) {

  if (!userId) return false

  let found = []
  try {
    found = $app.findRecordsByFilter("participations", "user = {:userId}", "", 1, 0, { userId: userId })
  } catch (_) {
    found = []
  }

  return found.length > 0

}

function checkWeiAccess(e, resource) {

  if (e.hasSuperuserAuth()) return

  const { hasPermission } = require(`${__hooks}/utils/permissions.js`)

  if (!e.auth) {
    throw new ForbiddenError("Not a WEI participant.", {
      account: new ValidationError("not_registered", "Vous devez être inscrit au WEI pour accéder à cette page.")
    })
  }

  if (hasPermission(e, resource, "view") || hasPermission(e, "wei_panel", "view")) return

  if (!isWeiParticipant(e.auth.id)) {
    throw new ForbiddenError("Not a WEI participant.", {
      account: new ValidationError("not_registered", "Vous devez être inscrit au WEI pour accéder à cette page.")
    })
  }

}

module.exports = { isWeiParticipant, checkWeiAccess }
