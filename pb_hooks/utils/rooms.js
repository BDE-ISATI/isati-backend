const DATE_PATTERN = /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/

function formatParis(match) {
  const [, year, month, day, hour, min] = match
  const utcDate = new Date(Date.UTC(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
    parseInt(hour, 10),
    parseInt(min, 10)
  ))

  return {
    day: utcDate.toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" }),
    hour: utcDate.toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" }).slice(0, 5),
  }
}

function fail(message) {
  $app.logger().error(`[sync_rooms] ${message}`)
  return { status: "error", message: message }
}

function syncAllRooms() {
  const configRecords = $app.findAllRecords("listRooms")
  if (configRecords.length === 0) {
    return fail("Configuration manquante dans listRooms")
  }

  const config = configRecords[0]
  const url = config.getString("url_ics")

  let allowedRooms
  try {
    allowedRooms = JSON.parse(config.getString("rooms_allowed"))
  } catch (_) {
    allowedRooms = null
  }
  if (!Array.isArray(allowedRooms)) {
    return fail("rooms_allowed doit être un tableau JSON de noms de salles")
  }

  let res
  try {
    res = $http.send({
      url: url,
      method: "GET",
      headers: { "User-Agent": "PocketBase-Sync/1.0" },
      timeout: 30,
    })
  } catch (err) {
    return fail(`Impossible de joindre le serveur ICS : ${err}`)
  }

  if (!res || res.statusCode !== 200) {
    return fail(`Erreur serveur ICS : code ${res ? res.statusCode : "inconnu"}`)
  }

  const rawData = res.raw || ""
  if (!rawData.includes("BEGIN:VCALENDAR")) {
    return fail("Fichier ICS invalide (BEGIN:VCALENDAR manquant)")
  }

  const now = new Date()
  const today = now.toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" })
  const tomorrowDate = new Date(now)
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const tomorrow = tomorrowDate.toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" })

  const schedules = {}
  for (const room of allowedRooms) {
    schedules[room] = []
  }

  const events = rawData.replace(/\r?\n[ \t]/g, "").split("BEGIN:VEVENT").slice(1)
  for (const event of events) {
    const block = event.split("END:VEVENT")[0]

    const locationMatch = block.match(/LOCATION:(.*?)(\r?\n[A-Z]|$)/s)
    const startMatch = block.match(new RegExp("DTSTART.*?:" + DATE_PATTERN.source))
    const endMatch = block.match(new RegExp("DTEND.*?:" + DATE_PATTERN.source))
    if (!locationMatch || !startMatch || !endMatch) continue

    const start = formatParis(startMatch)
    const end = formatParis(endMatch)
    if (start.day < today || start.day > tomorrow) continue

    for (const room of allowedRooms) {
      if (locationMatch[1].includes(room)) {
        schedules[room].push({ day: start.day, startHour: start.hour, endHour: end.hour })
      }
    }
  }

  const collection = $app.findCollectionByNameOrId("rooms")
  const existingRecords = $app.findAllRecords("rooms")

  for (const record of existingRecords) {
    if (!allowedRooms.includes(record.getString("name"))) {
      $app.delete(record)
    }
  }

  for (const [name, schedule] of Object.entries(schedules)) {
    schedule.sort((a, b) => (a.day + a.startHour).localeCompare(b.day + b.startHour))
    const checksum = $security.md5(JSON.stringify(schedule))
    const existing = existingRecords.find((r) => r.getString("name") === name)

    try {
      if (!existing) {
        const room = new Record(collection)
        room.set("name", name)
        room.set("edt", schedule)
        room.set("checksum", checksum)
        $app.save(room)
      } else if (existing.getString("checksum") !== checksum) {
        existing.set("edt", schedule)
        existing.set("checksum", checksum)
        $app.save(existing)
      }
    } catch (err) {
      $app.logger().error(`[sync_rooms] Sauvegarde impossible pour ${name} : ${err}`)
    }
  }

  return { status: "success", parsed_rooms: allowedRooms.length }
}

module.exports = { syncAllRooms }
