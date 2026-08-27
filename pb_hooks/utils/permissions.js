function hasPermission(e, resource, action ){

  const user = e.auth
  if (!user) { 
    throw new UnauthorizedError("Not authenticated.", {
      "account": new ValidationError("not_authenticated", "You must be logged in to perform this action.")
    })
  }

  const roleIds = user.get("roles")
  if (!roleIds || roleIds.length === 0) return false
  

  const roles = $app.findRecordsByIds("roles", roleIds)
  let policyIds = []
  for (const role of roles) {
    const ids = role.get("policies") || []
    policyIds = policyIds.concat(ids)
  }

  if (policyIds.length === 0) return false

  const policies = $app.findRecordsByIds("policies", policyIds)

  return policies.some((p) => {
    const res = p.get("resource")
    const act = p.get("action")
    const isAdminWildcard = res === "all" && act === "all"
    const matchesExactly = res === resource && act === action
    return isAdminWildcard || matchesExactly
  })


}

function checkPermission(e,resource,action) {
  //Renvoie une erreur s'il l'utilisateur n'a pas la permission d'intéragir avec une ressource
  if (!hasPermission(e,resource,action)) {
    throw new ForbiddenError("Insufficient permissions.", {
      [resource]: new ValidationError("insufficient_permissions", "You are not allowed to perform this action.")
    })
  }
}

function checkNoUnauthorizedFieldChanges(e, allowedFields) {
  // Permet de vérifier qu'un utilisateur ne modifie que des champs dont il a accès.
  const original = e.record.original()
  for (const field of e.record.collection().fields) {
    const name = field.name
    if (allowedFields.includes(name)) continue
    if (JSON.stringify(e.record.get(name)) !== JSON.stringify(original.get(name))) {
      throw new ForbiddenError("Insufficient permissions.", {
        [name]: new ValidationError("insufficient_permissions", `Vous n'êtes pas autorisé à modifier le champ "${name}".`)
      })
    }
  }
}


function checkUserId(e) {
  const user = e.auth
  if (user.id != e.record.get("id")) {
    throw new ForbiddenError("Insufficient permissions.", {
      "account": new ValidationError("insufficient_permissions", "You cannot modify another user's account.")
    })
  }

}



module.exports = { hasPermission, checkPermission, checkNoUnauthorizedFieldChanges, checkUserId}