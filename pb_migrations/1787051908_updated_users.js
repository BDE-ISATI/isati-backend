/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Vérifiez votre adresse email</title>\n</head>\n<body style=\"margin:0; padding:0; background-color:#f4f4f5; font-family: Arial, Helvetica, sans-serif;\">\n\n  <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:#f4f4f5; padding:40px 16px;\">\n    <tr>\n      <td align=\"center\">\n\n        <!-- Carte centrée -->\n        <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width:480px; background-color:#ffffff; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.08); overflow:hidden;\">\n\n          <!-- Logo / nom de l'app -->\n          <tr>\n            <td align=\"center\" style=\"padding:40px 32px 8px 32px;\">\n              <span style=\"font-size:22px; font-weight:bold; color:#c0392b; letter-spacing:0.5px;\">\n                {APP_NAME}\n              </span>\n            </td>\n          </tr>\n\n          <!-- Titre -->\n          <tr>\n            <td align=\"center\" style=\"padding:16px 32px 0 32px;\">\n              <h1 style=\"margin:0; font-size:22px; line-height:1.3; color:#111111; font-weight:700;\">\n                Vérifiez votre adresse email\n              </h1>\n            </td>\n          </tr>\n\n          <!-- Texte explicatif -->\n          <tr>\n            <td align=\"center\" style=\"padding:16px 40px 0 40px;\">\n              <p style=\"margin:0; font-size:14px; line-height:1.6; color:#6b7280;\">\n                Merci de confirmer que cette adresse est bien la vôtre pour activer votre compte {APP_NAME}. Une fois confirmé, vous pourrez accéder à l'ensemble du site.\n              </p>\n            </td>\n          </tr>\n\n          <!-- Bouton -->\n          <tr>\n            <td align=\"center\" style=\"padding:32px 40px 8px 40px;\">\n              <a href=\"{APP_URL}/verify-email?token={TOKEN}\"\n                 style=\"display:inline-block; width:100%; max-width:360px; box-sizing:border-box; background-color:#c0392b; color:#ffffff; font-size:15px; font-weight:bold; text-decoration:none; padding:14px 24px; border-radius:8px;\">\n                Vérifier mon email\n              </a>\n            </td>\n          </tr>\n\n          <!-- Lien de secours -->\n          <tr>\n            <td align=\"center\" style=\"padding:24px 32px 0 32px;\">\n              <p style=\"margin:0; font-size:12px; color:#9ca3af;\">\n                Ou copiez ce lien dans votre navigateur :\n              </p>\n              <p style=\"margin:6px 0 0 0; font-size:12px; word-break:break-all;\">\n                <a href=\"{APP_URL}/verify-email?token={TOKEN}\" style=\"color:#c0392b; text-decoration:underline;\">\n                  {APP_URL}/verify-email?token={TOKEN}\n                </a>\n              </p>\n            </td>\n          </tr>\n\n          <!-- Séparateur -->\n          <tr>\n            <td style=\"padding:32px 32px 0 32px;\">\n              <hr style=\"border:none; border-top:1px solid #e5e7eb; margin:0;\">\n            </td>\n          </tr>\n\n          <!-- Footer -->\n          <tr>\n            <td align=\"center\" style=\"padding:20px 32px 32px 32px;\">\n              <p style=\"margin:0; font-size:11px; color:#9ca3af; line-height:1.6;\">\n                Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.<br>\n                © 2026 {APP_NAME} — Tous droits réservés.\n              </p>\n            </td>\n          </tr>\n\n        </table>\n        <!-- Fin carte -->\n\n      </td>\n    </tr>\n  </table>\n\n</body>\n</html>"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<p>\n  <img src=\"http://127.0.0.1:8090/logo.png\" alt=\"{APP_NAME}\" width=\"150\" />\n</p>\n<p>Bonjour,</p>\n<p>Merci de vous être inscrit(e) sur {APP_NAME}.</p>\n<p>Cliquez sur le bouton ci-dessous pour vérifier votre adresse e-mail.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"/onBoarding\" rel=\"noopener\">Vérifier</a>\n</p>\n<p><i>Si vous n'êtes pas récemment inscrit(e), veuillez ignorer cet e-mail.</i></p>\n<p>\n  Merci,<br/>\n  L'équipe {APP_NAME}\n</p>"
    }
  }, collection)

  return app.save(collection)
})
