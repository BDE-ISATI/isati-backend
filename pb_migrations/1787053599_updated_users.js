/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "subject": "{APP_NAME} | Vérifiez votre adresse e-mail "
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "subject": "Vérifiez votre adresse e-mail {APP_NAME} "
    }
  }, collection)

  return app.save(collection)
})
