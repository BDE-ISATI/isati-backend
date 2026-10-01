/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("wei_score_events")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT v.id AS id, v.user AS user, v.team AS team, c.wei AS wei, v.challenge AS challenge, c.scope AS scope, v.points_awarded AS points_awarded, v.reviewed_at AS reviewed_at FROM validations v JOIN challenges c ON c.id = v.challenge WHERE v.status = 'accepted' AND v.reviewed_at != ''"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_wse_user",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3005378505",
    "help": "",
    "hidden": false,
    "id": "_wse_challenge",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "challenge",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "_wse_scope",
    "maxSelect": 0,
    "name": "scope",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "individual",
      "team"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("wei_score_events")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT v.id AS id, v.team AS team, c.wei AS wei, v.points_awarded AS points_awarded, v.reviewed_at AS reviewed_at FROM validations v JOIN challenges c ON c.id = v.challenge WHERE v.status = 'accepted' AND v.reviewed_at != ''"
  }, collection)

  // remove field
  collection.fields.removeById("_wse_user")

  // remove field
  collection.fields.removeById("_wse_challenge")

  // remove field
  collection.fields.removeById("_wse_scope")

  return app.save(collection)
})
