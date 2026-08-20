/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<p>\n  <img src=\"http://127.0.0.1:8090/logo.png\" alt=\"{APP_NAME}\" width=\"150\" />\n</p>\n<p>Bonjour,</p>\n<p>Merci de vous être inscrit(e) sur {APP_NAME}.</p>\n<p>Cliquez sur le bouton ci-dessous pour vérifier votre adresse e-mail.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"/onBoarding\" rel=\"noopener\">Vérifier</a>\n</p>\n<p><i>Si vous n'êtes pas récemment inscrit(e), veuillez ignorer cet e-mail.</i></p>\n<p>\n  Merci,<br/>\n  L'équipe {APP_NAME}\n</p>"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<p>\n  <img src=\"http://127.0.0.1:8090/logo.png\" alt=\"{APP_NAME}\" width=\"150\" />\n</p>\n<p>Bonjour,</p>\n<p>Merci de vous être inscrit(e) sur {APP_NAME}.</p>\n<p>Cliquez sur le bouton ci-dessous pour vérifier votre adresse e-mail.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Vérifier</a>\n</p>\n<p><i>Si vous n'êtes pas récemment inscrit(e), veuillez ignorer cet e-mail.</i></p>\n<p>\n  Merci,<br/>\n  L'équipe {APP_NAME}\n</p>"
    }
  }, collection)

  return app.save(collection)
})
