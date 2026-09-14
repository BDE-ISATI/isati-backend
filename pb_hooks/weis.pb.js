/// <reference path="..\pb_data\types.d.ts" />


onRecordCreateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"weis", "create")
  e.next()

}, "weis")


onRecordUpdateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"weis", "update")
  e.next()

}, "weis")

onRecordDeleteRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"weis", "delete")
  e.next()

}, "weis")

