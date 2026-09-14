/// <reference path="..\pb_data\types.d.ts" />


onRecordCreateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"challenge_categories", "create")
  e.next()

}, "challenge_categories")


onRecordUpdateRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"challenge_categories", "update")
  e.next()

}, "challenge_categories")

onRecordDeleteRequest((e) => {

  if (e.hasSuperuserAuth()) {
    return e.next()
  }

  const { checkPermission } = require(`${__hooks}/utils/permissions.js`)
  checkPermission(e,"challenge_categories", "delete")
  e.next()

}, "challenge_categories")

