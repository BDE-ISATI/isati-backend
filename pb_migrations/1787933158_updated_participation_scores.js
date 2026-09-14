/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_317378423")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  p.id AS id,\n  p.user AS user,\n  p.wei AS wei,\n  p.team AS team,\n  p.role,\n  COALESCE(SUM(v.points_awarded), 0) AS score,\n  COUNT(v.id) AS validations_count\nFROM participations p\nLEFT JOIN validations v\n  ON v.user = p.user\n  AND v.team = p.team\n  AND v.status = 'accepted'\n  AND v.archived = false\nGROUP BY p.id"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_WG8F")

  // remove field
  collection.fields.removeById("_clone_3ABL")

  // remove field
  collection.fields.removeById("_clone_Em8B")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_clone_2ylE",
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
    "id": "_clone_r1XN",
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
    "id": "_clone_9gKo",
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
    "id": "_clone_Unte",
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_317378423")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  p.id AS id,\n  p.user AS user,\n  p.wei AS wei,\n  p.team AS team,\n  COALESCE(SUM(v.points_awarded), 0) AS score,\n  COUNT(v.id) AS validations_count\nFROM participations p\nLEFT JOIN validations v\n  ON v.user = p.user\n  AND v.team = p.team\n  AND v.status = 'accepted'\n  AND v.archived = false\nGROUP BY p.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_clone_WG8F",
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
    "id": "_clone_3ABL",
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
    "id": "_clone_Em8B",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "team",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_2ylE")

  // remove field
  collection.fields.removeById("_clone_r1XN")

  // remove field
  collection.fields.removeById("_clone_9gKo")

  // remove field
  collection.fields.removeById("_clone_Unte")

  return app.save(collection)
})
