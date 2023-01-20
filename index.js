import dotenv from 'dotenv';
dotenv.config();
import { Client, EmbedBuilder, GatewayIntentBits, Collection, Events } from 'discord.js';
import { readdirSync } from 'fs';
const CookieStart = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_";
import noblox from 'noblox.js';
export const groupid = 6781349

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})
client.commands = new Collection();

client.on('ready', async () => {
    client.user.setActivity("I'm Alive!");
    const CommandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of CommandFiles) {
        const command = await import(`./commands/${file}`);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`Found command: ${command.name}`)
        } else {
            console.log(`[WARNING] The command ./commands/${file} is missing a required "data" or "execute" property.`)
        }
    }
})

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    if (!client.commands.has(commandName)) return;
    try {
        client.commands.get(commandName).execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
})

async function StartApp() {
    await noblox.setCookie(CookieStart + process.env.COOKIE)
    await client.login(process.env.TOKEN);
    console.log("Logged into Discord and ROBLOX successfully.")
}

StartApp();