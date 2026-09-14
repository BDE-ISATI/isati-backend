/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4049539787")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_0gsnixhfnt` ON `challenge_categories` (\n  `wei`,\n  `name`\n)"
    ],
    "name": "challenge_categories"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4049539787")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_0gsnixhfnt` ON `challenge_category` (\n  `wei`,\n  `name`\n)"
    ],
    "name": "challenge_category"
  }, collection)

  return app.save(collection)
})
