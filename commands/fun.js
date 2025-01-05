const { arimaBot } = require(__dirname + '/../framework/arimaBot');

// Liste des actions avec leurs liens d'images correspondants et les emojis
const actionsImages = {
    "hug": {
        emoji: "🤗",
        links: [
            "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
            "https://media.giphy.com/media/l0MYyWs6w9vh6z2lC/giphy.gif",
            "https://media.giphy.com/media/1f6f4JuAobLC5C3qYX/giphy.gif"
        ]
    },
    "kiss": {
        emoji: "😘",
        links: [
            "https://media.giphy.com/media/mh6nMj1s9DbG1oI4bc/giphy.gif",
            "https://media.giphy.com/media/2wxFk7au9lGrjRLuPz/giphy.gif",
            "https://media.giphy.com/media/15zY5Ocv9y8sU/giphy.gif"
        ]
    },
    "slap": {
        emoji: "👋",
        links: [
            "https://media.giphy.com/media/l4FGJpBzo8LHD2z9u/giphy.gif",
            "https://media.giphy.com/media/xT9IgzoKnwF3PfhgXG/giphy.gif",
            "https://media.giphy.com/media/3o7WThoxZyBqlxy7oQ/giphy.gif"
        ]
    },
    "dance": {
        emoji: "💃🕺",
        links: [
            "https://media.giphy.com/media/XReQmkx6xLx6U/giphy.gif",
            "https://media.giphy.com/media/3o6Zt6ACf3CTj6fUeA/giphy.gif",
            "https://media.giphy.com/media/l2JJamZ0a5CwK8xjC/giphy.gif"
        ]
    },
    "wave": {
        emoji: "🌊💧",
        links: [
            "https://media.giphy.com/media/1f6f4JuAobLC5C3qYX/giphy.gif",
            "https://media.giphy.com/media/l3q2TAUGQnvxWw45y/giphy.gif",
            "https://media.giphy.com/media/27yYF3jFzY1AI/giphy.gif"
        ]
    },
    "cry": {
        emoji: "😭",
        links: [
            "https://media.giphy.com/media/9J7onFkpMf9JYY5SkN/giphy.gif",
            "https://media.giphy.com/media/l3q2Vjx7lHl6ggWPO/giphy.gif",
            "https://media.giphy.com/media/hpBzFPHZAz1v3dPpg5/giphy.gif"
        ]
    },
    "laugh": {
        emoji: "🤣",
        links: [
            "https://media.giphy.com/media/3o7abzpaD1AzrfGnEK/giphy.gif",
            "https://media.giphy.com/media/3oKIPx5MLZJSyQ7Xaa/giphy.gif",
            "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif"
        ]
    },
    "punch": {
        emoji: "👊",
        links: [
            "https://media.giphy.com/media/l0MYyWs6w9vh6z2lC/giphy.gif",
            "https://media.giphy.com/media/j2oc3hVqVr6jo/giphy.gif",
            "https://media.giphy.com/media/7I1haB3Zl03nG/giphy.gif"
        ]
    },
    "love": {
        emoji: "❤️",
        links: [
            "https://media.giphy.com/media/l0K4iM9I6qCkrY2lg/giphy.gif",
            "https://media.giphy.com/media/3o7abzpaD1AzrfGnEK/giphy.gif",
            "https://media.giphy.com/media/9J7onFkpMf9JYY5SkN/giphy.gif"
        ]
    },
    "sad": {
        emoji: "😔",
        links: [
            "https://media.giphy.com/media/3o6Zt5dKDbw0PxlXB6/giphy.gif",
            "https://media.giphy.com/media/l3q2Vjx7lHl6ggWPO/giphy.gif",
            "https://media.giphy.com/media/l0NwNUp4rr1Bsh9O0/giphy.gif"
        ]
    },
    "smug": {
        emoji: "😏",
        links: [
            "https://media.giphy.com/media/xT0GqnGFve9b4fdQta/giphy.gif",
            "https://media.giphy.com/media/l0MYs1zN1F3VfTqvq/giphy.gif",
            "https://media.giphy.com/media/ilCx5n4tVjLpo/giphy.gif"
        ]
    },
    "mad": {
        emoji: "😜",
        links: [
            "https://media.giphy.com/media/3o6Zt5ACf3CTj6fUeA/giphy.gif",
            "https://media.giphy.com/media/xT0xeJpn8EX5Vbu7wY/giphy.gif",
            "https://media.giphy.com/media/3o6Zt4Y0YcL0XKfIlS/giphy.gif"
        ]
    },
    "mean": {
        emoji: "😈",
        links: [
            "https://media.giphy.com/media/8JUVonVzdpd7bF67X3/giphy.gif",
            "https://media.giphy.com/media/kMXsB88FxNSrG6gx6N/giphy.gif",
            "https://media.giphy.com/media/7e6Us10J7YbBm5jjle/giphy.gif"
        ]
    },
    "furious": {
        emoji: "😠",
        links: [
            "https://media.giphy.com/media/3o7aD1U6gf1plX21I4/giphy.gif",
            "https://media.giphy.com/media/26Fxfjl3JtGy2J7kM/giphy.gif",
            "https://media.giphy.com/media/8UJJd7A4gfzdo/giphy.gif"
        ]
    }
};

arimaBot({ nomCom: 'action', categorie: 'Fun' }, async (dest, bot, options) => {
    let { argumentsCommande, envoyer } = options;

    // Vérifier si l'utilisateur a entré une commande
    if (argumentsCommande.length === 0) {
        return envoyer(dest, { texte: "❌ Veuillez spécifier une action (ex : !action hug)" });
    }

    const action = argumentsCommande[0].toLowerCase();

    // Vérifier si l'action existe dans la liste
    if (actionsImages[action]) {
        const { emoji, links } = actionsImages[action];
        const randomLink = links[Math.floor(Math.random() * links.length)];
        
        return envoyer(dest, {
            image: { url: randomLink },
            texte: `Voici l'action "${action}" que vous avez demandée ${emoji}!`
        });
    } else {
        return envoyer(dest, { texte: `❌ Action "${action}" non reconnue. Voici les actions possibles : hug, kiss, slap, dance, wave, cry, laugh, punch, love, sad, smug, mad, mean, furious.` });
    }
});

// Exporter la commande pour l'intégration dans le bot
module.exports = {
    nomCom: ['action'],
    categorie: 'Fun',
    description: "Effectue des actions amusantes avec des images (câlins, baisers, claques, etc.)"
};
