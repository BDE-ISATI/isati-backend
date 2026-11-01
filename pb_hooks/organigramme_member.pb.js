/// <reference path="..\pb_data\types.d.ts" />


onRecordCreateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e, "organigramme_member", "create")
  e.next()

}, "organigramme_member")


onRecordUpdateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e, "organigramme_member", "update")
  e.next()

}, "organigramme_member")


onRecordDeleteRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e, "organigramme_member", "delete")
  e.next()

}, "organigramme_member")
