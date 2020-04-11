import express from "express";
import bodyParser from "body-parser";
import { getEntriesByTelegramID } from "./data";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/test", (req, res) => {
    res.send(`
    <body>
    <script async src="https://telegram.org/js/telegram-widget.js?8" data-telegram-login="utsdskgmbot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
    <script type="text/javascript">
    function onTelegramAuth(user) {
        console.log(user);
        alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    }
    </script>
    </body>
`);
});

app.get("/data", (req, res) => {
    const data = getEntriesByTelegramID();
    res.json(data);
});

app.post("/data", (req, res) => {
    let payload = undefined;
    if (typeof req.body === "object" && req.body.id && req.body.hash) {
        payload = req.body;
    }
    const data = getEntriesByTelegramID(payload);
    res.json(data);
});

export default app;
