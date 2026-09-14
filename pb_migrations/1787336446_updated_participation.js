/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1113710398")

  // remove field
  collection.fields.removeById("text2809058197")

  // remove field
  collection.fields.removeById("text694999214")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1113710398")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text2809058197",
    "max": 0,
    "min": 0,
    "name": "user_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text694999214",
    "max": 0,
    "min": 0,
    "name": "team_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
