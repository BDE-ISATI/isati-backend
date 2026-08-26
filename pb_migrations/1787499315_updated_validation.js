/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  // add field
  collection.fields.addAt(4, new Field({
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

  // add field
  collection.fields.addAt(12, new Field({
    "help": "",
    "hidden": false,
    "id": "number1552744523",
    "max": null,
    "min": null,
    "name": "points_awarded",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  // remove field
  collection.fields.removeById("relation3303056927")

  // remove field
  collection.fields.removeById("number1552744523")

  return app.save(collection)
})
