const Database = require("better-sqlite3");

const db = new Database("gym.db");

db.pragma("journal_mode = WAL");


/*
    WEIGHTS
*/
db.exec(`
    CREATE TABLE IF NOT EXISTS weights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        weight_kg REAL NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        location TEXT
    );
`);


/*
    MACHINES
*/
db.exec(`
    CREATE TABLE IF NOT EXISTS machines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        machine_type TEXT NOT NULL,
        muscle_group TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        status TEXT NOT NULL DEFAULT 'Available'
    );
`);


/*
    RESOURCES / UTILITIES
*/
db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        resource_type TEXT NOT NULL,
        availability TEXT NOT NULL DEFAULT 'Available'
    );
`);


/*
    TRAINERS
*/
db.exec(`
    CREATE TABLE IF NOT EXISTS trainers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        specialization TEXT NOT NULL,
        experience_years INTEGER NOT NULL DEFAULT 0,
        availability TEXT NOT NULL DEFAULT 'Available'
    );
`);


/*
    INTERESTED MEMBERS

    Only stores:
    - Age
    - Weight
    - Training interest
*/
db.exec(`
    CREATE TABLE IF NOT EXISTS interested_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        age INTEGER NOT NULL,
        weight_kg REAL NOT NULL,
        training_interest TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);


/*
    SEED WEIGHTS
*/
const weightCount = db
    .prepare("SELECT COUNT(*) AS count FROM weights")
    .get()
    .count;

if (weightCount === 0) {

    const insert = db.prepare(`
        INSERT INTO weights
        (
            name,
            weight_kg,
            quantity,
            location
        )
        VALUES (?, ?, ?, ?)
    `);

    const weights = [
        ["Dumbbell", 5, 10, "Free Weight Area"],
        ["Dumbbell", 10, 10, "Free Weight Area"],
        ["Dumbbell", 15, 8, "Free Weight Area"],
        ["Dumbbell", 20, 6, "Free Weight Area"],
        ["Barbell", 20, 5, "Strength Area"],
        ["Kettlebell", 12, 5, "Functional Area"],
        ["Kettlebell", 20, 5, "Functional Area"],
        ["Weight Plate", 2.5, 20, "Plate Area"],
        ["Weight Plate", 5, 20, "Plate Area"],
        ["Weight Plate", 10, 15, "Plate Area"],
        ["Weight Plate", 20, 10, "Plate Area"]
    ];

    const insertMany = db.transaction((items) => {

        for (const item of items) {
            insert.run(...item);
        }

    });

    insertMany(weights);
}


/*
    SEED MACHINES
*/
const machineCount = db
    .prepare("SELECT COUNT(*) AS count FROM machines")
    .get()
    .count;

if (machineCount === 0) {

    const insert = db.prepare(`
        INSERT INTO machines
        (
            name,
            machine_type,
            muscle_group,
            quantity,
            status
        )
        VALUES (?, ?, ?, ?, ?)
    `);

    const machines = [
        [
            "Leg Press",
            "Strength Machine",
            "Legs",
            2,
            "Available"
        ],
        [
            "Chest Press",
            "Strength Machine",
            "Chest",
            2,
            "Available"
        ],
        [
            "Lat Pulldown",
            "Cable Machine",
            "Back",
            2,
            "Available"
        ],
        [
            "Shoulder Press",
            "Strength Machine",
            "Shoulders",
            1,
            "Available"
        ],
        [
            "Treadmill",
            "Cardio",
            "Full Body",
            6,
            "Available"
        ],
        [
            "Stationary Bike",
            "Cardio",
            "Legs",
            4,
            "Available"
        ],
        [
            "Cable Crossover",
            "Cable Machine",
            "Full Body",
            1,
            "Maintenance"
        ],
        [
            "Squat Rack",
            "Free Weight Machine",
            "Legs",
            4,
            "Available"
        ]
    ];

    const insertMany = db.transaction((items) => {

        for (const item of items) {
            insert.run(...item);
        }

    });

    insertMany(machines);
}


/*
    SEED RESOURCES
*/
const resourceCount = db
    .prepare("SELECT COUNT(*) AS count FROM resources")
    .get()
    .count;

if (resourceCount === 0) {

    const insert = db.prepare(`
        INSERT INTO resources
        (
            name,
            resource_type,
            availability
        )
        VALUES (?, ?, ?)
    `);

    const resources = [
        [
            "Drinking Water",
            "Utility",
            "Available"
        ],
        [
            "Changing Room",
            "Facility",
            "Available"
        ],
        [
            "Showers",
            "Facility",
            "Available"
        ],
        [
            "Locker Area",
            "Facility",
            "Available"
        ],
        [
            "Wi-Fi",
            "Utility",
            "Available"
        ],
        [
            "First Aid",
            "Safety",
            "Available"
        ],
        [
            "Air Conditioning",
            "Utility",
            "Available"
        ]
    ];

    const insertMany = db.transaction((items) => {

        for (const item of items) {
            insert.run(...item);
        }

    });

    insertMany(resources);
}


/*
    SEED TRAINERS
*/
const trainerCount = db
    .prepare("SELECT COUNT(*) AS count FROM trainers")
    .get()
    .count;

if (trainerCount === 0) {

    const insert = db.prepare(`
        INSERT INTO trainers
        (
            name,
            specialization,
            experience_years,
            availability
        )
        VALUES (?, ?, ?, ?)
    `);

    const trainers = [
        [
            "Alex Morgan",
            "Strength Training",
            8,
            "Available"
        ],
        [
            "Sarah Williams",
            "Weight Loss",
            6,
            "Available"
        ],
        [
            "Daniel Smith",
            "Bodybuilding",
            10,
            "Available"
        ],
        [
            "Emma Davis",
            "Functional Training",
            5,
            "Available"
        ],
        [
            "Ryan Wilson",
            "Cardio Training",
            7,
            "Available"
        ]
    ];

    const insertMany = db.transaction((items) => {

        for (const item of items) {
            insert.run(...item);
        }

    });

    insertMany(trainers);
}


module.exports = db;
