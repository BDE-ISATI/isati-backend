/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3824009647")

  // update collection data
  unmarshal({
    "name": "teams"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3824009647")

  // update collection data
  unmarshal({
    "name": "team"
  }, collection)

  return app.save(collection)
})
