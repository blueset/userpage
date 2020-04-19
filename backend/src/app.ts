import express from "express";
import bodyParser from "body-parser";
import { getEntriesWithVerification } from "./data";
import path from "path";

const frontendPath = path.join(__dirname, "..", "..", "frontend", "build");

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(frontendPath));
app.get("/", function (req, res) {
    res.sendFile(path.join(frontendPath, "index.html"));
});

app.get("/data", (req, res) => {
    const data = getEntriesWithVerification();
    res.json(data);
});

app.post("/data", (req, res) => {
    let payload = undefined;
    if (typeof req.body === "object" && req.body.id && req.body.hash) {
        payload = req.body;
    }
    const data = getEntriesWithVerification(payload);
    res.json(data);
});

export default app;
