const NodeCache = require("node-cache");

// Initialisation du cache avec une durée de vie par défaut de 5 minutes (300 secondes)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });

// Ajouter une donnée dans le cache
function setCache(key, value, ttl = 300) {
  cache.set(key, value, ttl);
}

// Récupérer une donnée du cache
function getCache(key) {
  return cache.get(key);
}

// Supprimer une donnée du cache
function deleteCache(key) {
  cache.del(key);
}

// Vérifier si une clé existe dans le cache
function hasCache(key) {
  return cache.has(key);
}

// Vider complètement le cache
function clearCache() {
  cache.flushAll();
}

module.exports = {
  setCache,
  getCache,
  deleteCache,
  hasCache,
  clearCache,
};
