/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369649576")

  // add field
  collection.fields.addAt(6, new Field({
    "help": "",
    "hidden": false,
    "id": "date3521798513",
    "max": "",
    "min": "",
    "name": "starting_date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "date3034606667",
    "max": "",
    "min": "",
    "name": "ending_date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369649576")

  // remove field
  collection.fields.removeById("date3521798513")

  // remove field
  collection.fields.removeById("date3034606667")

  return app.save(collection)
})
