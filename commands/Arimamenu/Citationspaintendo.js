const { randomInt } = require('crypto');

// Liste des citations de Pain Tendo
const citationsPainTendo = [
  "La douleur est la seule solution pour la paix.",
  "Celui qui n'a jamais connu la souffrance ne peut pas comprendre la vraie paix.",
  "La justice engendre plus de vengeance, et la vengeance engendre plus de justice. Ainsi est le cycle de la haine.",
  "Ce monde n'aura jamais de paix tant que la douleur ne l'enseigne pas.",
  "Pour comprendre quelqu'un, il faut connaître sa douleur.",
  "Je veux créer un monde où personne n'aura plus jamais à souffrir.",
  "Quand les hommes connaissent la douleur, ils apprennent à haïr. Quand ils apprennent à haïr, ils souffrent davantage.",
  "Ceux qui ne savent pas la souffrance ne peuvent comprendre la paix véritable.",
  "La guerre crée seulement d'autres guerres, elle ne change jamais rien.",
  "Je suis un dieu qui apporte la paix par la souffrance."
];

// Fonction pour obtenir une citation aléatoire
function getRandomPainTendoQuote() {
  const index = randomInt(citationsPainTendo.length);
  return citationsPainTendo[index];
}

// Commande de gestion des citations
async function handlePainTendoQuoteCommand(zk, msg, dest) {
  const command = msg.body.toLowerCase();

  // Vérifie si la commande est !pain
  if (command === "!pain") {
    const citation = getRandomPainTendoQuote();
    await zk.sendMessage(dest, { text: `*Pain Tendo dit :*\n\n"${citation}"` }, { quoted: msg });
  }
}

// Exporter la fonction
module.exports = {
  handlePainTendoQuoteCommand
};
