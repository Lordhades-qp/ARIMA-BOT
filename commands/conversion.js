const axios = require('axios');
const fs = require('fs-extra');
const { arimaBot } = require(__dirname + "/../framework/arimaBot");

arimaBot({ nomCom: "conversion", categorie: "Conversion" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, args } = commandeOptions;

    if (!args || args.length === 0) {
        return repondre("⚠️ Utilisation : *conversion [type] [paramètres]*\nTypes disponibles : `devise`, `unit`, `temperature`.");
    }

    const [type, ...parameters] = args;

    try {
        switch (type.toLowerCase()) {
            case 'devise':
                if (parameters.length < 3) {
                    return repondre("❓ Utilisation : *conversion devise [montant] [devise_source] [devise_cible]*\nExemple : `conversion devise 100 USD EUR`.");
                }
                const [amount, fromCurrency, toCurrency] = parameters;
                const exchangeUrl = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
                const exchangeResponse = await axios.get(exchangeUrl);
                if (!exchangeResponse.data || !exchangeResponse.data.result) {
                    return repondre("❌ Impossible de convertir les devises. Veuillez vérifier vos paramètres.");
                }
                repondre(`💱 ${amount} ${fromCurrency.toUpperCase()} = ${exchangeResponse.data.result.toFixed(2)} ${toCurrency.toUpperCase()}`);
                break;

            case 'unit':
                if (parameters.length < 3) {
                    return repondre("❓ Utilisation : *conversion unit [valeur] [unité_source] [unité_cible]*\nExemple : `conversion unit 5 km m`.");
                }
                const [value, fromUnit, toUnit] = parameters;
                const units = require('convert-units');
                try {
                    const convertedValue = units(value).from(fromUnit).to(toUnit);
                    repondre(`📏 ${value} ${fromUnit} = ${convertedValue} ${toUnit}`);
                } catch (e) {
                    repondre("❌ Conversion d'unités non valide. Assurez-vous que les unités sont correctes.");
                }
                break;

            case 'temperature':
                if (parameters.length < 2) {
                    return repondre("❓ Utilisation : *conversion temperature [valeur] [type_conversion]*\nTypes : `CtoF`, `FtoC`, `CtoK`, `KtoC`.\nExemple : `conversion temperature 100 CtoF`.");
                }
                const [tempValue, conversionType] = parameters;
                let result;
                switch (conversionType) {
                    case 'CtoF':
                        result = (tempValue * 9) / 5 + 32;
                        repondre(`🌡️ ${tempValue}°C = ${result.toFixed(2)}°F`);
                        break;
                    case 'FtoC':
                        result = ((tempValue - 32) * 5) / 9;
                        repondre(`🌡️ ${tempValue}°F = ${result.toFixed(2)}°C`);
                        break;
                    case 'CtoK':
                        result = parseFloat(tempValue) + 273.15;
                        repondre(`🌡️ ${tempValue}°C = ${result.toFixed(2)} K`);
                        break;
                    case 'KtoC':
                        result = parseFloat(tempValue) - 273.15;
                        repondre(`🌡️ ${tempValue} K = ${result.toFixed(2)}°C`);
                        break;
                    default:
                        repondre("❌ Type de conversion de température non valide. Utilisez : `CtoF`, `FtoC`, `CtoK`, ou `KtoC`.");
                }
                break;

            default:
                repondre("⚠️ Type de conversion non valide. Utilisez : `devise`, `unit`, ou `temperature`.");
                break;
        }
    } catch (error) {
        console.error("Erreur avec la commande conversion : ", error);
        repondre("❌ Une erreur est survenue. Essayez à nouveau plus tard.");
    }
});
