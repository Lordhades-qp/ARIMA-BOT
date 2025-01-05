const { arimaBot } = require(__dirname + '/../framework/arimaBot');

arimaBot({ nomCom: 'kick', categorie: 'Groupe' }, async (dest, bot, options) => {
    let { texte, groupeInfo, envoyer, utilisateur, mentions } = options;

    // Vérifie si la commande est utilisée dans un groupe
    if (!groupeInfo) {
        return envoyer(dest, { texte: "❌ Cette commande ne peut être utilisée que dans un groupe." });
    }

    // Vérifie si l'utilisateur est administrateur
    const estAdmin = groupeInfo.admins.includes(utilisateur.id);
    if (!estAdmin) {
        return envoyer(dest, { texte: "❌ Vous devez être administrateur pour utiliser cette commande." });
    }

    // Vérifie si des membres sont mentionnés pour expulsion
    if (!mentions || mentions.length === 0) {
        return envoyer(dest, { texte: "❌ Mentionnez les membres à expulser en taguant leurs noms." });
    }

    // Expulse chaque membre mentionné
    try {
        let expulseCount = 0;
        for (let membre of mentions) {
            if (!groupeInfo.admins.includes(membre) && membre !== bot.id) {
                await bot.groupeExpulser(dest, membre);
                expulseCount++;
            }
        }

        if (expulseCount === 0) {
            return envoyer(dest, { texte: "❌ Impossible d'expulser les administrateurs ou le bot." });
        }

        envoyer(dest, { texte: `✅ ${expulseCount} membre(s) expulsé(s) avec succès.` });
    } catch (erreur) {
        console.error("Erreur lors de l'expulsion :", erreur);
        envoyer(dest, { texte: "❌ Une erreur est survenue lors de l'expulsion des membres." });
    }
});

// Export des paramètres de la commande (pour intégration dans Arima Bot)
module.exports = {
    nomCom: ['kick'],
    categorie: 'Groupe',
    description: 'Expulse un ou plusieurs membres mentionnés du groupe.',
};
