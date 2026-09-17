/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  collection.listRule = "@request.auth.id != \"\" && (public = true || user = @request.auth.id || @request.auth.roles.policies.id ?= \"polviewvalidati\" || (challenge.scope = \"team\" && team.participations_via_team.user ?= @request.auth.id))"
  collection.viewRule = collection.listRule

  collection.fields.addAt(5, new Field({
    "help": "", "hidden": false, "id": "file1989596663", "maxSelect": 10,
    "maxSize": 8388608, "mimeTypes": [], "name": "proof_file", "presentable": false,
    "protected": true, "required": false, "system": false, "thumbs": [], "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  collection.listRule = "@request.auth.id != \"\" && (status = \"accepted\" || user = @request.auth.id || @request.auth.roles.policies.id ?= \"polviewvalidati\" || (challenge.scope = \"team\" && team.participations_via_team.user ?= @request.auth.id))"
  collection.viewRule = collection.listRule

  collection.fields.addAt(5, new Field({
    "help": "", "hidden": false, "id": "file1989596663", "maxSelect": 10,
    "maxSize": 8388608, "mimeTypes": [], "name": "proof_file", "presentable": false,
    "protected": false, "required": false, "system": false, "thumbs": [], "type": "file"
  }))

  return app.save(collection)
})
