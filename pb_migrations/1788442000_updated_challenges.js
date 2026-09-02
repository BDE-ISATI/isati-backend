/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "number1148923047",
    "max": 10,
    "min": 1,
    "name": "proof_count",
    "onlyInt": true,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3005378505")

  // remove field
  collection.fields.removeById("number1148923047")

  return app.save(collection)
})
