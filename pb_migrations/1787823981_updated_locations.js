/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1942858786")

  // remove field
  collection.fields.removeById("geoPoint1587448267")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1942858786")

  // add field
  collection.fields.addAt(2, new Field({
    "help": "",
    "hidden": false,
    "id": "geoPoint1587448267",
    "name": "geo_point",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "geoPoint"
  }))

  return app.save(collection)
})
