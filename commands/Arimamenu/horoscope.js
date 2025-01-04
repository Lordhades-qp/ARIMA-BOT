const axios = require('axios');
const { MessageType } = require('@adiwajshing/baileys');

// Liste des signes astrologiques
const zodiacSigns = {
  aries: 'Bélier',
  taurus: 'Taureau',
  gemini: 'Gémeaux',
  cancer: 'Cancer',
  leo: 'Lion',
  virgo: 'Vierge',
  libra: 'Balance',
  scorpio: 'Scorpion',
  sagittarius: 'Sagittaire',
  capricorn: 'Capricorne',
  aquarius: 'Verseau',
  pisces: 'Poissons'
};

// Fonction pour obtenir l'horoscope d'un signe
async function getHoroscope(sign) {
  try {
    // URL de l'API pour récupérer l'horoscope
    const response = await axios.get(`https://aztro.sameerkumar.website?sign=${sign}&day=today`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'horoscope : ", error);
    return null;
  }
}

// Fonction principale qui gère la commande
async function handleHoroscope(zk, msg, dest) {
  const command = msg.body.toLowerCase();
  const prefix = "!horoscope";

  if (command.startsWith(prefix)) {
    const args = command.split(" ");
    const sign = args[1]?.toLowerCase();

    if (!sign || !zodiacSigns[sign]) {
      return zk.sendMessage(dest, { text: '❌ Veuillez spécifier un signe du zodiaque valide. Exemple : !horoscope lion' }, { quoted: msg });
    }

    // Obtenez l'horoscope du signe
    const horoscopeData = await getHoroscope(sign);

    if (horoscopeData) {
      const horoscopeMessage = `
        🌟 *Horoscope du jour pour ${zodiacSigns[sign]}* 🌟

        **Votre horoscope :** 
        ${horoscopeData.description}

        **Conseils :**
        ${horoscopeData.lucky_number ? `Numéro porte-bonheur : ${horoscopeData.lucky_number}` : ''}
        ${horoscopeData.lucky_color ? `Couleur porte-bonheur : ${horoscopeData.lucky_color}` : ''}
      `;

      await zk.sendMessage(dest, { text: horoscopeMessage }, { quoted: msg });
    } else {
      await zk.sendMessage(dest, { text: '❌ Impossible de récupérer l\'horoscope. Veuillez réessayer plus tard.' }, { quoted: msg });
    }
  }
}

module.exports = {
  handleHoroscope,
};
