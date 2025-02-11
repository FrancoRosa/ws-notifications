import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import https from "https";
import docs from "./js/docs.mjs";
import { getOutDatedNotification, getQuote } from "./js/helpers.mjs";
import { marked } from "marked";
import savedSettings from "./settings.json" assert { type: "json" };
import { writeFile } from "fs/promises";

let settings = savedSettings;

dotenv.config();

const app = express();
const PORT = 6420;

app.use(cors());
app.use(express.json());

const token = process.env.WHATSAPP_HOOK_TOKEN;
let lastStatus = "";

const timestamp = () => {
  return new Date().toLocaleString("sv");
};

const sendWsMsg = (to, text) => {
  const url = process.env.WHATSAPP_URL;
  const api_key = process.env.WHATSAPP_API_TOKEN;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_key}`,
  };

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "text",
    text: {
      preview_url: false,
      body: text,
    },
  };

  fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then(console.log)
    .catch(console.error);
};

const statusMsg = (to, onDemand = false) => {
  getOutDatedNotification().then((res) => {
    if (onDemand) {
      if (res) {
        sendWsMsg(to, res);
      } else {
        sendWsMsg(to, "All sites are reporting on time");
      }
    } else {
      if (res && res !== lastStatus) {
        sendWsMsg(to, res);
      }
      lastStatus = res;
    }
  });
};

const quoteMsg = (to) => {
  getQuote().then((res) => {
    sendWsMsg(to, res);
  });
};

setInterval(() => {
  const time = new Date().toLocaleString("sv", { timeZone: "America/Regina" });
  if (time.includes(":00:35")) {
    console.log(timestamp());
    settings.subscribed.forEach((subscribed) => {
      statusMsg(subscribed, false);
    });
  }
  if (time.includes("08:05:35")) {
    console.log(timestamp());
    settings.subscribed.forEach((subscribed) => {
      quoteMsg(subscribed);
    });
  }
}, 1000);

app.get("/", async (req, res) => {
  res.send({ msg: "whatsapp knbot" });
});

app.get("/webhook", async (req, res) => {
  if (
    req.query["hub.mode"] == "subscribe" &&
    req.query["hub.verify_token"] == token
  ) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(400);
  }
});

app.post("/webhook", async (req, res) => {
  if ("messages" in req.body.entry[0].changes[0].value) {
    const {
      entry: [
        {
          changes: [
            {
              value: {
                messages: [
                  {
                    from,
                    text: { body },
                  },
                ],
              },
            },
          ],
        },
      ],
    } = req.body;

    if (body && from) {
      const sanitized = body.toLowerCase().trim();
      switch (sanitized) {
        case "status":
          statusMsg(from, true);
          break;
        case "quote":
          quoteMsg(from);
          break;
        case "subscribed":
          sendWsMsg(from, JSON.stringify(settings, null, 2));
          break;
        case "subscribe":
          if (settings.subscribed.includes(from)) {
            sendWsMsg(from, `${from} already subscribed`);
          } else {
            settings.subscribed = [...settings.subscribed, from];
            await writeFile("settings.json", JSON.stringify(settings, null, 2));
            sendWsMsg(from, `${from} successfully subscribed`);
          }
          console.log(settings);

          break;
        case "unsubscribe":
          if (settings.subscribed.includes(from)) {
            settings.subscribed = settings.subscribed.filter((s) => s !== from);
            await writeFile("settings.json", JSON.stringify(settings, null, 2));
            sendWsMsg(from, `${from} successfully unsubscribed`);
          } else {
            sendWsMsg(from, `${from} already unsubscribed`);
          }
          console.log(settings);

          break;

        default:
          sendWsMsg(from, "I don't understand it");
          break;
      }

      res.send({ msg: "message received" });
    }
  }
});

app.get("/docs/:doc", async (req, res) => {
  const { doc } = req.params;
  if (docs[doc]) {
    res.send(marked(docs[doc]));
  } else {
    res.send(marked("No document found"));
  }
});

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/rtkflow.xyz/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/rtkflow.xyz/fullchain.pem"),
  // key: fs.readFileSync("./server.key"),
  // cert: fs.readFileSync("./server.cert"),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`🚀 Server running on https://localhost:${PORT}`);
});
