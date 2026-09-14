/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3824009647")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_307754106",
    "help": "",
    "hidden": false,
    "id": "relation2198113168",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "faction",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3824009647")

  // remove field
  collection.fields.removeById("relation2198113168")

  return app.save(collection)
})
