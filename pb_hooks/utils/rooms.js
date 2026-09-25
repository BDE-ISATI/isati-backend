module.exports = {
    syncAllRooms: function () {
        let url = 'https://planning.univ-rennes.fr/jsp/custom/modules/plannings/Xnmk1l3r.shu';
        let res = $http.send({ url: url, method: "GET" });

        let events = res.raw.split("BEGIN:VEVENT");

        
        

        

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

        for (let i = 1; i < events.length; i++) {
            const eventBlock = events[i].split("END:VEVENT")[0];


            const locationMatch = eventBlock.match(/LOCATION:B4[1-2]\s*-\s*([0-9]+|Amphi\s[L-N])/);
            const startingMatch = eventBlock.match(/DTSTART:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})00Z/);
            const endingMatch = eventBlock.match(/DTEND:202[0-9]+T(\d{2})(\d{2})00Z/);


            if (!locationMatch || !startingMatch || !endingMatch) {
                console.log(eventBlock);
                continue;
            }


            // FORMATAGE
            // day -> 2026-04-04
            // startHour -> 18:30
            // endHour -> 23:15
            const day = `${startingMatch[1]}-${startingMatch[2]}-${startingMatch[3]}`;
            const startHour = startingMatch[4]+":"+startingMatch[5];

            const endHour = endingMatch[1]+":"+endingMatch[2];

            const location = locationMatch[1];

            if (location == "Amphi N" && day == "2026-09-25") console.log(location + " - " + startHour + " - " + endHour + " - " + day);
            

            const cour = {
                'day':day,
                'startHour':startHour,
                'endHour':endHour
            }
            if (!cours[location]) {
                cours[location] = [];
            }
            cours[location].push(cour);    
        }

        

        const collectionRooms = $app.findCollectionByNameOrId('rooms');
        const existingRecords = $app.findAllRecords('rooms');

        existingRecords.forEach((record) => {
            if(!(record.get('name') in cours)) {
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

        

        

    }
};