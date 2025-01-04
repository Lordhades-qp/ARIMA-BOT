const fs = require('fs-extra');
const { arimaBot } = require(__dirname + "/../framework/arimaBot");

arimaBot({ nomCom: "bd", categorie: "Général" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, args } = commandeOptions;

    // Vérification des arguments
    if (!args || args.length === 0) {
        return repondre("⚠️ Utilisation : *bd [action] [clé] [valeur]*\nActions possibles : `get`, `set`, `delete`.");
    }

    const [action, key, ...value] = args;
    const dbFilePath = __dirname + '/../data/database.json'; // Chemin de la base de données (fichier JSON)

    // Assurez-vous que le fichier JSON existe
    if (!fs.existsSync(dbFilePath)) {
        fs.writeJsonSync(dbFilePath, {});
    }

    // Charger la base de données
    let database = fs.readJsonSync(dbFilePath);

    try {
        switch (action.toLowerCase()) {
            case 'get':
                if (!key) return repondre("❓ Spécifiez une clé à récupérer.");
                if (!database[key]) return repondre(`❌ Aucune donnée trouvée pour la clé *${key}*.`);
                repondre(`✅ Valeur pour *${key}* : ${database[key]}`);
                break;

            case 'set':
                if (!key || value.length === 0) return repondre("❓ Spécifiez une clé et une valeur à définir.");
                database[key] = value.join(' ');
                fs.writeJsonSync(dbFilePath, database);
                repondre(`✅ Donnée ajoutée/modifiée : *${key}* = ${value.join(' ')}`);
                break;

            case 'delete':
                if (!key) return repondre("❓ Spécifiez une clé à supprimer.");
                if (!database[key]) return repondre(`❌ Aucune donnée trouvée pour la clé *${key}*.`);
                delete database[key];
                fs.writeJsonSync(dbFilePath, database);
                repondre(`✅ Donnée supprimée pour la clé *${key}*.`);
                break;

            default:
                repondre("⚠️ Action invalide. Utilisez : `get`, `set` ou `delete`.");
                break;
        }
    } catch (error) {
        console.error("Erreur lors de l'accès à la base de données : ", error);
        repondre("❌ Une erreur est survenue lors de la manipulation des données.");
    }
});
