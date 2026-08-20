/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<p>\n  <img src=\"https://tondomaine.com/logo.png\" alt=\"{APP_NAME}\" width=\"150\" />\n</p>\n<p>Bonjour,</p>\n<p>Merci de vous être inscrit(e) sur {APP_NAME}.</p>\n<p>Cliquez sur le bouton ci-dessous pour vérifier votre adresse e-mail.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Vérifier</a>\n</p>\n<p><i>Si vous n'êtes pas récemment inscrit(e), veuillez ignorer cet e-mail.</i></p>\n<p>\n  Merci,<br/>\n  L'équipe {APP_NAME}\n</p>",
      "subject": "Vérifiez votre adresse e-mail {APP_NAME} "
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verify</a>\n</p>\n<p><i>If you didn't recently register, please ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>",
      "subject": "Verify your {APP_NAME} email"
    }
  }, collection)

  return app.save(collection)
})
