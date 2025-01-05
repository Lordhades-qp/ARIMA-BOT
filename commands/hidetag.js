const { arimaBot } = require(__dirname + '/../framework/arimaBot');

arimaBot({ nomCom: 'hidetag', categorie: 'Groupe' }, async (dest, bot, options) => {
    let { groupeInfo, utilisateur, argumentsCommande, envoyer } = options;

    // Vérifie si la commande est utilisée dans un groupe
    if (!groupeInfo) {
        return envoyer(dest, { texte: "❌ Cette commande peut uniquement être utilisée dans un groupe." });
    }

    // Vérifie si l'utilisateur est administrateur
    const estAdmin = groupeInfo.admins.includes(utilisateur.id);
    if (!estAdmin) {
        return envoyer(dest, { texte: "❌ Seuls les administrateurs peuvent utiliser cette commande." });
    }

    // Message à envoyer (par défaut "Salut !")
    const message = argumentsCommande.length > 0 
        ? argumentsCommande.join(' ') 
        : "👋 Hello tout le monde !";

    // Liste des membres à mentionner
    const membres = groupeInfo.membres; ur

    // Envoie le message avec les mentions cachées
    try {
        await bot.envoyer(dest, {
            texte: message,
            mentions: membres,
        });
    } catch (erreur) {
        console.error("Erreur lors de l'envoi du hidetag :", erreur);
        envoyer(dest, { texte: "❌ Une erreur est survenue lors de l'exécution du hidetag." });
    }
});

// Export des paramètres de la commande
module.exports = {
    nomCom: ['hidetag', 'mentionhide'],
    categorie: 'Groupe',
    description: 'Mentionne tous les membres d\'un groupe de manière invisible.',
};
