/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2782553478")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_zyph5ri9i2` ON `club_member` (\n  `club`,\n  `user`\n)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2782553478")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
