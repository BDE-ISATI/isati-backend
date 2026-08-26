/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // update collection data
  unmarshal({
    "name": "challenges"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // update collection data
  unmarshal({
    "name": "challenge"
  }, collection)

  return app.save(collection)
})
