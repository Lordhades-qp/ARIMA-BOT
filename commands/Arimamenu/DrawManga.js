const { MessageType } = require('@adiwajshing/baileys');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

// Fonction pour dessiner une image simple (exemple : un cercle)
async function drawSimpleCircle() {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

  // Dessiner un cercle rouge
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(250, 250, 100, 0, Math.PI * 2);
  ctx.fill();

  // Sauvegarder l'image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./output.png', buffer);
  return './output.png';
}

// Fonction pour dessiner un message texte sur une image
async function drawTextOnImage(text) {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

  // Fond de l'image
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ajouter du texte
  ctx.fillStyle = 'black';
  ctx.font = '40px Arial';
  ctx.fillText(text, 50, 250);

  // Sauvegarder l'image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./output_text.png', buffer);
  return './output_text.png';
}

// Fonction pour envoyer un dessin simple dans une conversation
async function sendDesign(zk, dest, msg, designType, text = '') {
  let imagePath = '';

  if (designType === 'circle') {
    imagePath = await drawSimpleCircle();
  } else if (designType === 'text') {
    imagePath = await drawTextOnImage(text);
  }

  // Envoyer l'image
  try {
    await zk.sendMessage(dest, { image: fs.readFileSync(imagePath), caption: 'Voici votre design personnalisé !' }, { quoted: msg });
  } catch (error) {
    console.log("Erreur lors de l'envoi du dessin:", error);
    await zk.sendMessage(dest, 'Désolé, il y a eu un problème en envoyant votre design.', { quoted: msg });
  }
}

// Fonction pour gérer les commandes et envoyer un dessin
async function handleDesignCommand(zk, msg, dest) {
  const command = msg.body.toLowerCase().split(' ');

  if (command[0] === '!designdraw') {
    if (command.length === 1) {
      await zk.sendMessage(dest, 'Veuillez spécifier un type de dessin. Utilisez !designdraw circle ou !designdraw text [Votre texte].', { quoted: msg });
      return;
    }

    const designType = command[1];
    const text = command.slice(2).join(' ');

    if (designType === 'circle') {
      await sendDesign(zk, dest, msg, 'circle');
    } else if (designType === 'text') {
      if (!text) {
        await zk.sendMessage(dest, 'Veuillez fournir le texte pour le dessin !', { quoted: msg });
        return;
      }
      await sendDesign(zk, dest, msg, 'text', text);
    } else {
      await zk.sendMessage(dest, 'Type de dessin invalide. Utilisez !designdraw circle ou !designdraw text [Votre texte].', { quoted: msg });
    }
  }
}

// Exporter la fonction de gestion de commande
module.exports = {
  handleDesignCommand
};
