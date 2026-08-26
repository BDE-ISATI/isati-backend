
onRecordEnrich((e) => {

  const info = e.requestInfo

  if (info && info.hasSuperuserAuth()) {
    return e.next()
  }

  const { hasPermission } = require(`${__hooks}/utils/permissions.js`)

  const canView = !!info && !!info.auth && hasPermission(info, "locations", "view")

  if (e.record.getBool("hidden") && !canView) {
    e.record.hide("label")
    e.record.hide("geo_point")
  }

  e.next()

}, "locations")
