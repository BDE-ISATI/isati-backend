/// <reference path="../pb_data/types.d.ts" />

routerAdd("POST", "/api/isati/sync-rooms", (e) => {

  const { syncAllRooms } = require(`${__hooks}/utils/rooms.js`)
  const result = syncAllRooms()

  return e.json(result.status === "success" ? 200 : 500, result)

}, $apis.requireSuperuserAuth())
