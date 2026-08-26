/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // remove field
  collection.fields.removeById("text105650625")

  // add field
  collection.fields.addAt(6, new Field({
    "help": "",
    "hidden": false,
    "id": "select2982008523",
    "maxSelect": 0,
    "name": "phase",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "parcours",
      "olympiades"
    ]
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "select11490771",
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

  // add field
  collection.fields.addAt(15, new Field({
    "help": "",
    "hidden": false,
    "id": "select1993848014",
    "maxSelect": 3,
    "name": "proof_type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "image",
      "video",
      "link"
    ]
  }))

  // update field
  collection.fields.addAt(13, new Field({
    "help": "",
    "hidden": true,
    "id": "number213691936",
    "max": null,
    "min": null,
    "name": "max_validations",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(14, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2369649576",
    "help": "",
    "hidden": false,
    "id": "relation1653163849",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "relation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text105650625",
    "max": 0,
    "min": 0,
    "name": "category",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select2982008523")

  // remove field
  collection.fields.removeById("select11490771")

  // remove field
  collection.fields.removeById("select1993848014")

  // update field
  collection.fields.addAt(11, new Field({
    "help": "",
    "hidden": false,
    "id": "number213691936",
    "max": null,
    "min": null,
    "name": "max_validations",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(13, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2369649576",
    "help": "",
    "hidden": false,
    "id": "relation1653163849",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "relation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
