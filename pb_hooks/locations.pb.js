
onRecordEnrich((e) => {

  const info = e.requestInfo

  if (info && info.hasSuperuserAuth()) {
    return e.next()
  }

  const { hasPermission } = require(`${__hooks}/utils/permissions.js`)

  const canView = !!info && !!info.auth && hasPermission(info, "locations", "view")

  if (e.record.getBool("hidden") && !canView) {
    e.record.hide("label")
  }

  e.next()

}, "locations")
  

onRecordCreateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"locations", "create")
  e.next()

}, "locations")

onRecordUpdateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"locations", "update")
  e.next()

}, "locations")

onRecordDeleteRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"locations", "delete")
  e.next()

}, "locations")