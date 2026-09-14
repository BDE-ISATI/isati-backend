/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1113710398")

  // update collection data
  unmarshal({
    "name": "participations"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1113710398")

  // update collection data
  unmarshal({
    "name": "participation"
  }, collection)

  return app.save(collection)
})
