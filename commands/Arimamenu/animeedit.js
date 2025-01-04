const { loadImage, createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Fonction pour appliquer un filtre à une image
async function applyFilter(imagePath, effect) {
  try {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Dessiner l'image de base
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Appliquer les effets selon le type
    switch (effect.toLowerCase()) {
      case 'grayscale':
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
          const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
          imageData.data[i] = avg;
          imageData.data[i + 1] = avg;
          imageData.data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
        break;

      case 'invert':
        const imageDataInvert = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageDataInvert.data.length; i += 4) {
          imageDataInvert.data[i] = 255 - imageDataInvert.data[i];
          imageDataInvert.data[i + 1] = 255 - imageDataInvert.data[i + 1];
          imageDataInvert.data[i + 2] = 255 - imageDataInvert.data[i + 2];
        }
        ctx.putImageData(imageDataInvert, 0, 0);
        break;

      case 'sepia':
        const imageDataSepia = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageDataSepia.data.length; i += 4) {
          const r = imageDataSepia.data[i];
          const g = imageDataSepia.data[i + 1];
          const b = imageDataSepia.data[i + 2];

          imageDataSepia.data[i] = r * 0.393 + g * 0.769 + b * 0.189;
          imageDataSepia.data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
          imageDataSepia.data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
        }
        ctx.putImageData(imageDataSepia, 0, 0);
        break;

      default:
        throw new Error('Effet non supporté : ' + effect);
    }

    return canvas.toBuffer();
  } catch (error) {
    console.error('Erreur lors de l\'application du filtre :', error);
    throw error;
  }
}

// Fonction principale
async function editAnimeImage(filePath, effect, output) {
  if (!fs.existsSync(filePath)) {
    console.log('Fichier introuvable :', filePath);
    return;
  }

  try {
    const result = await applyFilter(filePath, effect);
    fs.writeFileSync(output, result);
    console.log('Image modifiée et sauvegardée à :', output);
  } catch (error) {
    console.error('Erreur lors de la modification de l\'image :', error);
  }
}

// Exemple d'utilisation
const animeImagePath = path.join(__dirname, 'anime.jpg'); // Remplacez par le chemin de votre image d'anime
const effectToApply = 'sepia'; // Options : grayscale, invert, sepia
const outputImagePath = path.join(__dirname, 'anime_edited.jpg');

editAnimeImage(animeImagePath, effectToApply, outputImagePath);

module.exports = {
  editAnimeImage,
};
