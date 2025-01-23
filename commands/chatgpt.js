// Importer axios pour les requêtes HTTP
const axios = require('axios');

// Fonction pour interagir avec l'API de ChatGPT
async function sendToChatGPT(prompt) {
    const apiKey = 'sk-4lPpYF1gBzdxhGiZj7dB2kFxdkQ2tqp3lSgd4VeH2Up7v2lV';  // Remplace par ta clé API OpenAI

    try {
        // Envoie la requête à l'API OpenAI pour générer une réponse
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo', // ou 'gpt-4', selon ton modèle
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150, // Tu peux ajuster ce paramètre selon la longueur de la réponse souhaitée
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            }
        });

        // Retourne la réponse générée par ChatGPT
        console.log('Réponse de ChatGPT:', response.data.choices[0].message.content);
        return response.data.choices[0].message.content;

    } catch (error) {
        console.error('Erreur dans la requête API:', error);
        return 'Désolé, je n\'ai pas pu répondre à votre demande.';
    }
}

// Exemple d'appel à la fonction avec un prompt
const prompt = "Quelle est la capitale de la France ?";
sendToChatGPT(prompt).then(response => {
    console.log("Réponse finale:", response);
});
