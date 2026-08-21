


function sendPasswordEmail(e) {
  const oldTokenKey = e.record.original().get("tokenKey")
  const newTokenKey = e.record.get("tokenKey")

  if(oldTokenKey === newTokenKey) return 

  const html = $template.loadFiles(
    `${__hooks}/views/email-layout.html`,
    `${__hooks}/views/password-changed.html`,
  ).render({ username: e.record.get("username") })

  const message = new MailerMessage({
    from: { 
      address: $app.settings().meta.senderAddress, 
      name: e.app.settings().meta.senderName, 
    },
    to: [{address: e.record.get("email")}],
    subject: "ISATI | Votre mot de passe a été modifié",
    html: html,
  })
  $app.newMailClient().send(message)
}


function sendDeletedAccountEmail(originalEmail, originalUsername) {
  
  const html = $template.loadFiles(
    `${__hooks}/views/email-layout.html`,
    `${__hooks}/views/account-deleted.html`,
  ).render({ username: originalUsername })

  const message = new MailerMessage({
    from: { 
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{address: originalEmail}],
    subject: "ISATI | Votre compte a été supprimé",
    html: html,
  })
  $app.newMailClient().send(message)

}










module.exports = { sendPasswordEmail , sendDeletedAccountEmail}