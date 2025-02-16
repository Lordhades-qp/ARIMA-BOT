/*
 BASE RIMKUS PULSE
    
 # 
 - DO NOT delete CREDITS 💀
*/
require("./database/global")

const func = require("./database/place")
const readline = require("readline");
const usePairingCode = true
const question = (text) => {
  const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
  });
  return new Promise((resolve) => {
rl.question(text, resolve)
  })
};

async function startSesi() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(chalk.red.bold('\n𓊈 𓄂⍣⃝ ❦︎⃟𓍝𝚳𝚫𝐒𝚻𝚵𝚪𝚳𝚰𝚴𝐃☠︎ ⃝⃞ 𓊉\n\n\n\n\n           <|>  𓄂⍣⃝ ❦︎⃟𓍝𝚳𝚫𝐒𝚻𝚵𝚪𝚳𝚰𝚴𝐃☠︎ ⃝⃞ <|>\n\n\n\n\n\n\n\n<> 𝐒𝐜𝐫𝐢𝐩𝐭 𝐁𝐲 <> : 𓄂⍣⃝ ❦︎⃟𓍝𝚳𝚫𝐒𝚻𝚵𝚪𝚳𝚰𝚴𝐃☠︎ ⃝⃞\n<> 𝐕𝐞𝐫𝐢𝐬𝐨𝐧 𝐒𝐜𝐫𝐢𝐩𝐭 <> : 𝐕𝟐\n<> Dev <> : 𓄂⍣⃝ ❦︎⃟𓍝𝚳𝚫𝐒𝚻𝚵𝚪𝚳𝚰𝚴𝐃☠︎ ⃝⃞ \n<> 𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 𝐃𝐞𝐯 <> : \n<> 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐃𝐞v <> : 2250565647864\n\n𝐓𝐚𝐧𝐤𝐬 𝐘𝐨𝐮 𝐁𝐮𝐲 𝐒𝐜𝐫𝐢𝐩𝐭 𝐌𝐞 :)'))
const connectionOptions = {
version,
keepAliveIntervalMs: 30000,
printQRInTerminal: !usePairingCode,
logger: pino({ level: "fatal" }),
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]   
// browser: ['Chrome (Linux)', '', '']
}
const zyn = func.makeWASocket(connectionOptions)
if(usePairingCode && !zyn.authState.creds.registered) {
		const phoneNumber = await question(chalk.green('\nEnter Your Number\nNumber : '));
		const code = await zyn.requestPairingCode(phoneNumber.trim())
		console.log(chalk.green(`Your Pairing Code : ${code} `))

	}
store.bind(zyn.ev)

zyn.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'blue'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'blue'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
zyn.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
zyn.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
start(`1`, `Connecting...`)
} else if (connection === "open") {
success(`1`, `CONNECTED`)
zyn.sendMessage(`2250565647864@s.whatsapp.net`, { text: `\`𝗛𝗜 𝒗𝒂𝒏𝒒𝒖𝒊𝒔𝒉\`                                 ┏━━━𓊈 𝐑𝐈𝐌𝐊𝐔𝐒 𝐗 𝒗𝒂𝒏𝒒𝒖𝒊𝒔𝒉  𓊉━━
┃ 𝐒𝐂𝐑𝐈𝐏𝐓 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 : 𝐕1
┃ 𝐎𝐖𝐍𝐄𝐑 𝟏 : *𓄂⍣⃝ ❦︎⃟𓍝𝚳𝚫𝐒𝚻𝚵𝚪𝚳𝚰𝚴𝐃☠︎ ⃝⃞*
┃ 𝐎𝐖𝐍𝐄𝐑 𝟐 : *𓄂⍣⃝ ❦︎⃟𓍝𝚳𝚫𝐒𝚻𝚵𝚪𝚳𝚰𝚴𝐃☠︎ ⃝⃞*
┃ 𝐒𝐓𝐀𝐓𝐔𝐒 : 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 ✅
┗━━━━━━━━━━━━━━━━━━━━┛
https://whatsapp.com/channel/0029VauerXp2f3ERPtUjBy0u`})
if (autoJoin) {
zyn.groupAcceptInvite(codeInvite)
}
}
})

zyn.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return zyn.readMessages([m.key])
if (!zyn.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = func.smsg(zyn, m, store)
require("./RimKus")(zyn, m, store)
} catch (err) {
console.log(err)
}
})

zyn.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = zyn.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

zyn.public = true

zyn.ev.on('creds.update', saveCreds)
return zyn
}

startSesi()

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err)
})
