

cronAdd("cleanup_unverified", "0 * * * *", () => {
  const users = $app.findRecordsByFilter(
    "users",
    "verified = false && created < {:cutoff} && account_type != deleted",
    "-created", 500, 0,
    { cutoff: new Date(Date.now() - 24* 60* 60* 1000).toISOString() }
  )
  for (const user of users) {
    $app.delete(user)
  }
})


cronAdd("purge_proofs", "0 3 * * *", () => {
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const weis = $app.findRecordsByFilter(
    "weis",
    'weekend_ends_at != "" && weekend_ends_at < {:cutoff}',
    "-weekend_ends_at", 50, 0,
    { cutoff: cutoff }
  )

  for (const wei of weis) {
    const validations = $app.findRecordsByFilter(
      "validations",
      'challenge.wei = {:weiId} && archived != true && proof_file:length > 0',
      "-created", 500, 0,
      { weiId: wei.id }
    )
    for (const validation of validations) {
      validation.set("proof_file", [])
      $app.save(validation)
    }
  }
})