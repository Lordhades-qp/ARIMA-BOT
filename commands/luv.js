const { arimaBot } = require(__dirname + '/../framework/arimaBot');

arimaBot({ nomCom: 'luv', categorie: 'Fun' }, async (dest, bot, options) => {
    let { argumentsCommande, envoyer } = options;

    if (argumentsCommande.length < 2) {
        return envoyer(dest, { texte: "❌ Utilisation : !luv <Nom1> <Nom2>\nExemple : !luv Naruto Hinata" });
    }

    const [nom1, ...reste] = argumentsCommande;
    const nom2 = reste.join(' ');

    if (!nom2) {
        return envoyer(dest, { texte: "❌ Veuillez fournir deux noms. Exemple : !luv Sasuke Sakura" });
    }

    // Calcul aléatoire du taux d'amour
    const tauxAmour = Math.floor(Math.random() * 101);

    // Génération de réponse selon le taux
    let commentaire;
    if (tauxAmour < 20) {
        commentaire = "😢 Très faible connexion... Peut-être que l'amitié est meilleure.";
    } else if (tauxAmour < 50) {
        commentaire = "😐 Une connexion moyenne, mais avec de l'effort, tout est possible !";
    } else if (tauxAmour < 80) {
        commentaire = "😍 Belle connexion ! Vous êtes faits l'un pour l'autre.";
    } else {
        commentaire = "❤️ Parfait ! C'est l'amour véritable, ne laissez jamais tomber.";
    }

    // Réponse du bot
    envoyer(dest, {
        texte: `💘 **Test d'Amour** 💘\n🔹 **${nom1}** et **${nom2}** ont un taux d'amour de **${tauxAmour}%**.\n${commentaire}`,
    });
});

// Export des paramètres de la commande
module.exports = {
    nomCom: ['luv', 'love'],
    categorie: 'Fun',
    description: "Mesure le taux d'amour entre deux personnes.",
};
