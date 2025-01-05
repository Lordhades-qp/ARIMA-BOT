const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

// Remplacez par votre propre Client ID obtenu depuis Imgur
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE'; 

// Fonction pour télécharger une image depuis un fichier local
async function uploadImageFromFile(filePath) {
  try {
    const form = new FormData();
    form.append('image', fs.createReadStream(filePath));

    // Envoi de la requête POST à l'API Imgur pour télécharger l'image
    const response = await axios.post('https://api.imgur.com/3/image', form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Client-ID ${CLIENT_ID}`
      }
    });

    if (response.data.success) {
      console.log('Image téléchargée avec succès !');
      console.log('URL de l\'image :', response.data.data.link);
      return response.data.data.link;
    } else {
      console.log('Erreur lors du téléchargement de l\'image :', response.data.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de la requête Imgur :', error);
  }
}

// Fonction pour télécharger une image via URL
async function uploadImageFromUrl(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    const form = new FormData();
    form.append('image', response.data, 'image.jpg'); // Utilisation du nom de fichier

    const uploadResponse = await axios.post('https://api.imgur.com/3/image', form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Client-ID ${CLIENT_ID}`
      }
    });

    if (uploadResponse.data.success) {
      console.log('Image téléchargée avec succès !');
      console.log('URL de l\'image :', uploadResponse.data.data.link);
      return uploadResponse.data.data.link;
    } else {
      console.log('Erreur lors du téléchargement de l\'image :', uploadResponse.data.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de la requête Imgur :', error);
  }
}

// Exemple d'utilisation : télécharger une image à partir d'un fichier local
// uploadImageFromFile('path_to_your_image.jpg');

// Exemple d'utilisation : télécharger une image à partir d'une URL
// uploadImageFromUrl('https://example.com/your-image.jpg');

module.exports = {
  uploadImageFromFile,
  uploadImageFromUrl
};
