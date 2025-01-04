const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
    nomCom: ['sound', 'play', 'audio'], // Noms des commandes
    categorie: 'Audio',
    reaction: '🎵',
    description: 'Joue un son prédéfini ou génère un son basé sur l\'intelligence artificielle.',
    execute: async (dest, sock, commandeOptions) => {
        const { args, repondre } = commandeOptions;

        // Répertoire des sons prédéfinis
        const soundDir = path.join(__dirname, '../sounds');
        const availableSounds = fs.readdirSync(soundDir).filter(file => file.endsWith('.mp3'));

        if (!args.length) {
            const soundList = availableSounds.map((sound, index) => `${index + 1}. ${sound.replace('.mp3', '')}`).join('\n');
            return await repondre(`🎧 Sons disponibles :\n\n${soundList}\n\nUtilisez \`!sound <nom>\` pour jouer un son.`);
        }

        const soundName = args.join(' ').toLowerCase();
        const matchedSound = availableSounds.find(sound => sound.toLowerCase().includes(soundName));

        if (matchedSound) {
            const soundPath = path.join(soundDir, matchedSound);
            return await sock.sendMessage(dest, { audio: { url: soundPath }, mimetype: 'audio/mp4' }, { quoted: commandeOptions.ms });
        }

        // Génération dynamique avec IA
        const dynamicSound = await generateAISound(args.join(' '));
        if (dynamicSound) {
            return await sock.sendMessage(dest, { audio: { url: dynamicSound }, mimetype: 'audio/mp4' }, { quoted: commandeOptions.ms });
        }

        return await repondre('❌ Aucun son trouvé ou généré pour cette requête.');
    }
};

// Fonction pour générer un son via une API d'intelligence artificielle
async function generateAISound(query) {
    try {
        const response = await axios.post('Bandlab/leventlab', { text: query }, { responseType: 'arraybuffer' });
        const filePath = path.join(__dirname, '../sounds/generated.mp3');

        // Sauvegarde du son généré
        fs.writeFileSync(filePath, response.data);
        return filePath;
    } catch (error) {
        console.error('Erreur lors de la génération du son :', error.message);
        return null;
    }
      }
