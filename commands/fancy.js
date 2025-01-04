const { arimaBot } = require(__dirname + "/../framework/arimaBot");
const chalk = require('chalk');
const { styletext } = require(__dirname + "/../framework/mesfonctions"); // Fonction pour styliser le texte

arimaBot({ nomCom: "fancy", categorie: "Général" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, args } = commandeOptions;

    if (!args || args.length === 0) {
        return repondre("⚠️ Utilisation : *fancy [texte]*\nExemple : `fancy Bonjour !`.");
    }

    const text = args.join(" ");

    // Effet de texte : Exemple d'ajout de couleurs et de mise en forme avec 'chalk'
    const fancyText = chalk.bold.hex('#FF6347')(text); // Texte en rouge tomate et en gras

    // Utilisation de la fonction styletext pour appliquer d'autres effets (selon votre fonction)
    const styledText = styletext(text, { color: 'magenta', background: 'yellow', style: 'underline' });

    let message = `
🎨 *Texte Stylisé* : ${fancyText}
🖌️ *Texte avec style personnalisé* : ${styledText}
`;

    try {
        await zk.sendMessage(dest, { text: message }, { quoted: ms });
        repondre(`✅ Message fancy envoyé : *${text}*`);
    } catch (e) {
        console.error("Erreur lors de l'envoi du message fancy : ", e);
        repondre("❌ Une erreur est survenue lors de l'envoi du message fancy.");
    }
});
