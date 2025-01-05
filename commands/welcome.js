const { arimaBot } = require(__dirname + '/../framework/arimaBot');
const moment = require('moment-timezone');

arimaBot({ nomCom: 'welcome', categorie: 'Groupe' }, async (dest, bot, options) => {
    let { groupeInfo, utilisateur, envoyer } = options;

    // Vérifie si le message vient d'un groupe
    if (!groupeInfo || !utilisateur) return;

    // Obtenir la date et l'heure actuelles
    const date = moment.tz("Africa/Abidjan").format("DD/MM/YYYY");
    const heure = moment.tz("Africa/Abidjan").format("HH:mm");

    // Définir un message de bienvenue personnalisé
    const bienvenueMessage = `
🌟 *Bienvenue dans le groupe, ${utilisateur.nom || "nouveau membre"} !* 🌟
👥 *Nom du Groupe* : ${groupeInfo.nom}
📅 *Date d'arrivée* : ${date}
⏰ *Heure* : ${heure}

⚡ **Règles du Groupe :**  
1️⃣ Respecte les autres membres.  
2️⃣ Pas de spam ou de contenu inapproprié.  
3️⃣ Participe et amuse-toi ! 🎉  

🎉 L'équipe Arima Bot est ravie de t'accueillir ! 🎉
`;

    try {
        // Envoi du message dans le groupe
        await envoyer(dest, {
            texte: bienvenueMessage,
            mentions: [utilisateur.id]
        });
    } catch (erreur) {
        console.error('Erreur lors de l\'envoi du message de bienvenue :', erreur);
    }
});

// Export des paramètres de la commande (pour intégration dans Arima Bot)
module.exports = {
    nomCom: ['welcome', 'bienvenue'],
    categorie: 'Groupe',
    description: 'Envoie un message de bienvenue aux nouveaux membres du groupe.',
};
