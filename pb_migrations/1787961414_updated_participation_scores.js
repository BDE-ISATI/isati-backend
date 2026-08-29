/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_317378423")

  // update collection data
  unmarshal({
    "viewQuery": " SELECT\n    p.id AS id,\n    p.user AS user,\n    p.wei AS wei,\n    p.team AS team,\n    p.role,\n    p.state,\n    CAST(COALESCE(SUM(v.points_awarded), 0) AS INT) AS score,\n    COUNT(v.id) AS validations_count \n FROM participations p\n LEFT JOIN validations v\n   ON v.user = p.user\n   AND v.team = p.team\n   AND v.status = 'accepted'\n WHERE p.role = 'student'\n GROUP BY p.id\n"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_Hm7S")

  // remove field
  collection.fields.removeById("_clone_TfN6")

  // remove field
  collection.fields.removeById("_clone_yQ3P")

  // remove field
  collection.fields.removeById("_clone_jKAd")

  // remove field
  collection.fields.removeById("_clone_veIm")

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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_317378423")

  // update collection data
  unmarshal({
    "viewQuery": " SELECT\n    p.id AS id,\n    p.user AS user,\n    p.wei AS wei,\n    p.team AS team,\n    p.role,\n    p.state,\n    CAST(COALESCE(SUM(v.points_awarded), 0) AS INT) AS score,\n    COUNT(v.id) AS validations_count \n FROM participations p\n LEFT JOIN validations v\n   ON v.user = p.user\n   AND v.team = p.team\n   AND v.status = 'accepted'\n   AND v.archived = false\n WHERE p.role = 'student'\n GROUP BY p.id\n"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_clone_Hm7S",
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
    "id": "_clone_TfN6",
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
    "id": "_clone_yQ3P",
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
    "id": "_clone_jKAd",
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
    "id": "_clone_veIm",
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
  collection.fields.removeById("_clone_p0NT")

  // remove field
  collection.fields.removeById("_clone_eOSS")

  // remove field
  collection.fields.removeById("_clone_kySn")

  // remove field
  collection.fields.removeById("_clone_jyzV")

  // remove field
  collection.fields.removeById("_clone_clS4")

  return app.save(collection)
})
