/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1113710398")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_3tswo400ln` ON `participations` (\n  `user`,\n  `wei`\n)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1113710398")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_3tswo400ln` ON `participations` (\n  `user`,\n  `wei`\n)"
    ]
  }, collection)

  return app.save(collection)
})
