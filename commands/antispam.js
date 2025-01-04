const { Client, MessageType } = require('@adiwajshing/baileys');
const fs = require('fs');

// Fichier pour stocker les utilisateurs spammeurs
const spamUsersFile = './spamUsers.json';

// Si le fichier n'existe pas, on le crée
if (!fs.existsSync(spamUsersFile)) {
  fs.writeFileSync(spamUsersFile, JSON.stringify({}));
}

const spamUsers = JSON.parse(fs.readFileSync(spamUsersFile));

// Limite de messages avant qu'un utilisateur soit considéré comme spammeur (par minute)
const spamThreshold = 5; // 5 messages par minute

// Fonction pour bannir un utilisateur
const banUser = (userId, client) => {
  spamUsers[userId] = Date.now();  // Marquer l'utilisateur comme spammeur
  fs.writeFileSync(spamUsersFile, JSON.stringify(spamUsers));

  client.sendMessage(userId, 'Vous avez été banni pour avoir envoyé trop de messages en peu de temps.', MessageType.text);
  client.updateBlockStatus(userId, 'block');  // Bloquer l'utilisateur
};

// Fonction pour vérifier si un utilisateur a spammé
const isSpammer = (userId) => {
  if (spamUsers[userId]) {
    const lastMessageTime = spamUsers[userId];
    const currentTime = Date.now();

    // Vérifie si l'utilisateur a envoyé plus de messages que le seuil défini dans la période donnée
    if (currentTime - lastMessageTime < 60000) {  // Moins d'une minute
      return true;
    }
  }

  return false;
};

// Fonction pour gérer les messages
const handleMessage = (client, message) => {
  const { from, isGroupMsg, sender, body } = message;

  if (!isGroupMsg) return;  // Ne traiter que les messages dans les groupes

  const userId = sender.id;

  // Vérifier si l'utilisateur est un spammeur
  if (isSpammer(userId)) {
    console.log(`Spam détecté de l'utilisateur ${userId} (${sender.pushname})`);

    // Bannir l'utilisateur pour spam
    banUser(userId, client);
  } else {
    // Si l'utilisateur n'est pas un spammeur, on met à jour son dernier message
    spamUsers[userId] = Date.now();
    fs.writeFileSync(spamUsersFile, JSON.stringify(spamUsers));
  }
};

// Fonction pour démarrer la protection contre le spam
const startAntiSpamProtection = (client) => {
  client.on('message-new', (message) => {
    handleMessage(client, message);
  });
};

module.exports = { startAntiSpamProtection };
