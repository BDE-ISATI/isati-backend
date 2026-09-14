/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\" && (status = \"accepted\" || user = @request.auth.id || @request.auth.roles.policies.id ?= \"polviewvalidati\" || (challenge.scope = \"team\" && team.participations_via_team.user ?= @request.auth.id))",
    "viewRule": "@request.auth.id != \"\" && (status = \"accepted\" || user = @request.auth.id || @request.auth.roles.policies.id ?= \"polviewvalidati\" || (challenge.scope = \"team\" && team.participations_via_team.user ?= @request.auth.id))"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\" && (status = \"accepted\" || user = @request.auth.id || @request.auth.roles.policies.id ?= \"polviewvalidati\")",
    "viewRule": "@request.auth.id != \"\" && (status = \"accepted\" || user = @request.auth.id || @request.auth.roles.policies.id ?= \"polviewvalidati\")"
  }, collection)

  return app.save(collection)
})
