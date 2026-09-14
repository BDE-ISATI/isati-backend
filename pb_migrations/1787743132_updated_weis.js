/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369649576")

  // remove field
  collection.fields.removeById("bool1744463908")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369649576")

  // add field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "bool1744463908",
    "name": "show_location",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
