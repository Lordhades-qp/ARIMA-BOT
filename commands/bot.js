const { default: makeWASocket, useSingleFileAuthState, proto, DisconnectReason } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const axios = require('axios'); // Pour les APIs
const fs = require('fs');

// Gestion de l'authentification
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

// Base de données simulée
const userData = {}; // { "<numéro>": { name: "Nom", reminders: [] } }

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on('creds.update', saveState);

  // Fonction pour envoyer un message programmé
  async function scheduledMessage(sender, text, delay) {
    setTimeout(async () => {
      await sock.sendMessage(sender, { text });
    }, delay);
  }

  // Écoute les nouveaux messages
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type === 'notify') {
      const msg = messages[0];
      if (!msg.message) return;
      if (msg.key.fromMe) return;

      const sender = msg.key.remoteJid;
      const messageContent = msg.message.conversation || '';

      console.log(`Message de ${sender}: ${messageContent}`);

      // Enregistrement automatique des utilisateurs
      if (!userData[sender]) {
        userData[sender] = { name: `Utilisateur ${sender.split('@')[0]}`, reminders: [] };
      }

      // 1. Réponses dynamiques (API)
      if (messageContent.toLowerCase() === 'météo') {
        try {
          const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true');
          const weather = response.data.current_weather;
          await sock.sendMessage(sender, {
            text: `La météo actuelle :\n🌡 Température : ${weather.temperature}°C\n💨 Vent : ${weather.windspeed} km/h`,
          });
        } catch (error) {
          console.error('Erreur API météo :', error);
          await sock.sendMessage(sender, { text: 'Désolé, je ne peux pas récupérer la météo pour le moment.' });
        }
      }

      if (messageContent.toLowerCase() === 'blague') {
        try {
          const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
          const joke = response.data;
          await sock.sendMessage(sender, { text: `😂 Blague : ${joke.setup}\n${joke.punchline}` });
        } catch (error) {
          console.error('Erreur API blague :', error);
          await sock.sendMessage(sender, { text: 'Impossible de récupérer une blague.' });
        }
      }

      if (messageContent.toLowerCase() === 'citation') {
        try {
          const response = await axios.get('https://api.quotable.io/random');
          const quote = response.data;
          await sock.sendMessage(sender, { text: `📖 Citation : "${quote.content}" - ${quote.author}` });
        } catch (error) {
          console.error('Erreur API citation :', error);
          await sock.sendMessage(sender, { text: 'Impossible de récupérer une citation.' });
        }
      }

      // 2. Gestion des rappels
      if (messageContent.startsWith('rappel')) {
        const parts = messageContent.split(' ');
        const delay = parseInt(parts[1]) * 1000; // Délai en secondes
        const reminderMessage = parts.slice(2).join(' ');

        if (!isNaN(delay) && reminderMessage) {
          userData[sender].reminders.push(reminderMessage);
          await sock.sendMessage(sender, { text: `📅 Rappel programmé dans ${parts[1]} secondes : "${reminderMessage}"` });
          scheduledMessage(sender, `⏰ Rappel : ${reminderMessage}`, delay);
        } else {
          await sock.sendMessage(sender, { text: 'Format incorrect. Utilise : "rappel <délai (sec)> <message>"' });
        }
      }

      // 3. Gestion des groupes
      if (msg.key.remoteJid.endsWith('@g.us')) {
        const groupMetadata = await sock.groupMetadata(msg.key.remoteJid);
        console.log(`Message dans le groupe : ${groupMetadata.subject}`);
        if (messageContent.toLowerCase() === 'info groupe') {
          const info = `👥 *Nom du groupe* : ${groupMetadata.subject}\n📅 *Créé le* : ${new Date(
            groupMetadata.creation * 1000
          ).toLocaleDateString()}\n👤 *Créateur* : ${groupMetadata.owner ? groupMetadata.owner.split('@')[0] : 'Inconnu'}\n👥 *Membres* : ${
            groupMetadata.participants.length
          }`;
          await sock.sendMessage(sender, { text: info });
        }
      }

      if (messageContent.startsWith('!ajouter')) {
        const numberToAdd = messageContent.split(' ')[1]; // Ex : "!ajouter 1234567890"
        if (numberToAdd) {
          try {
            await sock.groupParticipantsUpdate(sender, [`${numberToAdd}@s.whatsapp.net`], 'add');
            await sock.sendMessage(sender, { text: `Membre ajouté : ${numberToAdd}` });
          } catch (error) {
            console.error('Erreur lors de l’ajout du membre :', error);
            await sock.sendMessage(sender, { text: 'Impossible d’ajouter ce membre. Assure-toi d’être admin.' });
          }
        }
      }

      // 4. Réponses automatiques selon mots-clés
      const greetings = ['bonjour', 'salut', 'hello'];
      if (greetings.includes(messageContent.toLowerCase())) {
        await sock.sendMessage(sender, { text: `Salut ${userData[sender].name} ! 😊 Comment puis-je t'aider aujourd'hui ?` });
      }

      if (messageContent.toLowerCase() === 'aide') {
        await sock.sendMessage(sender, {
          text: `Voici les commandes disponibles :\n
          - *météo* : Obtiens la météo actuelle 🌤️
          - *blague* : Reçois une blague aléatoire 😂
          - *citation* : Reçois une citation inspirante 📖
          - *rappel <temps (sec)> <message>* : Programme un rappel ⏰
          - *info groupe* : Infos sur le groupe 👥
          - *!ajouter <numéro>* : Ajouter un membre au groupe (admin seulement)`,
        });
      }
    }
  });

  // Gestion des connexions
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('Connexion fermée. Reconnexion :', shouldReconnect);
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log('Connecté à WhatsApp');
    }
  });
}

startBot();
