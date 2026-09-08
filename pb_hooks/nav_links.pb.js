/// <reference path="..\pb_data\types.d.ts" />


onRecordCreateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"nav_links", "create")
  e.next()

}, "nav_links")


onRecordUpdateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"nav_links", "update")
  e.next()

}, "nav_links")

onRecordDeleteRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"nav_links", "delete")
  e.next()

}, "nav_links")
