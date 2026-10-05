/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_413403532")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.role.code ?= \"test\"",
    "deleteRule": "@request.auth.role.code ?= \"test\"",
    "updateRule": "@request.auth.role.code ?= \"test\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_413403532")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "updateRule": null
  }, collection)

  return app.save(collection)
})
