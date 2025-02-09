require("dotenv").config();
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { getOutDatedNotification, getQuote } = require("./js/helpers");

const client = new Client({
  authStrategy: new LocalAuth(),
});

const groupId = process.env.WS_GROUP;


const sendMessage = async (to, text) => {
  try {
    await client.sendMessage(to, text);
    console.log(`... message sent to ${to}: ${text}`);
  } catch (error) {
    console.error(`... failed to send message to ${to}:`, error);
  }
};

const statusMsg = () => {
  getOutDatedNotification().then((res) => {
    if (res) {
      sendMessage(groupId, res);
    }
  });
};

const quoteMsg = () => {
  getQuote().then((res) => {
    sendMessage(groupId, res);
  });
};

client.on("qr", (qr) => {
  console.log("... scan this QR code with whatsApp:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("... whatsapp ready!");

  setInterval(() => {
    const time = new Date().toLocaleString("sv");
    if (time.includes(":00:00")) {
      statusMsg();
    }
    if (time.includes("08:15:15")) {
      quoteMsg();
    }
  }, 1000);
});

client.on("message", (msg) => {
  const { from, to, body, type } = msg;
  console.log({from, body })
  if (from === 'status@broadcast') {
    console.log(msg)
  }
  if (from === groupId) {
    if (body.toLowerCase().includes("status")) {
        statusMsg()
    }
    if (body.toLowerCase().includes("quote")) {
        statusMsg()
    }
  }
});

client.initialize();
