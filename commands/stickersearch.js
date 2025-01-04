const axios = require('axios');
const { arimaBot } = require(__dirname + "/../framework/arimaBot");

arimaBot({ nomCom: "stickersearch", categorie: "Recherche" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, args } = commandeOptions;

    if (!args || args.length === 0) {
        return repondre("⚠️ Utilisation : *stickersearch [mot-clé]*\nExemple : `stickersearch chat`.");
    }

    const query = args.join(" ");
    const giphyApiKey = "YOUR_GIPHY_API_KEY"; // Remplacez par votre clé API Giphy
    const giphyUrl = `https://api.giphy.com/v1/stickers/search?api_key=${giphyApiKey}&q=${encodeURIComponent(query)}&limit=1`;

    try {
        const response = await axios.get(giphyUrl);

        if (response.data && response.data.data.length > 0) {
            const stickerUrl = response.data.data[0].images.original.url;

            await zk.sendMessage(dest, {
                sticker: { url: stickerUrl },
            }, { quoted: ms });

            repondre("✅ Sticker trouvé et envoyé !");
        } else {
            repondre("❌ Aucun sticker trouvé pour le mot-clé donné.");
        }
    } catch (error) {
        console.error("Erreur lors de la recherche du sticker : ", error);
        repondre("❌ Une erreur est survenue lors de la recherche. Réessayez plus tard.");
    }
});
