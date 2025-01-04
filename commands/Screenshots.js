const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

// Fonction pour capturer une capture d'écran
async function captureScreenshot(url, outputFilePath) {
    console.log("Lancement de Puppeteer...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        console.log(`Ouverture de l'URL : ${url}`);
        await page.goto(url, { waitUntil: 'load', timeout: 0 });

        console.log(`Capture de l'écran : ${outputFilePath}`);
        await page.screenshot({ path: outputFilePath, fullPage: true });

        console.log(`Capture d'écran sauvegardée : ${outputFilePath}`);
    } catch (error) {
        console.error("Erreur lors de la capture de l'écran :", error.message);
    } finally {
        await browser.close();
        console.log("Navigateur fermé.");
    }
}

// Création d'un répertoire pour les captures d'écran
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
}

// Exemple d'utilisation
const url = 'https://www.google.com'; // Remplacez par l'URL souhaitée
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputFilePath = path.join(screenshotsDir, `screenshot-${timestamp}.png`);

captureScreenshot(url, outputFilePath)
    .then(() => console.log("Processus terminé."))
    .catch((err) => console.error("Erreur :", err.message));
