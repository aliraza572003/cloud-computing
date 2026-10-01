require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

require("./database");

const apiRoutes = require("./routes/api");

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.disable("x-powered-by");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use(express.static(
    path.join(__dirname, "public")
));

app.use("/api", apiRoutes);


/*
    Public frontend configuration.

    The Google Maps browser key is intentionally
    exposed to the frontend because Maps JavaScript
    API runs in the browser.

    Restrict the key in Google Cloud.
*/
app.get("/config", (req, res) => {

    res.json({
        success: true,

        googleMapsApiKey:
            process.env.GOOGLE_MAPS_API_KEY || "",

        googleMapId:
            process.env.GOOGLE_MAP_ID ||
            "DEMO_MAP_ID"
    });

});


/*
    API health check.
*/
app.get("/api/health", (req, res) => {

    res.status(200).json({
        success: true,
        status: "online",
        service: "IronForge Gym API",
        timestamp: new Date().toISOString()
    });

});


/*
    Unknown API endpoint.
*/
app.use("/api", (req, res) => {

    res.status(404).json({
        success: false,
        message: "API endpoint not found."
    });

});


/*
    Frontend fallback.
*/
app.get("*", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );

});


/*
    Global error handler.
*/
app.use((error, req, res, next) => {

    console.error(error);

    res.status(500).json({
        success: false,
        message: "Internal server error."
    });

});


app.listen(PORT, () => {

    console.log("");
    console.log("====================================");
    console.log("       IRONFORGE GYM SYSTEM");
    console.log("====================================");
    console.log(`Server: http://localhost:${PORT}`);
    console.log("");
    console.log("API:");
    console.log("GET  /api/health");
    console.log("GET  /api/dashboard");
    console.log("GET  /api/machines");
    console.log("GET  /api/weights");
    console.log("GET  /api/trainers");
    console.log("GET  /api/resources");
    console.log("GET  /api/stats");
    console.log("POST /api/interested-members");
    console.log("====================================");
    console.log("");

});
