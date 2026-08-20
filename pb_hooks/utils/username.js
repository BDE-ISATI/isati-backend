function checkUpdateUsernameValidation(e) {
  const newUsername = e.record.get("username")
  const oldUsername = e.record.original().get("username")

  if (newUsername === oldUsername) return

  const user = e.auth
  if (user.id != e.record.get("id")) {
    throw new ForbiddenError("Insufficient permissions.", {
      "username": new ValidationError("insufficient_permissions", "You cannot modify another user's username.")
    })
  }

  const lastChange = e.record.original().get("username_changed_at")

  if (lastChange) {
    const cooldownMs = 14 * 24 * 60 * 60 * 1000
    const remainingMs = cooldownMs - (Date.now() - new Date(lastChange).getTime())

    if (remainingMs > 0) {
      const remainingDays = Math.ceil(remainingMs / (24 * 60 * 60 * 1000))
      throw new BadRequestError("Cooldown active.", {
        "username": new ValidationError("username_cooldown_active", `Vous pourrez changer votre pseudo dans ${remainingDays} jour(s).`)
      })
    }
  }
}

function touchUsernameChangedAt(e) {
  if (e.record.get("username") === e.record.original().get("username")) return

    e.record.set("username_changed_at", new Date())

}





module.exports = { checkUpdateUsernameValidation, touchUsernameChangedAt}
