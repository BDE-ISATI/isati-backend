/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // update collection data
  unmarshal({
    "name": "clubs"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // update collection data
  unmarshal({
    "name": "club"
  }, collection)

  return app.save(collection)
})
