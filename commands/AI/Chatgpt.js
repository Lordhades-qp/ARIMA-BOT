const { Configuration, OpenAIApi } = require("openai");  // Importation des classes nécessaires pour l'API OpenAI

// Classe ChatGPT pour gérer les conversations
class ChatGPT {
  constructor(apiKey) {
    // Initialisation avec la clé API OpenAI
    this.configuration = new Configuration({
      apiKey: apiKey,
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  // Fonction pour générer une réponse à partir d'un prompt
  async getResponse(prompt) {
    try {
      const response = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",  // Modèle de conversation GPT-3.5 ou GPT-4
        messages: [{ role: "user", content: prompt }],
      });
      return response.data.choices[0].message.content;  // Retourner la réponse générée
    } catch (error) {
      console.error("Erreur lors de la génération de la réponse : ", error);
      return "Désolé, une erreur est survenue lors de la génération de la réponse.";
    }
  }

  // Fonction pour commencer une session de chat avec un contexte (plusieurs messages)
  async startChat(messages) {
    try {
      const response = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",  // Modèle de conversation GPT-3.5 ou GPT-4
        messages: messages,  // Messages précédents pour garder le contexte
      });
      return response.data.choices[0].message.content;  // Retourner la réponse générée
    } catch (error) {
      console.error("Erreur lors de la conversation : ", error);
      return "Désolé, une erreur est survenue lors de la conversation.";
    }
  }
}

// Exposer la classe ChatGPT pour l'utiliser dans d'autres fichiers
module.exports = ChatGPT;
