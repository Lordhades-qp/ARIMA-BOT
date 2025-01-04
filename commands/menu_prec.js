const util = require('util');
const fs = require('fs-extra');
const { arimaBot } = require(__dirname + "/../framework/arimaBot");
const { format, styletext } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

arimaBot({ nomCom: "menu", categorie: "Général" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/arimaBot");
    let coms = {};
    let mode = "public";
    
    if (s.MODE !== "oui") {
        mode = "privé";
    }

    // Définition des emojis pour chaque catégorie
    let emoji = {
        "Général": "🌐", 
        "Logo": "🎨", 
        "Hentai": "🔥", 
        "Weeb": "🌸", 
        "Recherche": "🔍", 
        "Conversion": "🌟", 
        "Groupe": "♻️", 
        "Autre": "🪖"
    };

    // Classement des commandes par catégorie
    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    // Formatage de l'heure et de la date
    const temps = moment(moment()).format("HH:mm:ss");
    moment.tz.setDefault('Asia/Karachi').locale("id");
    const date = moment.tz("Asia/Karachi").format("DD/MM/YYYY");

    // Construction du message du menu
    let menuMsg = "  ╩═══ * Ƶ𝓞ｋØ𝓊 * ╩═══\n\n";
    menuMsg += `
╔════---------
║    Préfixe : ${s.PREFIXE}
║    Owner : ${s.NOM_OWNER}    
║    Mode : ${mode}
║    Commandes : ${cm.length}
║    Date : ${date}
║    Heure : ${temps}
║    Mémoire : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
║    Plateforme : ${os.platform()}
║    Développeurs : Éternel Arima
╚════--------------- \n\n`;

    // Affichage des commandes par catégorie
    for (const cat in coms) {
        if (!emoji[cat]) emoji[cat] = "💞";
        menuMsg += `${emoji[cat]} ══ *${cat}* ══ ${emoji[cat]}\n`;
        for (const cmd of coms[cat]) {
            menuMsg += `\t  ║ ${cmd} \n`;
        }
    }

    // URL de l'image de fond (vous pouvez personnaliser cela)
    const link = s.IMAGE_MENU;"https://imgur.com/a/oz4klEM"

    // Envoi du message
    try {
        zk.sendMessage(dest, { image: { url: link }, caption: menuMsg, footer: "by Éternel Arima" }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
});
