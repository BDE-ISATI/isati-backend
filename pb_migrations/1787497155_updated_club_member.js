/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2782553478")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2682478530",
    "help": "",
    "hidden": false,
    "id": "relation2780639523",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "clubs",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2782553478")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2682478530",
    "help": "",
    "hidden": false,
    "id": "relation2780639523",
    "maxSelect": 10,
    "minSelect": 0,
    "name": "clubs",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
