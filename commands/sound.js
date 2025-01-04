const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const { arimaBot } = require(__dirname + "/../framework/arimaBot");

arimaBot({ nomCom: "sound", categorie: "Général" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, args } = commandeOptions;

    if (!args || args.length === 0) {
        return repondre("⚠️ Utilisation : *sound [nom du son]*\nExemple : `sound applause`.");
    }

    const soundName = args.join(" ").toLowerCase();

    // Répertoire des fichiers audio locaux
    const soundDir = path.resolve(__dirname, "../sounds");
    const soundFile = path.join(soundDir, `${soundName}.mp3`);

    // Vérifie si le fichier existe dans le répertoire local
    if (fs.existsSync(soundFile)) {
        await zk.sendMessage(dest, { audio: { url: soundFile }, mimetype: 'audio/mp4' }, { quoted: ms });
        return repondre(`✅ Son trouvé : *${soundName}*`);
    }

    // Si non trouvé localement, essaye de rechercher en ligne (via une API ou autre méthode)
    const apiKey = "YOUR_API_KEY"; // Remplacez par votre clé API pour une plateforme audio (exemple : freesound.org)
    const apiUrl = `https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(soundName)}&token=${apiKey}&format=json`;

    try {
        const response = await axios.get(apiUrl);

        if (response.data.results && response.data.results.length > 0) {
            const audioUrl = response.data.results[0].previews['preview-hq-mp3'];

            await zk.sendMessage(dest, { audio: { url: audioUrl }, mimetype: 'audio/mp4' }, { quoted: ms });
            return repondre(`✅ Son trouvé en ligne : *${soundName}*`);
        } else {
            repondre("❌ Aucun son trouvé pour le mot-clé donné.");
        }
    } catch (error) {
        console.error("Erreur lors de la recherche du son : ", error);
        repondre("❌ Une erreur est survenue lors de la recherche. Réessayez plus tard.");
    }
});
