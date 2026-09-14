/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1190895234")

  // remove field
  collection.fields.removeById("text1629030962")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2682478530",
    "help": "",
    "hidden": false,
    "id": "relation3102619762",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "club",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1190895234")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text1629030962",
    "max": 0,
    "min": 0,
    "name": "club_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("relation3102619762")

  return app.save(collection)
})
