/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "updateRule": null,
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\"",
    "name": "wei_score_events",
    "type": "view",
    "system": false,
    "indexes": [],
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
    ],
    "viewQuery": "SELECT v.id AS id, v.team AS team, c.wei AS wei, v.points_awarded AS points_awarded, v.reviewed_at AS reviewed_at FROM validations v JOIN challenges c ON c.id = v.challenge WHERE v.status = 'accepted' AND v.reviewed_at != ''"
  })

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("wei_score_events")
  return app.delete(collection)
})
