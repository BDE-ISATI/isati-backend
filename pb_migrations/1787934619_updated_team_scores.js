/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_999103373")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n    t.id AS id,\n    t.name AS name,\n    t.wei AS wei,\n    t.faction AS faction,\n    t.color AS color,\n    t.description,\n    CAST(COALESCE(SUM(v.points_awarded), 0) AS INT) AS score,\n    COUNT(v.id) AS validations_count\n  FROM teams t\n  LEFT JOIN validations v\n    ON v.team = t.id\n    AND v.status = 'accepted'\n  GROUP BY t.id"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_ZGiT")

  // remove field
  collection.fields.removeById("_clone_cOWg")

  // remove field
  collection.fields.removeById("_clone_7VR0")

  // remove field
  collection.fields.removeById("_clone_EKzT")

  // remove field
  collection.fields.removeById("_clone_JVzo")

  // remove field
  collection.fields.removeById("json848901969")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_4Azh",
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
    "id": "_clone_jEDV",
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
    "id": "_clone_02rf",
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
    "id": "_clone_wrp0",
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

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_nIxl",
    "max": 0,
    "min": 0,
    "name": "description",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "help": "",
    "hidden": false,
    "id": "number848901969",
    "max": null,
    "min": null,
    "name": "score",
    "onlyInt": true,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_999103373")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  t.id AS id,\n  t.name AS name,\n  t.wei AS wei,\n  t.faction AS faction,\n  t.color AS color,\n  t.description,\n  COALESCE(SUM(v.points_awarded), 0) AS score,\n  COUNT(v.id) AS validations_count\nFROM teams t\nLEFT JOIN validations v\n  ON v.team = t.id\n  AND v.status = 'accepted'\nGROUP BY t.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_ZGiT",
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
    "id": "_clone_cOWg",
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
    "id": "_clone_7VR0",
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
    "id": "_clone_EKzT",
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

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_JVzo",
    "max": 0,
    "min": 0,
    "name": "description",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "help": "",
    "hidden": false,
    "id": "json848901969",
    "maxSize": 1,
    "name": "score",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("_clone_4Azh")

  // remove field
  collection.fields.removeById("_clone_jEDV")

  // remove field
  collection.fields.removeById("_clone_02rf")

  // remove field
  collection.fields.removeById("_clone_wrp0")

  // remove field
  collection.fields.removeById("_clone_nIxl")

  // remove field
  collection.fields.removeById("number848901969")

  return app.save(collection)
})
