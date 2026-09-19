/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("wei_score_events")

  unmarshal({
    "viewQuery": "SELECT v.id AS id, v.user AS user, v.team AS team, c.wei AS wei, v.challenge AS challenge, c.scope AS scope, v.points_awarded AS points_awarded, v.reviewed_at AS reviewed_at FROM validations v JOIN challenges c ON c.id = v.challenge WHERE v.status = 'accepted' AND v.reviewed_at != ''",
    "fields": [
      {
        "autogeneratePattern": "", "hidden": false, "id": "text3208210256", "max": 0, "min": 0,
        "name": "id", "pattern": "^[a-z0-9]+$", "presentable": false, "primaryKey": true,
        "required": true, "system": true, "type": "text"
      },
      {
        "cascadeDelete": false, "collectionId": "_pb_users_auth_", "hidden": false,
        "id": "_wse_user", "maxSelect": 1, "minSelect": 0, "name": "user",
        "presentable": false, "required": false, "system": false, "type": "relation"
      },
      {
        "cascadeDelete": false, "collectionId": "pbc_3824009647", "hidden": false,
        "id": "_wse_team", "maxSelect": 1, "minSelect": 0, "name": "team",
        "presentable": false, "required": false, "system": false, "type": "relation"
      },
      {
        "cascadeDelete": false, "collectionId": "pbc_2369649576", "hidden": false,
        "id": "_wse_wei", "maxSelect": 1, "minSelect": 0, "name": "wei",
        "presentable": false, "required": false, "system": false, "type": "relation"
      },
      {
        "cascadeDelete": false, "collectionId": "pbc_3005378505", "hidden": false,
        "id": "_wse_challenge", "maxSelect": 1, "minSelect": 0, "name": "challenge",
        "presentable": false, "required": false, "system": false, "type": "relation"
      },
      {
        "hidden": false, "id": "_wse_scope", "maxSelect": 0, "name": "scope",
        "presentable": false, "required": false, "system": false, "type": "select",
        "values": ["individual", "team"]
      },
      {
        "hidden": false, "id": "_wse_points", "max": null, "min": null,
        "name": "points_awarded", "onlyInt": false, "presentable": false,
        "required": false, "system": false, "type": "number"
      },
      {
        "hidden": false, "id": "_wse_reviewed", "max": "", "min": "",
        "name": "reviewed_at", "presentable": false, "required": false,
        "system": false, "type": "date"
      }
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("wei_score_events")

  unmarshal({
    "viewQuery": "SELECT v.id AS id, v.team AS team, c.wei AS wei, v.points_awarded AS points_awarded, v.reviewed_at AS reviewed_at FROM validations v JOIN challenges c ON c.id = v.challenge WHERE v.status = 'accepted' AND v.reviewed_at != ''",
    "fields": [
      {
        "autogeneratePattern": "", "hidden": false, "id": "text3208210256", "max": 0, "min": 0,
        "name": "id", "pattern": "^[a-z0-9]+$", "presentable": false, "primaryKey": true,
        "required": true, "system": true, "type": "text"
      },
      {
        "cascadeDelete": false, "collectionId": "pbc_3824009647", "hidden": false,
        "id": "_wse_team", "maxSelect": 1, "minSelect": 0, "name": "team",
        "presentable": false, "required": false, "system": false, "type": "relation"
      },
      {
        "cascadeDelete": false, "collectionId": "pbc_2369649576", "hidden": false,
        "id": "_wse_wei", "maxSelect": 1, "minSelect": 0, "name": "wei",
        "presentable": false, "required": false, "system": false, "type": "relation"
      },
      {
        "hidden": false, "id": "_wse_points", "max": null, "min": null,
        "name": "points_awarded", "onlyInt": false, "presentable": false,
        "required": false, "system": false, "type": "number"
      },
      {
        "hidden": false, "id": "_wse_reviewed", "max": "", "min": "",
        "name": "reviewed_at", "presentable": false, "required": false,
        "system": false, "type": "date"
      }
    ]
  }, collection)

  return app.save(collection)
})
