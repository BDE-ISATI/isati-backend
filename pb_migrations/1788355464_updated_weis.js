/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369649576")

  // remove field
  collection.fields.removeById("date1937887292")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369649576")

  // add field
  collection.fields.addAt(8, new Field({
    "help": "",
    "hidden": false,
    "id": "date1937887292",
    "max": "",
    "min": "",
    "name": "registration_closes_at",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
