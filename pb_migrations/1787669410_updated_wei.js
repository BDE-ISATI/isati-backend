/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369649576")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ozzj9dbvj5` ON `weis` (`year`)"
    ],
    "name": "weis"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369649576")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ozzj9dbvj5` ON `wei` (`year`)"
    ],
    "name": "wei"
  }, collection)

  return app.save(collection)
})
