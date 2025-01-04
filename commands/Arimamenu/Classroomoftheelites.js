const { randomInt } = require("crypto");

// Liste des citations classées par personnage
const citations = {
  Ayanokoji: [
    "Je n'ai jamais été particulièrement intéressé par le fait de gagner ou de perdre.",
    "La vraie force, c'est de ne pas avoir besoin de se prouver quoi que ce soit.",
    "Les gens sont égaux, dis-tu ? Ce serait bien si c'était vrai.",
  ],
  Horikita: [
    "Si tu ne fais pas d'effort, tu n'as pas le droit de te plaindre de tes résultats.",
    "Être seul n'est pas une faiblesse. C'est parfois la meilleure stratégie.",
    "La victoire appartient à ceux qui travaillent le plus dur.",
  ],
  Rokusuke: [
    "Un chef doit toujours être prêt à porter le poids des décisions.",
    "Le charisme sans capacité est inutile.",
    "Le pouvoir se mérite, il ne s'offre pas gratuitement.",
  ],
  Kushida: [
    "L'apparence peut être trompeuse, mais elle est aussi une arme redoutable.",
    "Je ferai tout ce qu'il faut pour atteindre mes objectifs, peu importe les moyens.",
    "La manipulation est un art subtil que peu maîtrisent.",
  ],
  Ryuen: [
    "La peur est l'outil le plus efficace pour contrôler les autres.",
    "Les faibles n'ont qu'à plier. C'est la loi de la jungle.",
    "Les règles existent pour être brisées si cela me profite.",
  ],
};

// Fonction pour obtenir une citation aléatoire
function getRandomQuote(character) {
  if (character && citations[character]) {
    const quotes = citations[character];
    return quotes[randomInt(quotes.length)];
  }
  const allQuotes = Object.values(citations).flat();
  return allQuotes[randomInt(allQuotes.length)];
}

// Commande pour le bot
async function handleCOTEQuoteCommand(zk, msg, dest) {
  const command = msg.body.toLowerCase();
  const prefix = "!cotequote";

  if (command.startsWith(prefix)) {
    const args = command.slice(prefix.length).trim().split(" ");
    const character = args[0]?.charAt(0).toUpperCase() + args[0]?.slice(1);

    let response;
    if (character && citations[character]) {
      response = `*${character} dit :*\n\n"${getRandomQuote(character)}"`;
    } else {
      response = `Citation aléatoire :\n\n"${getRandomQuote()}"`;
    }

    await zk.sendMessage(dest, { text: response }, { quoted: msg });
  }
}

// Export du module
module.exports = {
  handleCOTEQuoteCommand,
};
