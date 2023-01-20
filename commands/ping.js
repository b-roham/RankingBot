import { SlashCommandBuilder } from "discord.js";
export const name = 'ping';
export const data = new SlashCommandBuilder()
    .setName(name)
    .setDescription("Replies with Pong!");
export async function execute(interaction) {
    await interaction.reply("Pong!");
    console.log("Execute command!");
}