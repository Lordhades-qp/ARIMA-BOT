const axios = require('axios'); // Assurez-vous d'avoir installé axios (npm install axios)

// Classe LlamaAI pour interagir avec le modèle LLaMA
class LlamaAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.llama.ai/v1/'; // Remplacez par l'URL réelle si elle est différente
  }

  // Fonction pour obtenir une réponse du modèle LLaMA en utilisant un prompt
  async getResponse(prompt) {
    try {
      const response = await axios.post(`${this.baseUrl}generate`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        data: {
          prompt: prompt,
          max_tokens: 150, // Nombre maximum de tokens dans la réponse
          temperature: 0.7, // Contrôle la créativité de la réponse
          top_p: 1.0, // Sampling nucleus (top-p sampling)
        }
      });

      // Retourner la réponse générée par le modèle
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Erreur lors de la génération de la réponse : ', error);
      return 'Désolé, une erreur est survenue lors de la génération de la réponse.';
    }
  }
}

// Exposer la classe LlamaAI pour l'utiliser dans d'autres fichiers
module.exports = LlamaAI;
