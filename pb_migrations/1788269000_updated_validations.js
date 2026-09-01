/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\" && (status = \"accepted\" || user = @request.auth.id || @request.auth.roles.policies.id ?= \"polviewvalidati\")",
    "viewRule": "@request.auth.id != \"\" && (status = \"accepted\" || user = @request.auth.id || @request.auth.roles.policies.id ?= \"polviewvalidati\")"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\" && (status = \"accepted\" || user = @request.auth.id || @request.auth.roles.policies.id ?= \"fi9adh0aiouo8s4\" || @request.auth.roles.policies.id ?= \"xzykzjtrwqela79\")",
    "viewRule": "@request.auth.id != \"\" && (status = \"accepted\" || user = @request.auth.id || @request.auth.roles.policies.id ?= \"fi9adh0aiouo8s4\" || @request.auth.roles.policies.id ?= \"xzykzjtrwqela79\")"
  }, collection)

  return app.save(collection)
})
