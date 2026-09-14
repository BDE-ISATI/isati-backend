/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_317378423")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  p.id       AS id,\n  p.user     AS user,\n  p.wei      AS wei,\n  p.team     AS team,\n  p.role,\n  p.state,\n  CAST(COALESCE(SUM(v.points_awarded), 0) AS INT) AS score,\n  COUNT(v.id)                                     AS validations_count\nFROM participations p\nLEFT JOIN validations v\n  ON v.user = p.user\n  AND v.team = p.team\n  AND v.status = 'accepted'\n  AND EXISTS (\n    SELECT 1 FROM challenges c\n    WHERE c.id = v.challenge AND c.scope = 'individual'\n  )\nWHERE p.role = 'student'\nGROUP BY p.id"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_p0NT")

  // remove field
  collection.fields.removeById("_clone_eOSS")

  // remove field
  collection.fields.removeById("_clone_kySn")

  // remove field
  collection.fields.removeById("_clone_jyzV")

  // remove field
  collection.fields.removeById("_clone_clS4")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_clone_sV9X",
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
    "id": "_clone_oCml",
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
    "id": "_clone_lD5U",
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
    "id": "_clone_Cvo9",
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
    "id": "_clone_TbG3",
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_317378423")

  // update collection data
  unmarshal({
    "viewQuery": " SELECT\n    p.id AS id,\n    p.user AS user,\n    p.wei AS wei,\n    p.team AS team,\n    p.role,\n    p.state,\n    CAST(COALESCE(SUM(v.points_awarded), 0) AS INT) AS score,\n    COUNT(v.id) AS validations_count \n FROM participations p\n LEFT JOIN validations v\n   ON v.user = p.user\n   AND v.team = p.team\n   AND v.status = 'accepted'\n WHERE p.role = 'student'\n GROUP BY p.id\n"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_clone_p0NT",
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
    "id": "_clone_eOSS",
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
    "id": "_clone_kySn",
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
    "id": "_clone_jyzV",
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
    "id": "_clone_clS4",
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

  // remove field
  collection.fields.removeById("_clone_sV9X")

  // remove field
  collection.fields.removeById("_clone_oCml")

  // remove field
  collection.fields.removeById("_clone_lD5U")

  // remove field
  collection.fields.removeById("_clone_Cvo9")

  // remove field
  collection.fields.removeById("_clone_TbG3")

  return app.save(collection)
})
