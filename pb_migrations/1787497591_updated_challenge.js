/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // remove field
  collection.fields.removeById("text3144380399")

  // add field
  collection.fields.addAt(2, new Field({
    "help": "",
    "hidden": false,
    "id": "select3144380399",
    "maxSelect": 0,
    "name": "difficulty",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text3144380399",
    "max": 0,
    "min": 0,
    "name": "difficulty",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select3144380399")

  return app.save(collection)
})
