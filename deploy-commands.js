import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const commands = [];
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationCommands(process.env.clientId),
            { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    } catch (err) {
        console.error(err)
    }
})();