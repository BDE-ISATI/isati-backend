/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_413403532")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.roles.code ?= \"organigramme\"",
    "deleteRule": "@request.auth.roles.code ?= \"organigramme\"",
    "updateRule": "@request.auth.roles.code ?= \"organigramme\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_413403532")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.roles ?= \"organigramme_member\"",
    "deleteRule": "@request.auth.roles ?= \"organigramme_member\"",
    "updateRule": "@request.auth.roles ?= \"organigramme_member\""
  }, collection)

  return app.save(collection)
})
