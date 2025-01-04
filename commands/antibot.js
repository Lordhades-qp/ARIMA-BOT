const { Client, MessageType } = require('@adiwajshing/baileys');  // Bibliothèque Baileys pour la gestion des messages WhatsApp
const fs = require('fs');
const moment = require('moment');

// Utilisation d'un fichier pour stocker les utilisateurs suspects ou bannis
const bannedUsersFile = './bannedUsers.json';
const suspiciousUsersFile = './suspiciousUsers.json';

// Initialisation des fichiers si non existants
if (!fs.existsSync(bannedUsersFile)) {
  fs.writeFileSync(bannedUsersFile, JSON.stringify([]));
}

if (!fs.existsSync(suspiciousUsersFile)) {
  fs.writeFileSync(suspiciousUsersFile, JSON.stringify([]));
}

const bannedUsers = JSON.parse(fs.readFileSync(bannedUsersFile));
const suspiciousUsers = JSON.parse(fs.readFileSync(suspiciousUsersFile));

// Fonction pour bannir un utilisateur
const banUser = (userId, client) => {
  if (!bannedUsers.includes(userId)) {
    bannedUsers.push(userId);
    fs.writeFileSync(bannedUsersFile, JSON.stringify(bannedUsers));
  }
  
  client.sendMessage(userId, 'Vous avez été banni pour comportement suspect.', MessageType.text);
  client.updateBlockStatus(userId, 'block');  // Bloque l'utilisateur
};

// Fonction pour signaler un utilisateur comme suspect
const markAsSuspicious = (userId) => {
  if (!suspiciousUsers.includes(userId)) {
    suspiciousUsers.push(userId);
    fs.writeFileSync(suspiciousUsersFile, JSON.stringify(suspiciousUsers));
  }
};

// Fonction pour vérifier les messages et détecter les comportements de bot
const handleMessage = (client, message) => {
  const { from, body, isGroupMsg, sender } = message;

  if (!isGroupMsg) return; // Ne traiter que les messages dans les groupes

  const userId = sender.id;

  // Vérification des messages trop rapides ou répétés (indicateurs typiques de bots)
  const currentTime = moment().unix();
  const userLastMessageTime = sender.timestamp || 0; // Temps du dernier message de l'utilisateur

  const timeDifference = currentTime - userLastMessageTime;

  // Si un utilisateur envoie plusieurs messages trop rapidement, il peut être suspect
  if (timeDifference < 3) {  // Si l'utilisateur envoie un message toutes les 3 secondes
    console.log(`Possible bot détecté : ${userId} (${sender.pushname})`);

    markAsSuspicious(userId);  // Marquer l'utilisateur comme suspect

    // Si l'utilisateur est déjà suspect, on le bannit
    if (suspiciousUsers.includes(userId)) {
      banUser(userId, client);
    }
  }

  // Réagir à un message spécifique (par exemple, un mot clé comme "bot" dans le message)
  if (body.toLowerCase().includes('bot')) {
    console.log(`Utilisateur ${userId} signalé pour utilisation du mot 'bot'`);
    markAsSuspicious(userId);
  }
};

// Fonction pour démarrer le client WhatsApp
const startBotProtection = (client) => {
  client.on('message-new', (message) => {
    handleMessage(client, message);
  });
};

module.exports = { startBotProtection };
