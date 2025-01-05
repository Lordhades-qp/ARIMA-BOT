const { arimaBot } = require(__dirname + '/../framework/arimaBot');

arimaBot({ nomCom: 'tagall', categorie: 'Groupe' }, async (dest, bot, options) => {
    let { groupeInfo, utilisateur, envoyer } = options;

    // Vérifie si la commande est utilisée dans un groupe
    if (!groupeInfo) {
        return envoyer(dest, { texte: "❌ Cette commande peut uniquement être utilisée dans un groupe." });
    }

    // Vérifie si l'utilisateur est administrateur
    const estAdmin = groupeInfo.admins.includes(utilisateur.id);
    if (!estAdmin) {
        return envoyer(dest, { texte: "❌ Seuls les administrateurs peuvent utiliser cette commande." });
    }

    // Récupère la liste des membres
    const membres = groupeInfo.membres;

    if (membres.length === 0) {
        return envoyer(dest, { texte: "❌ Aucun membre trouvé dans ce groupe." });
    }

    // Construit le message avec les mentions
    const mentions = membres.map(membre => `@${membre.split('@')[0]}`).join(' ');
    const texte = `📢 *Mention de tous les membres du groupe :*\n\n${mentions}`;

    // Envoie le message
    try {
        await bot.envoyer(dest, { texte: texte, mentions: membres });
    } catch (erreur) {
        console.error("Erreur lors de l'envoi des mentions :", erreur);
        envoyer(dest, { texte: "❌ Une erreur est survenue lors de la mention des membres." });
    }
});

// Export des paramètres de la commande
module.exports = {
    nomCom: ['tagall', 'mentionall'],
    categorie: 'Groupe',
    description: 'Mentionne tous les membres d’un groupe dans un seul message.',
};
