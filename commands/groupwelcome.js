const { arimaBot } = require(__dirname + '/../framework/arimaBot');
const moment = require('moment');

arimaBot({ nomCom: 'welcome', categorie: 'Admin' }, async (dest, bot, options) => {
    let { envoyer } = options;

    // Liste des groupes enregistrés
    const groupesEnregistres = ['groupe1', 'groupe2', 'groupe3'];  // Ajoute ici les groupes enregistrés par leur ID ou nom

    // Fonction qui envoie le message de bienvenue
    const envoyerBienvenue = async (chatId, participant) => {
        const motif = `
╔═══════ 🎉 *Bienvenue* 🎉 ═══════╗
║                                  ║
║  Salut et bienvenue dans notre    ║
║  groupe ! 🎉 Nous sommes ravis    ║
║  de t'accueillir, *${participant}*! 🎈  ║
║                                  ║
║  *Voici quelques informations*   ║
║  👉 Règles du groupe             ║
║  👉 Ne pas spammer               ║
║  👉 Respecter tous les membres   ║
║                                  ║
╚══════════════════════════════════╝
`;

        const design = `
╔══════════════ 🌟 DESIGN 🌟 ═══════════════╗
║                                            ║
║  🎨 *Design de bienvenue personnalisé*     ║
║                                            ║
║  ───────────────────────────────────────── ║
║  💡 *N'oublie pas de respecter les règles!*  ║
║  💬 Si tu as des questions, demande aux admins.  ║
║                                            ║
╚═══════════════════════════════════════════╝
`;

        const imageUrl = "https://example.com/your-image.jpg";  // Ajoute ici une URL d'image personnalisée

        try {
            // Envoi d'un message de bienvenue avec image et texte formaté
            await bot.sendMessage(chatId, {
                image: { url: imageUrl },
                caption: motif + '\n' + design,
                footer: `🎉 Bienvenue le ${moment().format('DD/MM/YYYY')} à ${moment().format('HH:mm:ss')}`,
            });
            console.log('Message de bienvenue envoyé dans le groupe');
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message de bienvenue :', error);
        }
    };

    // Fonction qui envoie le message d'au revoir
    const envoyerAuRevoir = async (chatId, participant) => {
        const motif = `
╔═══════ 👋 *Au revoir* 👋 ═══════╗
║                                  ║
║  Désolé de te voir partir, *${participant}* 😞  ║
║                                  ║
║  Nous espérons te revoir bientôt !  ║
║  Si tu as des remarques ou des    ║
║  suggestions, n'hésite pas à nous  ║
║  contacter. "+2250565647864@"                      ║
╚══════════════════════════════════╝
`;

        const design = `
╔══════════════ 🌟 DESIGN 🌟 ═══════════════╗
║                                            ║
║  🎨 *Design d'au revoir personnalisé*      ║
║                                            ║
║  ───────────────────────────────────────── ║
║  💔 *Bonne continuation à toi!*           ║
║  💬 Si tu veux revenir, tu seras toujours bienvenu.  ║
║                                            ║
╚═══════════════════════════════════════════╝
`;

        const imageUrl = "https://example.com/your-image.jpg";  // Ajoute ici une URL d'image personnalisée

        try {
            // Envoi d'un message d'au revoir avec image et texte formaté
            await bot.sendMessage(chatId, {
                image: { url: imageUrl },
                caption: motif + '\n' + design,
                footer: `👋 Au revoir le ${moment().format('DD/MM/YYYY')} à ${moment().format('HH:mm:ss')}`,
            });
            console.log('Message d\'au revoir envoyé dans le groupe');
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message d\'au revoir :', error);
        }
    };

    // Événement déclenché quand un nouveau membre rejoint le groupe
    bot.on('group-participants-update', async (update) => {
        const { participants, action, chatId } = update;

        // Vérifier si le groupe est enregistré
        if (!groupesEnregistres.includes(chatId)) {
            // Si le groupe n'est pas enregistré, envoyer le message de bienvenue
            if (action === 'add') {
                for (let participant of participants) {
                    await envoyerBienvenue(chatId, participant);
                }
            } 
            // Si un membre quitte ou est banni, envoyer un message d'au revoir
            else if (action === 'remove') {
                for (let participant of participants) {
                    await envoyerAuRevoir(chatId, participant);
                }
            }
        }
    });

    // Message de confirmation lors de l'activation du module
    return envoyer(dest, { texte: "✅ Le bot enverra automatiquement des messages de bienvenue et d'au revoir dans les groupes non enregistrés." });
});

// Exporter la commande pour l'intégration dans le bot
module.exports = {
    nomCom: ['welcome'],
    categorie: 'Admin',
    description: "Envoie un message de bienvenue et d'au revoir personnalisé dans les groupes non enregistrés."
};
