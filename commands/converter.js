const { arimaBot } = require(__dirname + '/../framework/arimaBot');
const axios = require('axios');

arimaBot({ nomCom: 'convert', categorie: 'Conversion' }, async (dest, bot, options) => {
    let { argumentsCommande, envoyer } = options;

    if (argumentsCommande.length === 0) {
        return envoyer(dest, { texte: "❌ Utilisation : !convert <type> <valeur> [unité] \nExemples :\n- !convert currency 100 USD to EUR\n- !convert length 5 km to m\n- !convert text audio Bonjour !" });
    }

    const [type, ...args] = argumentsCommande;

    try {
        switch (type.toLowerCase()) {
            case 'currency': {
                // Conversion de devises
                if (args.length < 4 || args[2].toLowerCase() !== 'to') {
                    return envoyer(dest, { texte: "❌ Format : !convert currency <montant> <de> to <vers>" });
                }

                const amount = parseFloat(args[0]);
                const from = args[1].toUpperCase();
                const to = args[3].toUpperCase();

                const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
                const rate = response.data.rates[to];
                if (!rate) return envoyer(dest, { texte: `❌ Devise non trouvée : ${to}` });

                const result = (amount * rate).toFixed(2);
                envoyer(dest, { texte: `💱 ${amount} ${from} = ${result} ${to}` });
                break;
            }

            case 'length': {
                // Conversion de longueurs
                if (args.length < 3 || args[1].toLowerCase() !== 'to') {
                    return envoyer(dest, { texte: "❌ Format : !convert length <valeur> <de> to <vers>" });
                }

                const length = parseFloat(args[0]);
                const fromUnit = args[1].toLowerCase();
                const toUnit = args[2].toLowerCase();

                const units = {
                    km: 1000,
                    m: 1,
                    cm: 0.01,
                    mm: 0.001,
                };

                if (!units[fromUnit] || !units[toUnit]) {
                    return envoyer(dest, { texte: "❌ Unité non supportée. Essayez : km, m, cm, mm" });
                }

                const result = (length * units[fromUnit] / units[toUnit]).toFixed(2);
                envoyer(dest, { texte: `📏 ${length} ${fromUnit} = ${result} ${toUnit}` });
                break;
            }

            case 'text': {
                // Conversion texte en audio
                if (args[0].toLowerCase() !== 'audio') {
                    return envoyer(dest, { texte: "❌ Format : !convert text audio <texte>" });
                }

                const text = args.slice(1).join(' ');
                if (!text) return envoyer(dest, { texte: "❌ Veuillez fournir un texte à convertir." });

                const response = await axios.post('https://api.voicerss.org/', null, {
                    params: {
                        key: 'VOTRE_API_KEY',
                        src: text,
                        hl: 'fr-fr',
                        c: 'mp3',
                    },
                });

                envoyer(dest, { audio: { url: response.config.url } });
                break;
            }

            default:
                envoyer(dest, { texte: "❌ Type de conversion non supporté. Essayez : currency, length, text." });
                break;
        }
    } catch (err) {
        console.error(err);
        envoyer(dest, { texte: "❌ Une erreur est survenue lors de la conversion." });
    }
});

// Export des paramètres de la commande
module.exports = {
    nomCom: ['convert', 'conversion'],
    categorie: 'Conversion',
    description: 'Convertit devises, mesures ou texte en audio.',
};
