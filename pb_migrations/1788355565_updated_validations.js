/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  // update field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "file1989596663",
    "maxSelect": 10,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "proof_file",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3894176766")

  // update field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "file1989596663",
    "maxSelect": 0,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "proof_file",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
