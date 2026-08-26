/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369649576")

  // add field
  collection.fields.addAt(9, new Field({
    "help": "",
    "hidden": false,
    "id": "bool1744463908",
    "name": "show_location",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "help": "",
    "hidden": false,
    "id": "date4104852516",
    "max": "",
    "min": "",
    "name": "registration_opens_at",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(11, new Field({
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

  // add field
  collection.fields.addAt(12, new Field({
    "help": "",
    "hidden": false,
    "id": "date3994729170",
    "max": "",
    "min": "",
    "name": "reveal_at",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "help": "",
    "hidden": false,
    "id": "json3236660602",
    "maxSize": 0,
    "name": "default_points",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369649576")

  // remove field
  collection.fields.removeById("bool1744463908")

  // remove field
  collection.fields.removeById("date4104852516")

  // remove field
  collection.fields.removeById("date1937887292")

  // remove field
  collection.fields.removeById("date3994729170")

  // remove field
  collection.fields.removeById("json3236660602")

  return app.save(collection)
})
