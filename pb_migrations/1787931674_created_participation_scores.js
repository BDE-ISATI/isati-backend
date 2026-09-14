/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "help": "",
        "hidden": false,
        "id": "_clone_LLli",
        "maxSelect": 0,
        "minSelect": 0,
        "name": "user",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_2369649576",
        "help": "",
        "hidden": false,
        "id": "_clone_eqlF",
        "maxSelect": 0,
        "minSelect": 0,
        "name": "wei",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3824009647",
        "help": "",
        "hidden": false,
        "id": "_clone_4zLX",
        "maxSelect": 0,
        "minSelect": 0,
        "name": "team",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "help": "",
        "hidden": false,
        "id": "json848901969",
        "maxSize": 1,
        "name": "score",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "help": "",
        "hidden": false,
        "id": "number2208999885",
        "max": null,
        "min": null,
        "name": "validations_count",
        "onlyInt": true,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      }
    ],
    "id": "pbc_317378423",
    "indexes": [],
    "listRule": null,
    "name": "participation_scores",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  p.id AS id,\n  p.user AS user,\n  p.wei AS wei,\n  p.team AS team,\n  COALESCE(SUM(v.points_awarded), 0) AS score,\n  COUNT(v.id) AS validations_count\nFROM participations p\nLEFT JOIN validations v\n  ON v.user = p.user\n  AND v.team = p.team\n  AND v.status = 'accepted'\n  AND v.archived = false\nGROUP BY p.id",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_317378423");

  return app.delete(collection);
})
