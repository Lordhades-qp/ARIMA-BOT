const { MessageType } = require('@adiwajshing/baileys');
const fs = require('fs');
const path = require('path');
const { format } = require('./mesfonctions'); // Si vous avez une fonction pour formater les informations
const moment = require('moment-timezone');
const os = require('os');
const s = require('./set'); // Vous pouvez adapter en fonction de votre configuration de bot

// Fonction pour afficher le menu spécial
async function sendSpecialMenu(zk, dest, commandeOptions) {
  let { ms, repondre } = commandeOptions;
  const temps = moment(moment()).format("HH:MM:SS");
  moment.tz.setDefault('Asia/karachi').locale("id");
  const date = moment.tz("Asia/karachi").format("DD/MM/YYYY");
  
  const menuMsg = `
  ╩═══ * ArimaBot Spécial Menu * ╩═══\n\n
  ╔════ ▓▓ ࿇ ▓▓ ════╗
  ||    Préfixe : ${s.PREFIXE}
  ||    Owner : ${s.NOM_OWNER}
  ||    Mode : ${s.MODE === "oui" ? "Public" : "Privé"}
  ||    Commandes : ${s.COMMANDES_COUNT}
  ||    Date : ${date}
  ||    Heure : ${temps}
  ||    Mémoire : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
  ||    Plateforme : ${os.platform()}
  ||    Développeurs : Éternel Arima
  ╚════ ▓▓ ࿇ ▓▓ ════╝
  
  `;
  
  // Ajouter des catégories et des commandes dans le menu
  const coms = {}; // Un objet pour stocker les commandes par catégorie
  
  // Exemple d'ajout de commandes
  coms['Général'] = ['!help', '!info', '!ping'];
  coms['Fun'] = ['!meme', '!joke'];
  coms['Modération'] = ['!kick', '!ban'];
  
  for (const cat in coms) {
    menuMsg += `\n${cat} :\n`;
    coms[cat].forEach((cmd) => {
      menuMsg += `  ${cmd}\n`;
    });
  }

  // Lien de l'image (personnalisable)
  const link = s.IMAGE_MENU || 'https://imgur.com/a/oz4klEM';

  try {
    await zk.sendMessage(dest, {
      image: { url: link },
      caption: menuMsg,
      footer: "Par Éternel Arima",
    }, { quoted: ms });
  } catch (e) {
    console.log("Erreur lors de l'envoi du menu spécial :", e);
    repondre("Erreur lors de l'envoi du menu spécial !");
  }
}

// Commande de menu spécial
async function specialMenuCommand(zk, msg, dest) {
  await sendSpecialMenu(zk, dest, {
    ms: msg,
    repondre: (response) => { zk.sendMessage(dest, response, { quoted: msg }); }
  });
}

// Exports
module.exports = {
  sendSpecialMenu,
  specialMenuCommand
};
