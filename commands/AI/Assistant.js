const axios = require('axios'); // Assurez-vous d'avoir installé axios avec npm install axios
const moment = require('moment'); // Utilisation de Moment.js pour gérer les dates et heures
const fs = require('fs'); // Pour la gestion de fichiers (si nécessaire)
const dotenv = require('dotenv'); // Pour charger des variables d'environnement

dotenv.config(); // Charger les variables d'environnement à partir du fichier .env

class Assistant {
  constructor() {
    // Vous pouvez définir ici certaines propriétés ou variables d'initialisation
    this.name = 'Assistant Virtuel';
    this.version = '1.0.0';
    this.commands = {
      greet: this.greet.bind(this),
      time: this.getTime.bind(this),
      weather: this.getWeather.bind(this),
      help: this.showHelp.bind(this),
    };
  }

  // Méthode de salutation
  greet() {
    const greeting = `Bonjour! Je suis ${this.name}, comment puis-je vous aider aujourd'hui ?`;
    return greeting;
  }

  // Méthode pour obtenir l'heure actuelle
  getTime() {
    const currentTime = moment().format('HH:mm:ss');
    return `L'heure actuelle est : ${currentTime}`;
  }

  // Méthode pour obtenir la météo (exemple avec une API fictive)
  async getWeather(location) {
    try {
      const apiKey = process.env.WEATHER_API_KEY; // Clé API à définir dans le fichier .env
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
      const weather = response.data;
      const weatherInfo = `La météo actuelle à ${location} : ${weather.current.temp_c}°C, ${weather.current.condition.text}`;
      return weatherInfo;
    } catch (error) {
      console.error('Erreur de récupération des données météo', error);
      return 'Désolé, je n\'ai pas pu obtenir la météo.';
    }
  }

  // Méthode pour afficher l'aide (liste des commandes)
  showHelp() {
    let helpMessage = `Voici les commandes disponibles :\n`;
    for (let cmd in this.commands) {
      helpMessage += `- ${cmd}: ${this.commands[cmd].toString().substring(0, 50)}...\n`;
    }
    return helpMessage;
  }

  // Méthode pour traiter la commande
  async handleCommand(command, args) {
    if (this.commands[command]) {
      const result = await this.commands[command](...args);
      return result;
    } else {
      return 'Commande inconnue, tapez "help" pour voir la liste des commandes.';
    }
  }
}

// Exporter l'assistant pour qu'il puisse être utilisé ailleurs
module.exports = Assistant;
