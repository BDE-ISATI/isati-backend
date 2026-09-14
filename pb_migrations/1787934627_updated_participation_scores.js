/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_317378423")

  // update collection data
  unmarshal({
    "viewQuery": " SELECT\n    p.id AS id,\n    p.user AS user,\n    p.wei AS wei,\n    p.team AS team,\n    p.role,\n    p.state,\n    CAST(COALESCE(SUM(v.points_awarded), 0) AS INT) AS score,\n    COUNT(v.id) AS validations_count\n  FROM participations p\n  LEFT JOIN validations v\n    ON v.user = p.user\n    AND v.team = p.team\n    AND v.status = 'accepted'\n  GROUP BY p.id"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_acV9")

  // remove field
  collection.fields.removeById("_clone_JOMm")

  // remove field
  collection.fields.removeById("_clone_7Z7w")

  // remove field
  collection.fields.removeById("_clone_09Z3")

  // remove field
  collection.fields.removeById("json848901969")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_clone_u0Y2",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2369649576",
    "help": "",
    "hidden": false,
    "id": "_clone_SK4P",
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
    "collectionId": "pbc_3824009647",
    "help": "",
    "hidden": false,
    "id": "_clone_2Kb8",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "team",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "help": "",
    "hidden": false,
    "id": "_clone_1ZU7",
    "maxSelect": 0,
    "name": "role",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "team_leader",
      "student"
    ]
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "_clone_TnOq",
    "maxSelect": 0,
    "name": "state",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "pending",
      "assigned",
      "cancelled"
    ]
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
  const collection = app.findCollectionByNameOrId("pbc_317378423")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  p.id AS id,\n  p.user AS user,\n  p.wei AS wei,\n  p.team AS team,\n  p.role,\n  COALESCE(SUM(v.points_awarded), 0) AS score,\n  COUNT(v.id) AS validations_count\nFROM participations p\nLEFT JOIN validations v\n  ON v.user = p.user\n  AND v.team = p.team\n  AND v.status = 'accepted'\nGROUP BY p.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_clone_acV9",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2369649576",
    "help": "",
    "hidden": false,
    "id": "_clone_JOMm",
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
    "collectionId": "pbc_3824009647",
    "help": "",
    "hidden": false,
    "id": "_clone_7Z7w",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "team",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "help": "",
    "hidden": false,
    "id": "_clone_09Z3",
    "maxSelect": 0,
    "name": "role",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "team_leader",
      "student"
    ]
  }))

  // add field
  collection.fields.addAt(5, new Field({
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
  collection.fields.removeById("_clone_u0Y2")

  // remove field
  collection.fields.removeById("_clone_SK4P")

  // remove field
  collection.fields.removeById("_clone_2Kb8")

  // remove field
  collection.fields.removeById("_clone_1ZU7")

  // remove field
  collection.fields.removeById("_clone_TnOq")

  // remove field
  collection.fields.removeById("number848901969")

  return app.save(collection)
})
