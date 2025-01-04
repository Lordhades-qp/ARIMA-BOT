const { Client, MessageType } = require('@adiwajshing/baileys');
const fs = require('fs');

// Fichier pour stocker les groupes et leurs menus
const menuFile = './menu.json';

// Si le fichier n'existe pas, on le crée
if (!fs.existsSync(menuFile)) {
  fs.writeFileSync(menuFile, JSON.stringify({}));
}

const menus = JSON.parse(fs.readFileSync(menuFile));

// Fonction pour afficher le menu principal du groupe
const showMainMenu = (client, groupId) => {
  const menu = `
  *Menu Principal du Groupe*
  1. Ajouter un membre : !ajouter <numero>
  2. Retirer un membre : !retirer <numero>
  3. Promouvoir un administrateur : !promouvoir <numero>
  4. Rétrograder un administrateur : !rétrograder <numero>
  5. Envoyer un message à tous : !message <message>
  6. Voir les membres administrateurs : !admins
  `;
  client.sendMessage(groupId, menu, MessageType.text);
};

// Fonction pour afficher le menu des administrateurs
const showAdminMenu = (client, groupId) => {
  const menu = `
  *Menu Administrateur*
  1. Ajouter un administrateur : !ajouter_admin <numero>
  2. Retirer un administrateur : !retirer_admin <numero>
  3. Activer le mode silencieux : !silencieux
  4. Désactiver le mode silencieux : !desilencieux
  `;
  client.sendMessage(groupId, menu, MessageType.text);
};

// Fonction pour gérer les commandes du menu
const handleGroupMenuCommands = (client, message) => {
  const { from, isGroupMsg, sender, body } = message;
  const groupId = from;
  const userId = sender.id;
  const command = body.trim().toLowerCase();

  if (!isGroupMsg) return; // Ne traiter que les messages dans les groupes

  // Afficher le menu principal ou admin en fonction du rôle de l'utilisateur
  if (command === '!menu') {
    showMainMenu(client, groupId);
  } else if (command === '!adminmenu') {
    showAdminMenu(client, groupId);
  } else if (command.startsWith('!ajouter')) {
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
  } else if (command.startsWith('!admins')) {
    listAdmins(client, groupId);
  } else if (command.startsWith('!ajouter_admin')) {
    const userToAddAdmin = command.split(' ')[1];
    addAdmin(client, groupId, userToAddAdmin);
  } else if (command.startsWith('!retirer_admin')) {
    const userToRemoveAdmin = command.split(' ')[1];
    removeAdmin(client, groupId, userToRemoveAdmin);
  }
};

// Fonction pour ajouter un membre au groupe
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

// Fonction pour promouvoir un administrateur
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

// Fonction pour envoyer un message à un groupe
const sendMessageToGroup = async (client, groupId, message) => {
  try {
    await client.sendMessage(groupId, message, MessageType.text);
    console.log(`Message envoyé dans le groupe ${groupId}: ${message}`);
  } catch (error) {
    console.error(`Erreur en envoyant le message dans le groupe ${groupId}: `, error);
  }
};

// Fonction pour lister les administrateurs du groupe
const listAdmins = async (client, groupId) => {
  try {
    const groupMetadata = await client.groupMetadata(groupId);
    const admins = groupMetadata.participants.filter(p => p.isAdmin);
    const adminList = admins.map(admin => admin.id).join('\n');
    client.sendMessage(groupId, `Les administrateurs du groupe :\n${adminList}`, MessageType.text);
  } catch (error) {
    console.error(`Erreur lors de la récupération des administrateurs dans le groupe ${groupId}: `, error);
  }
};

// Fonction pour ajouter un administrateur à un groupe
const addAdmin = (client, groupId, userId) => {
  if (!menus[groupId]) {
    menus[groupId] = { admins: [] };
  }
  if (!menus[groupId].admins.includes(userId)) {
    menus[groupId].admins.push(userId);
    fs.writeFileSync(menuFile, JSON.stringify(menus));
  }
};

// Fonction pour retirer un administrateur d'un groupe
const removeAdmin = (client, groupId, userId) => {
  if (menus[groupId] && menus[groupId].admins.includes(userId)) {
    menus[groupId].admins = menus[groupId].admins.filter(admin => admin !== userId);
    fs.writeFileSync(menuFile, JSON.stringify(menus));
  }
};

module.exports = { handleGroupMenuCommands, showMainMenu, showAdminMenu };
