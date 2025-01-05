const { arimaBot } = require(__dirname + '/../framework/arimaBot');

arimaBot({ nomCom: 'kickall', categorie: 'Groupe' }, async (dest, bot, options) => {
    let { groupeInfo, envoyer, utilisateur } = options;

    // Vérifie si la commande est exécutée dans un groupe
    if (!groupeInfo) {
        return envoyer(dest, { texte: "❌ Cette commande ne peut être utilisée que dans un groupe." });
    }

    // Vérifie si l'utilisateur est administrateur
    const estAdmin = groupeInfo.admins.includes(utilisateur.id);
    if (!estAdmin) {
        return envoyer(dest, { texte: "❌ Vous devez être administrateur pour utiliser cette commande." });
    }

    // Récupère la liste des membres du groupe
    const membres = groupeInfo.membres.filter(m => !m.admin && m.id !== bot.id);
    if (membres.length === 0) {
        return envoyer(dest, { texte: "📢 Aucun membre à expulser dans ce groupe." });
    }

    try {
        // Expulse chaque membre
        for (let membre of membres) {
            await bot.groupeExpulser(dest, membre.id);
        }

        envoyer(dest, { texte: `✅ Tous les membres ont été expulsés avec succès (sauf les admins).` });
    } catch (erreur) {
        console.error("Erreur lors de l'expulsion des membres :", erreur);
        envoyer(dest, { texte: "❌ Une erreur est survenue lors de l'expulsion des membres." });
    }
});

// Export des paramètres de la commande (pour intégration dans Arima Bot)
module.exports = {
    nomCom: ['kickall'],
    categorie: 'Groupe',
    description: 'Expulse tous les membres d\'un groupe (sauf les administrateurs).',
};
