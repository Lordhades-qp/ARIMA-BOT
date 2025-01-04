const axios = require('axios'); // Utilisation d'axios pour les requêtes HTTP
const { Configuration, OpenAIApi } = require("openai"); // API OpenAI (par exemple GPT-3)

class MetaAI {
  constructor() {
    // Initialisation avec les clés API ou la configuration nécessaire
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  // Fonction d'interaction avec l'API OpenAI (par exemple, pour générer du texte)
  async generateText(prompt) {
    try {
      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",  // Modèle GPT-3.5 ou GPT-4
        messages: [{ role: "user", content: prompt }],
      });
      return completion.data.choices[0].message.content; // Retourne la réponse générée
    } catch (error) {
      console.error("Erreur lors de la génération du texte:", error);
      return "Désolé, une erreur est survenue.";
    }
  }

  // Fonction de recherche d'images via une API d'IA (exemple : DALL·E)
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

  // Fonction pour analyser du texte avec un modèle IA (exemple : analyse de sentiment)
  async analyzeSentiment(text) {
    // Exemple d'utilisation d'une API d'analyse de sentiment (à remplacer par une API réelle)
    try {
      const response = await axios.post('https://api.someai.com/sentiment', { text: text });
      return response.data.sentiment; // Retourne le sentiment (positif, négatif, neutre)
    } catch (error) {
      console.error("Erreur lors de l'analyse de sentiment:", error);
      return "Erreur d'analyse.";
    }
  }
}

// Exporter la classe MetaAI pour l'utiliser dans d'autres parties de l'application
module.exports = MetaAI;
