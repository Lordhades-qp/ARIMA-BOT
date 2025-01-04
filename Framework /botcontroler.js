const { sendMessageToWhatsApp } = require('../services/whatsappService');

exports.getStatus = (req, res) => {
    res.json({ status: 'Bot en ligne' });
};

exports.sendMessage = async (req, res) => {
    const { message } = req.body;
    const result = await sendMessageToWhatsApp(message);
    res.json(result);
};
