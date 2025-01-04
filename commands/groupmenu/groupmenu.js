const fs = require('fs');

// Charger le fichier JSON
const menuFile = './groupmenu.json';
let menuData = JSON.parse(fs.readFileSync(menuFile));

// Fonction pour obtenir les paramètres d'un groupe
const getGroupSettings = (groupId) => {
  return menuData.groups[groupId]?.settings || menuData.groupSettings.default;
};

// Exemple d'utilisation : Afficher les paramètres d'un groupe
const groupId = '1203630254@g.us'; // Identifiant du groupe
const settings = getGroupSettings(groupId);

console.log(`Paramètres pour le groupe ${groupId} :`, settings);

// Mettre à jour les paramètres d'un groupe
const updateGroupSettings = (groupId, newSettings) => {
  if (!menuData.groups[groupId]) {
    menuData.groups[groupId] = {
      name: "Nouveau Groupe",
      admins: [],
      settings: menuData.groupSettings.default
    };
  }
  menuData.groups[groupId].settings = { ...menuData.groups[groupId].settings, ...newSettings };
  fs.writeFileSync(menuFile, JSON.stringify(menuData, null, 2)); // Sauvegarde avec formatage
};

// Exemple de mise à jour
updateGroupSettings(groupId, { allowLinks: true, silenceMode: false });
console.log(`Mise à jour des paramètres pour le groupe ${groupId}.`);
