/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_999103373")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  t.id AS id,\n  t.name AS name,\n  t.wei AS wei,\n  t.faction AS faction,\n  t.color AS color,\n  COALESCE(SUM(v.points_awarded), 0) AS score,\n  COUNT(v.id) AS validations_count\nFROM teams t\nLEFT JOIN validations v\n  ON v.team = t.id\n  AND v.status = 'accepted'\nGROUP BY t.id"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_wLnb")

  // remove field
  collection.fields.removeById("_clone_nzlJ")

  // remove field
  collection.fields.removeById("_clone_jn3H")

  // remove field
  collection.fields.removeById("_clone_7fBN")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_3Y6j",
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
    "id": "_clone_vJYF",
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
    "id": "_clone_VmmI",
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
    "id": "_clone_gNdu",
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
    "viewQuery": "SELECT\n  t.id                                AS id,\n  t.name                              AS name,\n  t.wei                               AS wei,\n  t.faction                           AS faction,\n  t.color                             AS color,\n  COALESCE(SUM(v.points_awarded), 0)  AS score,\n  COUNT(v.id)                         AS validations_count\nFROM teams t\nLEFT JOIN validations v\n  ON v.team = t.id\n  AND v.status = 'accepted'\nGROUP BY t.id"
  }, collection)

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

  // remove field
  collection.fields.removeById("_clone_3Y6j")

  // remove field
  collection.fields.removeById("_clone_vJYF")

  // remove field
  collection.fields.removeById("_clone_VmmI")

  // remove field
  collection.fields.removeById("_clone_gNdu")

  return app.save(collection)
})
