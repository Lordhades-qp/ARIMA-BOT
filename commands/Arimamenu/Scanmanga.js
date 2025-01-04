const axios = require("axios");

// Liste de mangas locale pour un usage hors ligne
const mangasLocaux = {
  "one piece": {
    auteur: "Eiichiro Oda",
    genre: "Aventure, Action",
    dernierChapitre: 1094,
    lien: "https://chapitre1000-1094.com/one-piece",
  },
  "naruto": {
    auteur: "Masashi Kishimoto",
    genre: "Action, Shonen",
    dernierChapitre: 700,
    lien: "https://1-700.com/naruto",
  },
  "attack on titan": {
    auteur: "Hajime Isayama",
    genre: "Action, Drame",
    dernierChapitre: 139,
    lien: "https://1-139.com/aot",
  },
};

// Fonction pour rechercher un manga en ligne (exemple avec une API fictive)
async function chercherMangaEnLigne(titre) {
  try {
    const response = await axios.get(`https://api.mangadb.com/search?q=${titre}`);
    if (response.data && response.data.results.length > 0) {
      return response.data.results[0]; // Retourne le premier résultat
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la recherche en ligne :", error.message);
    return null;
  }
}

// Fonction principale pour gérer les recherches de manga
async function handleScanManga(zk, msg, dest) {
  const command = msg.body.toLowerCase();
  const prefix = "!scanmanga";

  if (command.startsWith(prefix)) {
    const titreRecherche = command.slice(prefix.length).trim();
    if (!titreRecherche) {
      return await zk.sendMessage(dest, { text: "❌ Veuillez spécifier un titre de manga." }, { quoted: msg });
    }

    let manga;
    // Recherche dans la liste locale
    if (mangasLocaux[titreRecherche.toLowerCase()]) {
      manga = mangasLocaux[titreRecherche.toLowerCase()];
    } else {
      // Recherche en ligne si non trouvé localement
      manga = await chercherMangaEnLigne(titreRecherche);
    }

    if (manga) {
      const texte = `*Titre :* ${titreRecherche}\n*Auteur :* ${manga.auteur}\n*Genre :* ${manga.genre}\n*Dernier Chapitre :* ${manga.dernierChapitre}\n*Lien :* ${manga.lien}`;
      await zk.sendMessage(dest, { text: texte }, { quoted: msg });
    } else {
      await zk.sendMessage(dest, { text: "❌ Aucun manga trouvé pour ce titre." }, { quoted: msg });
    }
  }
}

// Export du module
module.exports = {
  handleScanManga,
};
