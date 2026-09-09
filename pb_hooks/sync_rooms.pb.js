/// <reference path="../pb_data/types.d.ts" />

cronAdd("sync_rooms_availability", "*/15 * * * *", () => {
    const { syncAllRooms } = require(`${__hooks}/utils/rooms.js`);
    syncAllRooms();
});

routerAdd("POST", "/api/sync-rooms", (e) => {
    const { syncAllRooms } = require(`${__hooks}/utils/rooms.js`);
    let updated = syncAllRooms();
    
    return e.json(200, { 
        "status": "success", 
        "updated_rooms": updated 
    });
});