/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3345905752")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_z20tiih8ta` ON `policies` (\n  `action`,\n  `resource`\n)"
    ],
    "name": "policies"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3345905752")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_z20tiih8ta` ON `policy` (\n  `action`,\n  `resource`\n)"
    ],
    "name": "policy"
  }, collection)

  return app.save(collection)
})
