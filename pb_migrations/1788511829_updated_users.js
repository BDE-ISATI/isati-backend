/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update field
  collection.fields.addAt(3, new Field({
    "exceptDomains": null,
    "help": "",
    "hidden": false,
    "id": "email3885137012",
    "name": "email",
    "onlyDomains": [
      "univ-rennes.fr",
      "etudiant.univ-rennes.fr",
      "deleted.user"
    ],
    "presentable": false,
    "required": true,
    "system": true,
    "type": "email"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update field
  collection.fields.addAt(3, new Field({
    "exceptDomains": null,
    "help": "",
    "hidden": false,
    "id": "email3885137012",
    "name": "email",
    "onlyDomains": [
      "univ-rennes.fr",
      "etudiant.univ-rennes.fr"
    ],
    "presentable": false,
    "required": true,
    "system": true,
    "type": "email"
  }))

  return app.save(collection)
})
