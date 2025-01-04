const { Client, MessageType } = require('@adiwajshing/baileys');
const fs = require('fs');

// Fichier pour stocker les groupes et leurs administrateurs
const groupsFile = './groups.json';

// Si le fichier n'existe pas, on le crée
if (!fs.existsSync(groupsFile)) {
  fs.writeFileSync(groupsFile, JSON.stringify({}));
}

const groups = JSON.parse(fs.readFileSync(groupsFile));

// Fonction pour ajouter un membre à un groupe
const addMember = async (client, groupId, userId) => {
  try {
    await client.groupAdd(groupId, [userId]);
    console.log(`Utilisateur ${userId} ajouté au groupe ${groupId}`);
  } catch (error) {
    console.error(`Erreur en ajoutant ${userId} au groupe ${groupId}: `, error);
  }
};

// Fonction pour retirer un membre du groupe
const removeMember = async (client, groupId, userId) => {
  try {
    await client.groupRemove(groupId, [userId]);
    console.log(`Utilisateur ${userId} retiré du groupe ${groupId}`);
  } catch (error) {
    console.error(`Erreur en retirant ${userId} du groupe ${groupId}: `, error);
  }
};

// Fonction pour promouvoir un membre à administrateur
const promoteAdmin = async (client, groupId, userId) => {
  try {
    await client.groupParticipantsUpdate(groupId, [userId], 'promote');
    console.log(`Utilisateur ${userId} promu administrateur dans le groupe ${groupId}`);
  } catch (error) {
    console.error(`Erreur en promouvant ${userId} dans le groupe ${groupId}: `, error);
  }
};

// Fonction pour rétrograder un administrateur
const demoteAdmin = async (client, groupId, userId) => {
  try {
    await client.groupParticipantsUpdate(groupId, [userId], 'demote');
    console.log(`Administrateur ${userId} rétrogradé dans le groupe ${groupId}`);
  } catch (error) {
    console.error(`Erreur en rétrogradant ${userId} dans le groupe ${groupId}: `, error);
  }
};

// Fonction pour envoyer un message au groupe
const sendMessageToGroup = async (client, groupId, message) => {
  try {
    await client.sendMessage(groupId, message, MessageType.text);
    console.log(`Message envoyé dans le groupe ${groupId}: ${message}`);
  } catch (error) {
    console.error(`Erreur en envoyant le message dans le groupe ${groupId}: `, error);
  }
};

// Fonction pour gérer les commandes spécifiques au groupe
const handleGroupCommands = (client, message) => {
  const { from, isGroupMsg, sender, body } = message;

  if (!isGroupMsg) return;  // Ne traiter que les messages dans les groupes

  const groupId = from;
  const userId = sender.id;
  const command = body.trim().toLowerCase();

  if (command.startsWith('!ajouter')) {
    const userToAdd = command.split(' ')[1];
    addMember(client, groupId, userToAdd);
  } else if (command.startsWith('!retirer')) {
    const userToRemove = command.split(' ')[1];
    removeMember(client, groupId, userToRemove);
  } else if (command.startsWith('!promouvoir')) {
    const userToPromote = command.split(' ')[1];
    promoteAdmin(client, groupId, userToPromote);
  } else if (command.startsWith('!rétrograder')) {
    const userToDemote = command.split(' ')[1];
    demoteAdmin(client, groupId, userToDemote);
  } else if (command.startsWith('!message')) {
    const messageText = command.split(' ').slice(1).join(' ');
    sendMessageToGroup(client, groupId, messageText);
  }
};

// Fonction pour démarrer la gestion des groupes
const startGroupManagement = (client) => {
  client.on('message-new', (message) => {
    handleGroupCommands(client, message);
  });
};

// Fonction pour enregistrer un groupe
const registerGroup = (groupId) => {
  if (!groups[groupId]) {
    groups[groupId] = { admins: [] };
    fs.writeFileSync(groupsFile, JSON.stringify(groups));
  }
};

// Fonction pour ajouter un administrateur à un groupe
const addAdmin = (groupId, adminId) => {
  if (!groups[groupId]) {
    groups[groupId] = { admins: [] };
  }
  if (!groups[groupId].admins.includes(adminId)) {
    groups[groupId].admins.push(adminId);
    fs.writeFileSync(groupsFile, JSON.stringify(groups));
  }
};

// Fonction pour vérifier si un utilisateur est administrateur
const isAdmin = (groupId, userId) => {
  return groups[groupId] && groups[groupId].admins.includes(userId);
};

module.exports = { startGroupManagement, registerGroup, addAdmin, isAdmin };
