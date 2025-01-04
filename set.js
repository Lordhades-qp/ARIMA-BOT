require('dotenv').config(); // Charge les variables d'environnement depuis .env

// Fonction pour vérifier qu'une variable d'environnement est définie
function getEnvVariable(key, defaultValue = null) {
  const value = process.env[key];
  if (value === undefined || value === null) {
    if (defaultValue !== null) {
      return defaultValue;
    }
    console.warn(`Attention : La variable "${key}" n'est pas définie dans .env`);
    return null;
  }
  return value;
}

// Configuration exportée pour être utilisée dans le projet
const config = {
  bot: {
    prefix: getEnvVariable('PREFIXE', '#'),
    name: getEnvVariable('NOM_BOT', 'Arima-Bot'),
    ownerName: getEnvVariable('NOM_OWNER', 'Arima'),
    ownerNumber: getEnvVariable('NUMERO_OWNER', '2250565647864'q),
    sessionId: getEnvVariable('SESSION_ID'),
  },
  modes: {
    publicMode: getEnvVariable('MODE_PUBLIC', 'non') === 'oui',
    pmPermit: getEnvVariable('PM_PERMIT', 'non') === 'oui',
    antiCommandSpam: getEnvVariable('ANTI_COMMAND_SPAM', 'non') === 'oui',
    startingMessage: getEnvVariable('STARTING_BOT_MESSAGE', 'oui') === 'oui',
  },
  status: {
    readStatus: getEnvVariable('LECTURE_AUTO_STATUS', 'non') === 'oui',
    downloadStatus: getEnvVariable('TELECHARGER_AUTO_STATUS', 'non') === 'oui',
    antiViewOnce: getEnvVariable('ANTI_VUE_UNIQUE', 'non') === 'oui',
  },
  heroku: {
    apiKey: getEnvVariable('HEROKU_API_KEY'),
    appName: getEnvVariable('HEROKU_APP_NAME'),
  },
  limits: {
    warnCount: parseInt(getEnvVariable('WARN_COUNT', '3'), 10),
    botState: getEnvVariable('ETAT', '1'),
  },
};

module.exports = config;
