/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3824009647")

  // remove field
  collection.fields.removeById("text2198113168")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3824009647")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text2198113168",
    "max": 0,
    "min": 0,
    "name": "faction",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
