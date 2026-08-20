/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // remove field
  collection.fields.removeById("text4205489370")

  // remove field
  collection.fields.removeById("text2599078931")

  // remove field
  collection.fields.removeById("text4090994830")

  // add field
  collection.fields.addAt(11, new Field({
    "help": "",
    "hidden": false,
    "id": "select4205489370",
    "maxSelect": 1,
    "name": "school_year",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "1",
      "2",
      "3"
    ]
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "help": "",
    "hidden": false,
    "id": "select2599078931",
    "maxSelect": 0,
    "name": "level",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "ingenieur",
      "preparatoire"
    ]
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "help": "",
    "hidden": false,
    "id": "select4090994830",
    "maxSelect": 0,
    "name": "speciality",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "info",
      "tis",
      "mat",
      "snr"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text4205489370",
    "max": 0,
    "min": 0,
    "name": "school_year",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text2599078931",
    "max": 0,
    "min": 0,
    "name": "level",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text4090994830",
    "max": 0,
    "min": 0,
    "name": "speciality",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select4205489370")

  // remove field
  collection.fields.removeById("select2599078931")

  // remove field
  collection.fields.removeById("select4090994830")

  return app.save(collection)
})
