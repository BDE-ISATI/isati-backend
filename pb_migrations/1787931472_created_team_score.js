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
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "_clone_gsdP",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_2369649576",
        "help": "",
        "hidden": false,
        "id": "_clone_z83F",
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
        "collectionId": "pbc_307754106",
        "help": "",
        "hidden": false,
        "id": "_clone_pkMQ",
        "maxSelect": 0,
        "minSelect": 0,
        "name": "faction",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "_clone_ixLY",
        "max": 0,
        "min": 0,
        "name": "color",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
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
    "id": "pbc_999103373",
    "indexes": [],
    "listRule": "",
    "name": "team_score",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  t.id                                AS id,\n  t.name                              AS name,\n  t.wei                               AS wei,\n  t.faction                           AS faction,\n  t.color                             AS color,\n  COALESCE(SUM(v.points_awarded), 0)  AS score,\n  COUNT(v.id)                         AS validations_count\nFROM teams t\nLEFT JOIN validations v\n  ON v.team = t.id\n  AND v.status = 'accepted'\nGROUP BY t.id",
    "viewRule": ""
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_999103373");

  return app.delete(collection);
})
