const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

// Fonction principale pour créer une image avec un canevas
async function createCustomCanvas(outputPath) {
  try {
    // Créer un canvas vide avec une taille définie
    const canvas = createCanvas(800, 600); // Taille 800x600px
    const ctx = canvas.getContext('2d');

    // Définir un fond de couleur
    ctx.fillStyle = '#2E3B4E'; // Bleu-gris
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ajouter une image sur le canevas
    const image = await loadImage('path_to_your_image.jpg'); // Remplacer par votre propre chemin d'image
    ctx.drawImage(image, 100, 100, 600, 400); // Dessiner l'image à la position (100, 100)

    // Ajouter un texte
    ctx.font = '48px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Bienvenue sur Canvas!', 150, 500); // Position du texte

    // Ajouter un effet de cercle semi-transparent
    ctx.beginPath();
    ctx.arc(400, 300, 100, 0, Math.PI * 2, false); // Cercle centré sur (400, 300) avec rayon 100
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Rouge semi-transparent
    ctx.fill();

    // Sauvegarder l'image résultante dans un fichier
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log('Image générée et sauvegardée sous :', outputPath);
  } catch (error) {
    console.error('Erreur lors de la génération de l\'image :', error);
  }
}

// Exemple d'utilisation
const outputImagePath = './output_custom_image.png'; // Chemin de sortie de l'image générée
createCustomCanvas(outputImagePath);

module.exports = {
  createCustomCanvas
};
