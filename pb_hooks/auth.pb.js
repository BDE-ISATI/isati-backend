

onRecordAuthRequest((e) => {
  if (e.hasSuperuserAuth()) { return e.next() }


  if (e.record.get("account_type") === "deleted") {
    throw new BadRequestError("Account Deleted", {
      "account": new ValidationError("account_deleted", "This account no longer exists.")
    })
  }

  if (!e.record.get("verified")) {
    throw new BadRequestError("Email not verified", {
      "email": new ValidationError("email_not_verified", "Please verify your email.")
    })
  }

  e.next()
}, "users")



