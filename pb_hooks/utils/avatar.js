

function checkUpdateAvatarValidation(e) {

  const oldAvatar = e.record.original().get("avatar")
  const newAvatar = e.record.get("avatar")

  if (oldAvatar === newAvatar) return

  const user = e.auth
  if (user.id != e.record.get("id")) {
    throw new ForbiddenError("Insufficient permissions.", {
      "avatar": new ValidationError("insufficient_permissions", "You cannot change this profile picture.")
    })
  }

}

module.exports = { checkUpdateAvatarValidation }