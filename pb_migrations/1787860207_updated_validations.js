/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  // remove field
  collection.fields.removeById("text2063623452")

  // add field
  collection.fields.addAt(12, new Field({
    "help": "",
    "hidden": false,
    "id": "select1274211008",
    "maxSelect": 0,
    "name": "select",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "accepted",
      "pending",
      "refused"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text2063623452",
    "max": 0,
    "min": 0,
    "name": "status",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select1274211008")

  return app.save(collection)
})
