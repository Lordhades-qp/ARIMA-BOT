const axios = require('axios'); // Assurez-vous d'avoir installé axios avec npm install axios
const moment = require('moment'); // Pour gérer l'heure et la date
const dotenv = require('dotenv'); // Pour charger les variables d'environnement
dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

class AssistantGoogle {
  constructor() {
    this.name = 'Assistant Google';
    this.version = '1.0.0';
    this.commands = {
      greet: this.greet.bind(this),
      time: this.getTime.bind(this),
      weather: this.getWeather.bind(this),
      search: this.googleSearch.bind(this),
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

  // Méthode pour obtenir la météo (exemple avec une API de météo)
  async getWeather(location) {
    try {
      const apiKey = process.env.WEATHER_API_KEY; // Clé API de météo à définir dans .env
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
      const weather = response.data;
      const weatherInfo = `La météo actuelle à ${location} : ${weather.current.temp_c}°C, ${weather.current.condition.text}`;
      return weatherInfo;
    } catch (error) {
      console.error('Erreur de récupération des données météo', error);
      return 'Désolé, je n\'ai pas pu obtenir la météo.';
    }
  }

  // Méthode pour effectuer une recherche Google
  async googleSearch(query) {
    try {
      const apiKey = process.env.GOOGLE_API_KEY; // Clé API Google Custom Search à définir dans .env
      const cx = process.env.GOOGLE_CX; // Identifiant de votre moteur de recherche personnalisé Google (Custom Search Engine)
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`);
      const searchResults = response.data.items.map(item => `${item.title}: ${item.link}`).join('\n');
      return `Voici les résultats de la recherche pour "${query}":\n\n${searchResults}`;
    } catch (error) {
      console.error('Erreur de recherche Google', error);
      return 'Désolé, je n\'ai pas pu effectuer la recherche.';
    }
  }

  // Méthode pour afficher l'aide
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
module.exports = AssistantGoogle;
