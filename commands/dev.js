const util = require('util');
const vm = require('vm');
const { exec } = require('child_process');

module.exports = {
    nomCom: ['dev', 'eval', 'execute'], // Noms des commandes
    categorie: 'Admin',
    reaction: '👨‍💻',
    description: 'Commande réservée aux développeurs pour exécuter du code JavaScript.',
    execute: async (dest, sock, commandeOptions) => {
        const { ms, args, repondre } = commandeOptions;

        // Vérifiez si l'utilisateur est autorisé
        const ownerNumber = '2250565647864@s.whatsapp.net'; // Remplacez par votre numéro WhatsApp
        if (ms.key.participant !== ownerNumber) {
            return await repondre('🚫 Vous n\'avez pas la permission d\'utiliser cette commande.');
        }

        if (!args.length) {
            return await repondre('❗ Veuillez fournir du code à exécuter.');
        }

        const code = args.join(' ');
        try {
            // Évaluer le code dans un contexte sécurisé
            const result = vm.runInNewContext(code, {}, { timeout: 1000 });
            const formattedResult = typeof result === 'object' ? util.inspect(result) : result;

            await repondre(`✅ Résultat :\n\`\`\`\n${formattedResult}\n\`\`\``);
        } catch (err) {
            await repondre(`❌ Erreur :\n\`\`\`\n${err.message}\n\`\`\``);
        }
    },

    executeShell: async (dest, sock, commandeOptions) => {
        const { args, repondre } = commandeOptions;

        const shellCommand = args.join(' ');
        exec(shellCommand, (error, stdout, stderr) => {
            if (error) {
                return repondre(`❌ Erreur d'exécution :\n\`\`\`\n${error.message}\n\`\`\``);
            }
            if (stderr) {
                return repondre(`⚠️ Stderr :\n\`\`\`\n${stderr}\n\`\`\``);
            }
            repondre(`✅ Résultat :\n\`\`\`\n${stdout}\n\`\`\``);
        });
    }
};
