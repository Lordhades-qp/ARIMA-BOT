const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Fonction pour améliorer la qualité d'une image
async function enhanceImage(inputPath, outputPath) {
    try {
        console.log(`Amélioration de l'image : ${inputPath}`);
        
        // Traitement de l'image avec Sharp
        await sharp(inputPath)
            .resize(1920, 1080, { fit: 'cover' }) // Conversion en Full HD (1080p)
            .toFormat('jpeg', { quality: 90 }) // Compression avec haute qualité
            .toFile(outputPath);
        
        console.log(`Image sauvegardée en haute définition : ${outputPath}`);
    } catch (error) {
        console.error("Erreur lors de l'amélioration de l'image :", error.message);
    }
}

// Répertoire des images
const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');

// Créer les répertoires s'ils n'existent pas
if (!fs.existsSync(inputDir)) fs.mkdirSync(inputDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Parcourir les fichiers dans le dossier 'input'
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error("Erreur lors de la lecture du répertoire :", err.message);
        return;
    }

    files.forEach((file) => {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, `HD-${file}`);
        
        // Améliorer chaque image
        enhanceImage(inputPath, outputPath);
    });
});
