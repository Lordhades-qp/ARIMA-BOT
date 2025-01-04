const axios = require('axios');
const { arimaBot } = require(__dirname + "/../framework/arimaBot");

arimaBot({ nomCom: "hentai", categorie: "Hentai" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre } = commandeOptions;
    
    // Vérification de contenu NSFW
    if (!s.ALLOW_NSFW) {
        return repondre("🔞 Les contenus NSFW sont désactivés sur ce bot.");
    }

    try {
        // Exemple d'API pour obtenir une image NSFW aléatoire
        const response = await axios.get('https://api.nekos.dev/api/v3/images/nsfw/img/hentai_lewd', {
            headers: {
                'Accept': 'application/json'
            }
        });

        // Vérification de la réponse
        if (response.data && response.data.data && response.data.data.response.url) {
            const imageUrl = response.data.data.response.url;

            // Envoi de l'image
            await zk.sendMessage(dest, { 
                image: { url: imageUrl }, 
                caption: "Voici votre image Hentai 🍑", 
                footer: "By Éternel Arima" 
            }, { quoted: ms });
        } else {
            repondre("❌ Impossible de récupérer une image pour le moment.");
        }

    } catch (error) {
        console.error("Erreur lors de la récupération de l'image : ", error);
        repondre("❌ Une erreur s'est produite. Réessayez plus tard.");
    }
});
