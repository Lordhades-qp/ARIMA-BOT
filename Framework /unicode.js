// Fonction pour convertir un texte en code Unicode
function toUnicode(text) {
    return text
        .split('')
        .map(char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0'))
        .join('');
}

// Fonction pour convertir un code Unicode en texte
function fromUnicode(unicodeString) {
    return unicodeString.replace(/\\u([\d\w]{4})/gi, (match, grp) => {
        return String.fromCharCode(parseInt(grp, 16));
    });
}

// Fonction pour transformer du texte en caractères spéciaux (par exemple, style fantaisie)
function fancyText(text) {
    const fancyMap = {
        'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘',
        'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟',
        'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦',
        'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
        'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾',
        'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ',
        'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌',
        'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ'
    };

    return text
        .split('')
        .map(char => fancyMap[char] || char)
        .join('');
}

// Fonction pour récupérer les points de code Unicode d'une chaîne
function getCodePoints(text) {
    return Array.from(text).map(char => char.codePointAt(0));
}

// Exemple d'utilisation
const text = "Hello World!";
console.log("Texte original :", text);
console.log("En Unicode :", toUnicode(text));
console.log("De Unicode :", fromUnicode(toUnicode(text)));
console.log("Texte fantaisie :", fancyText(text));
console.log("Points de code :", getCodePoints(text));

// Exportation des fonctions pour utilisation dans d'autres fichiers
module.exports = {
    toUnicode,
    fromUnicode,
    fancyText,
    getCodePoints
};
