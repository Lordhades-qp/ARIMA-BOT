const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const axios = require('axios');

// Fonction pour envoyer un sticker à partir d'un fichier
async function sendStickerFromFile(zk, dest, filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    await zk.sendMessage(dest, { sticker: fileBuffer }, { quoted: false });
    console.log('Sticker envoyé avec succès!');
  } catch (error) {
    console.error('Erreur lors de l\'envoi du sticker:', error);
  }
}

// Fonction pour télécharger une image à partir d'une URL et la convertir en sticker
async function sendStickerFromUrl(zk, dest, imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    await zk.sendMessage(dest, { sticker: buffer }, { quoted: false });
    console.log('Sticker envoyé à partir de l\'URL avec succès!');
  } catch (error) {
    console.error('Erreur lors du téléchargement du sticker:', error);
  }
}

// Fonction pour créer un sticker à partir d'une image locale
async function createStickerFromImage(zk, dest, imagePath) {
  const stickerPath = path.join(__dirname, 'temp', 'sticker.webp');
  try {
    // Utilisation de 'ffmpeg' pour convertir l'image en sticker
    exec(`ffmpeg -i ${imagePath} -vcodec libwebp -vf "scale=512:512" -an -preset slow -q:v 60 -y ${stickerPath}`, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur de conversion: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`Erreur dans le processus ffmpeg: ${stderr}`);
        return;
      }
      // Envoi du sticker après conversion
      const stickerBuffer = fs.readFileSync(stickerPath);
      await zk.sendMessage(dest, { sticker: stickerBuffer }, { quoted: false });
      console.log('Sticker créé et envoyé avec succès!');
      fs.unlinkSync(stickerPath); // Supprimer le fichier temporaire après envoi
    });
  } catch (error) {
    console.error('Erreur lors de la création du sticker:', error);
  }
}

// Fonction pour créer un sticker à partir d'une image envoyée par l'utilisateur
async function handleStickerMessage(zk, msg, dest) {
  const media = await zk.downloadAndSaveMediaMessage(msg);
  if (media) {
    await createStickerFromImage(zk, dest, media);
  } else {
    console.log('Aucun média trouvé dans le message.');
  }
}

// Commande de sticker avec un message
async function stickerCommand(zk, msg, dest) {
  if (msg.hasQuotedMsg) {
    const quotedMsg = await msg.getQuotedMessage();
    if (quotedMsg.message.imageMessage) {
      const imageUrl = quotedMsg.message.imageMessage.url;
      await sendStickerFromUrl(zk, dest, imageUrl);
    }
  } else if (msg.message.imageMessage) {
    const imageUrl = msg.message.imageMessage.url;
    await sendStickerFromUrl(zk, dest, imageUrl);
  } else {
    console.log('Aucun sticker ou image à envoyer.');
  }
}

// Exports
module.exports = {
  sendStickerFromFile,
  sendStickerFromUrl,
  createStickerFromImage,
  handleStickerMessage,
  stickerCommand
};
