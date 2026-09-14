/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_999103373")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_gsdP")

  // remove field
  collection.fields.removeById("_clone_z83F")

  // remove field
  collection.fields.removeById("_clone_pkMQ")

  // remove field
  collection.fields.removeById("_clone_ixLY")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_wLnb",
    "max": 0,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2369649576",
    "help": "",
    "hidden": false,
    "id": "_clone_nzlJ",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "wei",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_307754106",
    "help": "",
    "hidden": false,
    "id": "_clone_jn3H",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "faction",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_7fBN",
    "max": 0,
    "min": 0,
    "name": "color",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_999103373")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_gsdP",
    "max": 0,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2369649576",
    "help": "",
    "hidden": false,
    "id": "_clone_z83F",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "wei",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_307754106",
    "help": "",
    "hidden": false,
    "id": "_clone_pkMQ",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "faction",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_ixLY",
    "max": 0,
    "min": 0,
    "name": "color",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("_clone_wLnb")

  // remove field
  collection.fields.removeById("_clone_nzlJ")

  // remove field
  collection.fields.removeById("_clone_jn3H")

  // remove field
  collection.fields.removeById("_clone_7fBN")

  return app.save(collection)
})
