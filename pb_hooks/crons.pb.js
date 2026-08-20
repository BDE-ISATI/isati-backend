

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