/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2473161100")

  // update collection data
  unmarshal({
    "name": "articles"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2473161100")

  // update collection data
  unmarshal({
    "name": "article"
  }, collection)

  return app.save(collection)
})
