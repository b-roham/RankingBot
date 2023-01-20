import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import noblox from 'noblox.js';
import { groupid } from '../index.js';

export const name = 'promote';
export const data = new SlashCommandBuilder()
    .setName('promote')
    .setDescription('Promotes a user in the Roblox Group')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addStringOption(option => option.setName('target').setDescription('The roblox username of the user to promote.').setRequired(true));
export async function execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getString('target');
    await noblox.getIdFromUsername(user)
        .then(async (robloxId) => {
            noblox.promote(groupid, robloxId)
                .then(async (result) => {
                    const embed = new EmbedBuilder()
                        .setTitle("Promotion!")
                        .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${robloxId}&width=420&height=420&format=png`)
                        .addFields([
                            { name: '__Roblox Username__', value: `[${user}](https://www.roblox.com/users/${robloxId}/profile)`, inline: false },
                            { name: '__Old Role__', value: result.oldRole.name, inline: true },
                            { name: '__New Role__', value: result.newRole.name, inline: true }
                            
                        ])
                        .setTimestamp()
                        .setFooter({ text: 'Bot made by NotBroham' });
                    await interaction.editReply({ embeds: [embed] });
                }).catch(async (err) => {
                    await interaction.editReply({ content: "There was an error" , ephemeral: true});
                    console.error(err);
                });
        }).catch(async (err) => {
            await interaction.editReply({ content: "There was an error" , ephemeral: true});
            console.error(err);
        })
}