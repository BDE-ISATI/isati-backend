/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // update field
  collection.fields.addAt(13, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_4049539787",
    "help": "",
    "hidden": false,
    "id": "relation105650625",
    "maxSelect": 10,
    "minSelect": 0,
    "name": "category",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // update field
  collection.fields.addAt(13, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4049539787",
    "help": "",
    "hidden": false,
    "id": "relation105650625",
    "maxSelect": 10,
    "minSelect": 0,
    "name": "category",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
