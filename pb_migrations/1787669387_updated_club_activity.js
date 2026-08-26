/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1190895234")

  // update collection data
  unmarshal({
    "name": "club_activities"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1190895234")

  // update collection data
  unmarshal({
    "name": "club_activity"
  }, collection)

  return app.save(collection)
})
