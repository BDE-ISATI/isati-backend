function formatParis(year, month, day, hour, min) {
    
  const utcDate = new Date(Date.UTC(
    parseInt(year, 10),
    parseInt(month, 10) - 1, // Les mois commencent à 0 en JS
    parseInt(day, 10),
    parseInt(hour, 10),
    parseInt(min, 10)
  ));

  const dayStr = utcDate.toLocaleDateString("fr-CA", { 
    timeZone: "Europe/Paris" 
  }); 
  
  const hourStr = utcDate.toLocaleTimeString("fr-FR", { 
    timeZone: "Europe/Paris", 
    hour: "2-digit", 
    minute: "2-digit" 
  });

  return { day: dayStr, hour: hourStr };
}

module.exports = {
    syncAllRooms: function () {
        const configRecords = $app.findAllRecords('listRooms');
        if (configRecords.length === 0) {
            console.error("[ERREUR] Configuration introuvable dans 'listRooms'");
            return { status: "error", message: "Configuration manquante" };
        }

        const config = configRecords[0];
        const url = config.get("url_ics");

        let sallesValides = [];
        try {
            // Force la conversion des octets bruts en texte, puis en vrai tableau
            const rawString = config.getString("rooms_allowed");
            sallesValides = JSON.parse(rawString);
        } catch (e) {
            console.error("Format JSON invalide dans listRooms");
        }
        
        let res;

        try {
            res = $http.send({ 
                url: url, 
                method: "GET",
                headers: {
                    "User-Agent": "PocketBase-Sync/1.0"
                },
                timeout: 30 
            });
        } catch (err) {
            console.error("[SYNCHRO ERREUR] Impossible de joindre le serveur ICS :", err);
            return { status: "error", message: "Échec de connexion au serveur ICS" };
        }

        if (!res || res.statusCode !== 200) {
            console.error(`[SYNCHRO ERREUR] Code HTTP invalide reçu : ${res ? res.statusCode : "inconnu"}`);
            return { status: "error", message: `Erreur serveur ICS : code ${res ? res.statusCode : "inconnu"}` };
        }

        const rawData = res.raw || "";
        if (!rawData.includes("BEGIN:VCALENDAR")) {
            console.error("[SYNCHRO ERREUR] La réponse reçue n'est pas un calendrier valide (BEGIN:VCALENDAR manquant)");
            return { status: "error", message: "Fichier ICS corrompu ou invalide" };
        }

        let events = res.raw.replace(/\r?\n[ \t]/g, "").split("BEGIN:VEVENT");

        // Format :
        // location -> "102" : [
        //  {
        //  day -> "2026-04-04",
        //  startHour -> "18:30",
        //  endHour -> "23:15"
        //  }
        //]
        // 

        
        let cours = {};
        sallesValides.forEach(salle => {
            cours[salle] = [];
        });

        const now = new Date();

        const aujourdhui = now.toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" });
        
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const demain = tomorrow.toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" });

        for (let i = 1; i < events.length; i++) {
            const eventBlock = events[i].split("END:VEVENT")[0];

            // 1. Regex robustes pour les dates et extraction de la ligne LOCATION complète
            const rawLocationMatch = eventBlock.match(/LOCATION:(.*?)(\r?\n[A-Z]|$)/s);
            const startingMatch = eventBlock.match(/DTSTART.*?:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
            const endingMatch = eventBlock.match(/DTEND.*?:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);

            if (!rawLocationMatch || !startingMatch || !endingMatch) {
                continue;
            }

            // 2. Formatage des dates
            const start = formatParis(
                startingMatch[1], startingMatch[2], startingMatch[3], startingMatch[4], startingMatch[5]
            );
            const end = formatParis(
                endingMatch[1], endingMatch[2], endingMatch[3], endingMatch[4], endingMatch[5]
            );

            // Filtrage temporel
            if (start.day < aujourdhui || start.day > demain) {
                continue;
            }

            // 3. Découpage et vérification multi-salles
            const roomRegex = /B4[1-2][A-Z]?\s*-\s*(?:[^(]*\()?(?:.*?\s)?(Amphi\s[L-N]|[0-9]+)/i;

            console.log(roomRegex);

            const locationLine = rawLocationMatch[1];

            for (const salle of sallesValides) {
                if (locationLine.includes(salle)) {
                    const cour = {
                        'day': start.day,
                        'startHour': start.hour.slice(0, 5),
                        'endHour': end.hour.slice(0, 5)
                    };

                    if (!cours[salle]) {
                        cours[salle] = [];
                    }
                    cours[salle].push(cour);
                }
            }
        }


        
        

        const collectionRooms = $app.findCollectionByNameOrId('rooms');
        const existingRecords = $app.findAllRecords('rooms');

        existingRecords.forEach((record) => {
            if (!sallesValides.includes(record.get('name'))) {
                $app.delete(record);
            }
        });

        for (const [location, schedule] of Object.entries(cours)) {

            schedule.sort((a, b) => (a.day + a.startHour).localeCompare(b.day + b.startHour));
            
            const newChecksum = $security.md5(JSON.stringify(schedule));
            const existingRecord = existingRecords.find(r => r.get("name") === location)

            try {
                if (!existingRecord) {
                    const room = new Record(collectionRooms);
                    room.set("name", location);
                    room.set("edt", schedule);
                    room.set("checksum", newChecksum);
                    $app.save(room);

                }
                else {
                    if (existingRecord.get('checksum') != newChecksum) {
                        existingRecord.set("edt", schedule)
                        existingRecord.set("checksum", newChecksum)
                        $app.save(existingRecord);
                    }
                }
            } catch (err) {
                console.error(`Sauvegarde impossible pour ${location} :`, err);
            }

            
            
        };

        

        return { status: "success", parsed_rooms: sallesValides.length };

    }
};