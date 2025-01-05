const { arimaBot } = require(__dirname + '/../framework/arimaBot');

arimaBot({ nomCom: 'action', categorie: 'Fun' }, async (dest, bot, options) => {
    let { argumentsCommande, envoyer } = options;

    // Vérification si un argument est fourni
    if (argumentsCommande.length === 0) {
        return envoyer(dest, { texte: "❌ Veuillez spécifier une action à effectuer. Exemple : !action hug" });
    }

    const action = argumentsCommande[0].toLowerCase();

    // Liste des actions disponibles
    const actions = {
        "hug": "🤗 Envoie un câlin chaleureux à quelqu'un !",
        "kiss": "💋 Un baiser pour toi !",
        "slap": "👋 *Donne une claque* 👋",
        "dance": "💃🎵 *Danse sur de la musique !* 🕺",
        "wave": "👋 Salut !",
        "cry": "😭 *Laisse tomber une larme...*",
        "laugh": "😂 *Rit de toute force*",
        "punch": "🥊 *Coup de poing !*",
        "love": "❤️ *Partage de l'amour*"
    };

    // Si l'action existe dans la liste
    if (actions[action]) {
        return envoyer(dest, { texte: `${actions[action]}` });
    } else {
        return envoyer(dest, { texte: `❌ Action "${action}" non reconnue. Voici les actions possibles : hug, kiss, slap, dance, wave, cry, laugh, punch, love.` });
    }
});

// Export des paramètres de la commande
module.exports = {
    nomCom: ['action'],
    categorie: 'Fun',
    description: "Effectue des actions amusantes comme donner des câlins, des claques, des baisers, etc.",
};
