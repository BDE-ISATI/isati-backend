
onRecordEnrich((e) => {

  const info = e.requestInfo

  if (info && info.hasSuperuserAuth()) {
    return e.next()
  }

  const { hasPermission } = require(`${__hooks}/utils/permissions.js`)

  const canView = !!info && !!info.auth && hasPermission(info, "challenges", "view")
  const isNotYetLive = new Date(e.record.get("start_date")) > new Date()

  if (!canView && isNotYetLive) {
    e.record.hide("difficulty")
    e.record.hide("description")
    e.record.hide("image")
    e.record.hide("phase")
    e.record.hide("scope")
    e.record.hide("type")
    e.record.hide("points")
    e.record.hide("end_date")
    e.record.hide("proof_type")
    e.record.hide("category")
    e.record.hide("location")
    e.record.set("title", "Prochain defi")
  }

  e.next()

}, "challenges")
