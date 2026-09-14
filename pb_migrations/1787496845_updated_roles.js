/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2105053228")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_hcmyglo5ap` ON `roles` (`code`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2105053228")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
