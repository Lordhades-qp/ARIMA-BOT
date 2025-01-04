const fs = require('fs');
const path = require('path');
const googleTTS = require('google-tts-api'); // API pour convertir texte -> audio

module.exports = {
    nomCom: ['tts', 'texttospeech'],
    categorie: 'Conversion',
    description: 'Convertit un texte en audio (MP3) avec Google Text-to-Speech.',
    usage: 'tts <langue> <texte>',
    async execute(dest, zok, options) {
        const { args, repondre } = options;

        // Vérifiez si l'utilisateur a fourni un texte et une langue
        if (args.length < 2) {
            return repondre('❌ Utilisation incorrecte ! Exemple : tts en Bonjour le monde !');
        }

        const lang = args[0]; // Code de langue (en, fr, es, etc.)
        const text = args.slice(1).join(' '); // Texte à convertir

        try {
            // Générer l'audio en Base64
            const audioBase64 = await googleTTS.getAudioBase64(text, {
                lang: lang,
                slow: false, // Vitesse normale
                host: 'https://translate.google.com',
            });

            // Convertir Base64 en fichier audio
            const audioBuffer = Buffer.from(audioBase64, 'base64');
            const fileName = `tts_${Date.now()}.mp3`;
            const filePath = path.join(__dirname, fileName);
            fs.writeFileSync(filePath, audioBuffer);

            // Envoyer le fichier audio dans la conversation
            await zok.sendMessage(dest, { audio: { url: filePath }, mimetype: 'audio/mpeg' });
            fs.unlinkSync(filePath); // Supprimer le fichier local après l'envoi
        } catch (error) {
            console.error('Erreur lors de la génération TTS :', error);
            repondre('❌ Erreur lors de la conversion du texte en audio.');
        }
    },
};
