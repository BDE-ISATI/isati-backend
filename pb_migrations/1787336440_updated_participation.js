/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1113710398")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3824009647",
    "help": "",
    "hidden": false,
    "id": "relation3303056927",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "team",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1113710398")

  // remove field
  collection.fields.removeById("relation3303056927")

  return app.save(collection)
})
