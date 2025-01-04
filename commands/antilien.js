const { Client, MessageType } = require('@adiwajshing/baileys');
const fs = require('fs');

// Liste des domaines bloqués (exemple : réseaux sociaux, sites douteux)
const blockedDomains = ['example.com', 'malicioussite.com', 'phishing.com'];

// Initialisation d'un fichier pour stocker les utilisateurs bannis
const bannedUsersFile = './bannedUsers.json';

// Si le fichier n'existe pas, on le crée
if (!fs.existsSync(bannedUsersFile)) {
  fs.writeFileSync(bannedUsersFile, JSON.stringify([]));
}

const bannedUsers = JSON.parse(fs.readFileSync(bannedUsersFile));

// Fonction pour bannir un utilisateur
const banUser = (userId, client) => {
  if (!bannedUsers.includes(userId)) {
    bannedUsers.push(userId);
    fs.writeFileSync(bannedUsersFile, JSON.stringify(bannedUsers));
  }

  client.sendMessage(userId, 'Vous avez été banni pour avoir envoyé un lien interdit.', MessageType.text);
  client.updateBlockStatus(userId, 'block');  // Bloque l'utilisateur
};

// Fonction pour vérifier les liens dans le message
const containsBlockedLink = (message) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const urls = message.match(urlPattern);

  if (urls) {
    for (let url of urls) {
      const domain = new URL(url).hostname;

      if (blockedDomains.includes(domain)) {
        return true;  // Si le domaine est dans la liste des interdits
      }
    }
  }

  return false;  // Aucun lien bloqué trouvé
};

// Fonction pour gérer les messages et détecter les liens
const handleMessage = (client, message) => {
  const { from, body, isGroupMsg, sender } = message;

  if (!isGroupMsg) return;  // Ne traiter que les messages dans les groupes

  const userId = sender.id;

  // Vérification des liens dans le message
  if (containsBlockedLink(body)) {
    console.log(`Lien interdit détecté de l'utilisateur ${userId} (${sender.pushname})`);

    // Bannir l'utilisateur qui a envoyé un lien bloqué
    banUser(userId, client);
  }
};

// Fonction pour démarrer la protection contre les liens
const startAntiLinkProtection = (client) => {
  client.on('message-new', (message) => {
    handleMessage(client, message);
  });
};

module.exports = { startAntiLinkProtection };
