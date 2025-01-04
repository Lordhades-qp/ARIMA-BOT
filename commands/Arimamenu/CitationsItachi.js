const { randomInt } = require('crypto');

// Liste des citations emblématiques d'Itachi Uchiha
const citationsItachi = [
  "Les gens vivent liés par ce qu'ils acceptent comme étant correct et vrai. C'est ainsi qu'ils définissent la réalité.",
  "Le changement est impossible sans sacrifice, c'est une loi de la vie.",
  "Quand tu connais la douleur, tu peux comprendre les autres et leur apporter la paix.",
  "La vie de chacun est déterminée par ses propres choix.",
  "Le pouvoir n'est rien sans sagesse.",
  "Ce n'est pas parce que tu as été accepté par les autres que tu es accepté par toi-même.",
  "Ceux qui ne peuvent pas se poser de questions sur eux-mêmes sont voués à l'échec.",
  "Les vrais leaders ne recherchent pas la reconnaissance, ils se sacrifient pour les autres.",
  "L'illusion peut être plus puissante que la réalité.",
  "Même si tu t'en veux pour ce que tu as fait, ce que tu fais maintenant est ce qui importe.",
];

// Fonction pour obtenir une citation aléatoire
function getRandomItachiQuote() {
  const index = randomInt(citationsItachi.length);
  return citationsItachi[index];
}

// Commande de gestion des citations
async function handleItachiQuoteCommand(zk, msg, dest) {
  const command = msg.body.toLowerCase();

  // Vérifie si la commande est !itachi
  if (command === "!itachi") {
    const citation = getRandomItachiQuote();
    await zk.sendMessage(dest, { text: `*Itachi Uchiha dit :*\n\n"${citation}"` }, { quoted: msg });
  }
}

// Exporter la fonction
module.exports = {
  handleItachiQuoteCommand
};
