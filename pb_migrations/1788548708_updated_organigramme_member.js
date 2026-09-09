/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_413403532")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.roles ?= \"organigramme\"",
    "deleteRule": "@request.auth.roles ?= \"organigramme\"",
    "updateRule": "@request.auth.roles ?= \"organigramme\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_413403532")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.roles ?= \"\"",
    "deleteRule": "",
    "updateRule": ""
  }, collection)

  return app.save(collection)
})
