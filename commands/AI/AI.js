const axios = require('axios'); // Utilisation d'axios pour les requêtes HTTP
const { Configuration, OpenAIApi } = require("openai"); // API OpenAI (par exemple GPT-3 ou GPT-4)

// Classe pour gérer l'intelligence artificielle
class Ai {
  constructor() {
    // Initialisation avec les clés API ou la configuration nécessaire
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  // Fonction pour générer un texte à partir d'un prompt
  async generateText(prompt) {
    try {
      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",  // Utilisation d'un modèle GPT-3.5 ou GPT-4
        messages: [{ role: "user", content: prompt }],
      });
      return completion.data.choices[0].message.content; // Retourne la réponse générée
    } catch (error) {
      console.error("Erreur lors de la génération du texte:", error);
      return "Désolé, une erreur est survenue.";
    }
  }

  // Fonction pour générer une image via une API comme DALL·E
  async generateImage(prompt) {
    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        prompt: prompt,
        n: 1,
        size: '1024x1024',
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      });
      return response.data.data[0].url; // Retourne l'URL de l'image générée
    } catch (error) {
      console.error("Erreur lors de la génération de l'image:", error);
      return "Erreur de génération d'image.";
    }
  }

  // Fonction pour analyser du texte (exemple : analyse de sentiment)
  async analyzeSentiment(text) {
    try {
      // Exemple d'appel à une API pour analyser le sentiment (exemple : API sentiment)
      const response = await axios.post('https://api.someai.com/sentiment', { text: text });
      return response.data.sentiment; // Retourne le sentiment (positif, négatif, neutre)
    } catch (error) {
      console.error("Erreur lors de l'analyse de sentiment:", error);
      return "Erreur d'analyse.";
    }
  }

  // Fonction pour effectuer des actions diverses en IA (par exemple, résumé de texte)
  async summarizeText(text) {
    try {
      const response = await this.openai.createCompletion({
        model: "text-davinci-003", // Utilisation d'un modèle pour le résumé
        prompt: `Fais un résumé du texte suivant : ${text}`,
        max_tokens: 150,
      });
      return response.data.choices[0].text.trim(); // Retourne le résumé
    } catch (error) {
      console.error("Erreur lors du résumé du texte:", error);
      return "Erreur de résumé.";
    }
  }
}

// Exporter la classe Ai pour l'utiliser ailleurs
module.exports = Ai;
