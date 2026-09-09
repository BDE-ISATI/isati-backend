// pb_hooks/utils/rooms.js

function parseIcsDate(icsDateStr) {
    let year = parseInt(icsDateStr.substring(0, 4), 10);
    let month = parseInt(icsDateStr.substring(4, 6), 10) - 1;
    let day = parseInt(icsDateStr.substring(6, 8), 10);
    let hour = parseInt(icsDateStr.substring(9, 11), 10);
    let minute = parseInt(icsDateStr.substring(11, 13), 10);
    let second = parseInt(icsDateStr.substring(13, 15), 10);

    let isUTC = icsDateStr.indexOf('Z') !== -1;

    if (isUTC) {
        return new Date(Date.UTC(year, month, day, hour, minute, second));
    } else {
        return new Date(year, month, day, hour, minute, second);
    }
}

function getRoomStatus(icsText, currentTime) {
    let events = icsText.split("BEGIN:VEVENT");
    let upcomingEvents = [];

    for (let i = 1; i < events.length; i++) {
        let eventBlock = events[i].split("END:VEVENT")[0];
        let dtstartMatch = eventBlock.match(/DTSTART(?:[^:]*):([0-9T]+Z?)/);
        let dtendMatch = eventBlock.match(/DTEND(?:[^:]*):([0-9T]+Z?)/);

        if (dtstartMatch && dtendMatch) {
            let start = parseIcsDate(dtstartMatch[1]);
            let end = parseIcsDate(dtendMatch[1]);

            if (start && end && end > currentTime) {
                upcomingEvents.push({ start: start, end: end });
            }
        }
    }

    upcomingEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

    let isAvailable = true; // Vrai si la salle est dispo
    let nextChange = null; // Renvoie l'heure du prochaine changement d'état de isAvailable (heure de fin du cours actuel si isAvailable = false, heure de début du prochain cours si isAvailable = true)

    if (upcomingEvents.length > 0) {
        let firstEvent = upcomingEvents[0];

        if (currentTime >= firstEvent.start && currentTime < firstEvent.end) {
            isAvailable = false;
            nextChange = firstEvent.end;

            for (let j = 1; j < upcomingEvents.length; j++) {
                if ((upcomingEvents[j].start.getTime() - (15 * 60 * 1000)) <= nextChange.getTime()) {
                    if (upcomingEvents[j].end > nextChange) {
                        nextChange = upcomingEvents[j].end;
                    }
                } else {
                    break;
                }
            }
        } else {
            isAvailable = true;
            nextChange = firstEvent.start;
        }
    }

    return {
        isAvailable: isAvailable,
        nextChange: nextChange
    };
}

module.exports = {
    syncAllRooms: function () {
        let now = new Date();
        let records = [];
        
        try {
            records = $app.findRecordsByFilter("rooms", "ics_url != ''");
        } catch (e) {
            $app.logger().error("Impossible de récupérer les salles", e);
            return 0;
        }

        let updatedCount = 0;

        for (let record of records) {
            let url = record.get("ics_url");

            try {
                let res = $http.send({ url: url, method: "GET" });
                let icsText = typeof res.raw === "string" ? res.raw : String(res.raw);
                let status = getRoomStatus(icsText, now);
                let isChanged = false;

                if (record.get("is_available") !== status.isAvailable) {
                    record.set("is_available", status.isAvailable);
                    isChanged = true;
                }

                let dbNextChange = record.get("next_change") ? String(record.get("next_change")) : "";
                let calculatedNextChange = status.nextChange ? status.nextChange.toISOString() : "";
                let dateChanged = dbNextChange.substring(0, 19) !== calculatedNextChange.substring(0, 19).replace("T", " ");

                if (dateChanged) {
                    record.set("next_change", status.nextChange);
                    isChanged = true;
                }

                if (isChanged) {
                    $app.save(record);
                    updatedCount++;
                }
            } catch (err) {
                $app.logger().error("Erreur de synchronisation ICS: " + record.id, err);
            }
        }
        return updatedCount;
    }
};