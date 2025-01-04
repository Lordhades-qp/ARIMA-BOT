client.on("message", (message) => {
  // Supposons que le préfixe de vos commandes soit "!"
  const prefix = "!";
  if (message.body.startsWith(prefix)) {
    const args = message.body.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commands.has(commandName)) {
      const command = commands.get(commandName);
      try {
        command.execute(client, message, args);
      } catch (error) {
        console.error(error);
        message.reply("❌ Une erreur est survenue lors de l'exécution de la commande.");
      }
    }
  } else {
    // Exécute la commande antibug sur tous les messages non commandés
    const antibugCommand = commands.get("antibug");
    if (antibugCommand) {
      try {
        antibugCommand.execute(client, message);
      } catch (error) {
        console.error(error);
      }
    }
  }
});
