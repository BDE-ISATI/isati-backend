/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // add field
  collection.fields.addAt(16, new Field({
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // remove field
  collection.fields.removeById("relation105650625")

  return app.save(collection)
})
