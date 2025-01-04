const { randomInt } = require('crypto');

// Liste des citations emblématiques de Madara Uchiha
const citationsMadara = [
  "Là où il y a de la lumière, il y a aussi des ténèbres.",
  "Le monde n'a pas besoin d'espoir. Seules les illusions permettent de vivre.",
  "La paix naît de la guerre, et la haine naît de l'amour.",
  "Celui qui ne connaît pas la douleur ne peut comprendre la paix.",
  "Les faiblesses sont pour les faibles. Les forts transcendent tout.",
  "Dans ce monde, partout où il y a de l'homme, il y a de la guerre.",
  "Les ténèbres sont le seul refuge des âmes torturées.",
  "La réalité est un rêve, et les rêves peuvent devenir réalité.",
  "La vraie puissance est celle qui ne peut être atteinte par personne d'autre.",
  "Ce monde est plein de mensonges, d'illusions et de souffrance.",
];

// Fonction pour obtenir une citation aléatoire
function getRandomMadaraQuote() {
  const index = randomInt(citationsMadara.length);
  return citationsMadara[index];
}

// Commande de gestion des citations
async function handleMadaraQuoteCommand(zk, msg, dest) {
  const command = msg.body.toLowerCase();

  // Vérifie si la commande est !madara
  if (command === "!madara") {
    const citation = getRandomMadaraQuote();
    await zk.sendMessage(dest, { text: `*Madara Uchiha dit :*\n\n"${citation}"` }, { quoted: msg });
  }
}

// Exporter la fonction
module.exports = {
  handleMadaraQuoteCommand
};
