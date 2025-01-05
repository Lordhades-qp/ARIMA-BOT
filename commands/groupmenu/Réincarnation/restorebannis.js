const fs = require('fs');
const twilio = require('twilio');

// Remplace ces variables par tes informations Twilio
const accountSid = 'TON_ACCOUNT_SID';
const authToken = 'TON_AUTH_TOKEN';
const client = new twilio(accountSid, authToken);

// Charger les bannis depuis une base de données ou fichier
const databasePath = './database.json';

function getBannis() {
  const data = fs.readFileSync(databasePath, 'utf8');
  const parsedData = JSON.parse(data);
  return parsedData.bannis;
}

// Vérifier si un bannissement a duré plus de 24h
function isBanniRestaurable(banniDate) {
  const now = new Date();
  const bannedTime = new Date(banniDate);
  const timeDifference = now - bannedTime;
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
  return timeDifference >= twentyFourHoursInMs;
}

// Restaurer les membres bannis
function restaurerBannis() {
  const bannis = getBannis();
  const bannisRestaurables = bannis.filter(banni => isBanniRestaurable(banni.date_banni));

  if (bannisRestaurables.length === 0) {
    console.log("Aucun membre à restaurer.");
    return;
  }

  bannisRestaurables.forEach((banni) => {
    console.log(`Restaurer le membre: ${banni.nom} (${banni.numero})`);

    // Logique pour ajouter l'utilisateur au groupe (exemple avec Twilio API)
    // Ici, il faut remplacer cette ligne par une vraie fonction d'ajout via ton API
    client.messages
      .create({
        body: `Bonjour ${banni.nom}, tu as été restauré dans le groupe !`,
        from: 'whatsapp:+14155238886', // Ton numéro WhatsApp Twilio
        to: `whatsapp:${banni.numero}`
      })
      .then(message => console.log(`Message envoyé à ${banni.nom}`))
      .catch(err => console.error("Erreur lors de l'envoi du message:", err));
  });
}

// Exécuter la restauration
restaurerBannis();
