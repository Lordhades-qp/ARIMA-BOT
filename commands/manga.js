const axios = require('axios');
const fs = require('fs-extra');
const { arimaBot } = require(__dirname + "/../framework/arimaBot");

arimaBot({ nomCom: "manga", categorie: "Weeb" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, args } = commandeOptions;

    // Vérifier si un argument est fourni
    if (!args || args.length === 0) {
        return repondre("⚠️ Utilisation : *manga [action] [paramètres]*\nActions possibles : `search`, `random`, `add`, `list`.");
    }

    const [action, ...parameters] = args;
    const dbFilePath = __dirname + '/../data/mangas.json'; // Chemin de la base de données pour les mangas personnalisés

    // Assurez-vous que le fichier JSON existe
    if (!fs.existsSync(dbFilePath)) {
        fs.writeJsonSync(dbFilePath, []);
    }

    // Charger la base de données locale
    let mangaDatabase = fs.readJsonSync(dbFilePath);

    try {
        switch (action.toLowerCase()) {
            case 'search':
                if (parameters.length === 0) return repondre("❓ Spécifiez un titre de manga à rechercher.");
                const query = parameters.join(' ');
                const url = `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&limit=1`;

                // Recherche via API Jikan (MyAnimeList)
                const response = await axios.get(url);
                const manga = response.data.data[0];

                if (!manga) return repondre(`❌ Aucun résultat trouvé pour *${query}*.`);
                repondre(`📖 *${manga.title}*\n📝 Synopsis : ${manga.synopsis}\n🔗 Lien : ${manga.url}`);
                break;

            case 'random':
                // Récupérer un manga aléatoire depuis la base de données locale ou via API
                if (mangaDatabase.length === 0) return repondre("❌ Aucune donnée locale sur les mangas. Utilisez `add` pour en ajouter.");
                const randomManga = mangaDatabase[Math.floor(Math.random() * mangaDatabase.length)];
                repondre(`🎲 Recommandation Manga :\n📖 *${randomManga.title}*\n📝 ${randomManga.description}`);
                break;

            case 'add':
                if (parameters.length < 2) return repondre("❓ Utilisation : *manga add [titre] [description]*.");
                const [title, ...desc] = parameters;
                const description = desc.join(' ');

                mangaDatabase.push({ title, description });
                fs.writeJsonSync(dbFilePath, mangaDatabase);
                repondre(`✅ Manga ajouté : *${title}*\n📝 Description : ${description}`);
                break;

            case 'list':
                if (mangaDatabase.length === 0) return repondre("❌ Aucune donnée locale sur les mangas. Utilisez `add` pour en ajouter.");
                let mangaList = "📚 Liste des mangas ajoutés :\n";
                mangaDatabase.forEach((m, i) => {
                    mangaList += `${i + 1}. 📖 *${m.title}*\n📝 ${m.description}\n`;
                });
                repondre(mangaList);
                break;

            default:
                repondre("⚠️ Action invalide. Utilisez : `search`, `random`, `add`, ou `list`.");
                break;
        }
    } catch (error) {
        console.error("Erreur avec la commande manga : ", error);
        repondre("❌ Une erreur est survenue. Essayez à nouveau plus tard.");
    }
});
