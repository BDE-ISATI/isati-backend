/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1113710398")

  // add field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "select2744374011",
    "maxSelect": 0,
    "name": "state",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "pending",
      "assigned",
      "cancelled"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1113710398")

  // remove field
  collection.fields.removeById("select2744374011")

  return app.save(collection)
})
