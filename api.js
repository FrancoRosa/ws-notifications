require("dotenv").config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { getOutDatedNotification, getQuote } = require('./js/helpers');

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    console.log('... scan this QR code with whatsApp:');
    qrcode.generate(qr, { small: true });
});


const sendMessage = async (to, text) => {
    try {
        await client.sendMessage(to, text);
        console.log(`... message sent to ${to}: ${text}`);
    } catch (error) {
        console.error(`... failed to send message to ${to}:`, error);
    }
}

client.on('ready', () => {
    console.log("... whatsapp ready!")
    const groupId = process.env.WS_GROUP

    setInterval(() => {
        const time = new Date().toLocaleString("sv")
        if (time.includes(":00:00")) {
            console.log("... checking dips")
            getOutDatedNotification().then(res => {
                if (res) {
                    sendMessage(groupId, res)
                }
            })
        }
        if (time.includes("08:15:15")) {
            getQuote().then(res => {
                sendMessage(groupId, res)
            })
        }
    }, 1000);
});

client.initialize();
