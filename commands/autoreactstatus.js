const { arimaBot } = require(__dirname + '/../framework/arimaBot');

arimaBot({ nomCom: 'autoreactstatus', categorie: 'Fun' }, async (dest, bot, options) => {
    let { envoyer } = options;

    // Fonction qui réagit à tous les statuts avec l'emoji 💚
    bot.on('status-update', async (status) => {
        if (status) {
            try {
                // Ajouter une réaction à chaque statut avec 💚
                await bot.sendReaction(status.from, '💚');
                console.log('Réaction envoyée au statut avec 💚');
            } catch (error) {
                console.error('Erreur lors de la réaction au statut:', error);
            }
        }
    });

    // Fonction qui réagit aux messages d'annonce dans les groupes avec l'emoji 💥
    bot.on('message', async (message) => {
        // Vérifier si le message est une annonce dans un groupe
        if (message.isAnnouncement && message.type === 'group') {
            try {
                // Ajouter une réaction à l'annonce avec 💥
                await bot.sendReaction(message.chatId, '💥');
                console.log('Réaction envoyée à l\'annonce avec 💥');
            } catch (error) {
                console.error('Erreur lors de la réaction à l\'annonce:', error);
            }
        }
    });

    // Message pour indiquer que l'auto-réaction est activée
    return envoyer(dest, { texte: "✅ Le bot réagira maintenant automatiquement aux statuts avec l'emoji 💚 et aux annonces avec 💥." });
});

// Exporter la commande pour l'intégration dans le bot
module.exports = {
    nomCom: ['autoreactstatus'],
    categorie: 'Fun',
    description: "Réagit automatiquement aux statuts avec l'emoji 💚 et aux annonces de groupe avec 💥."
};
