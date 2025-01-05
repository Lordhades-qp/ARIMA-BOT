const { arimaBot } = require(__dirname + '/../framework/arimaBot');

arimaBot({ nomCom: 'emoji', categorie: 'Fun' }, async (dest, bot, options) => {
    let { argumentsCommande, envoyer } = options;

    // Vérification si un argument (nom de l'emoji) est fourni
    if (argumentsCommande.length === 0) {
        return envoyer(dest, { texte: "❌ Veuillez fournir un nom d'emoji. Exemple : !emoji love" });
    }

    const emojiRecherche = argumentsCommande[0].toLowerCase();

    // Liste d'emojis prédéfinis
    const emojis = {
        "love": "❤️",
        "laugh": "😂",
        "fire": "🔥",
        "star": "⭐",
        "heart": "💖",
        "thumbsup": "👍",
        "clap": "👏",
        "cry": "😢",
        "party": "🎉",
        "sunglasses": "😎",
    };

    // Vérification si l'emoji est dans la liste
    if (emojis[emojiRecherche]) {
        return envoyer(dest, { texte: `L'emoji pour "${emojiRecherche}" est : ${emojis[emojiRecherche]}` });
    } else {
        return envoyer(dest, { texte: `❌ L'emoji "${emojiRecherche}" n'est pas dans la liste. Essayez un autre emoji.` });
    }
});

// Export des paramètres de la commande
module.exports = {
    nomCom: ['emoji'],
    categorie: 'Fun',
    description: "Affiche un emoji spécifique basé sur le nom donné.",
};
