/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_307754106")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_5b61kilvz5` ON `factions` (\n  `wei`,\n  `name`\n)"
    ],
    "name": "factions"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_307754106")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_5b61kilvz5` ON `faction` (\n  `wei`,\n  `name`\n)"
    ],
    "name": "faction"
  }, collection)

  return app.save(collection)
})
