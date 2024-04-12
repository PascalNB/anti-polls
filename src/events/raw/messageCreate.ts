import {Embed, EmbedBuilder, GatewayDispatchEvents, Message, PermissionFlagsBits, TextChannel} from "discord.js";
import {type GatewayMessageCreateDispatchData} from "discord-api-types/gateway";
import type AntiPolls from "../../utils/client.ts";

export const raw = true;
export const type = GatewayDispatchEvents.MessageCreate;
export const channelId = process.env.DISCORD_TOKEN;

export async function run(client: AntiPolls, data: GatewayMessageCreateDispatchData & {
    poll?: unknown;
}) {
    if (!("poll" in data)) return;

    // @ts-expect-error we are fine creating it
    const msg = new Message(client, data) as Message;

    if (!msg.inGuild() || msg.member!.permissions.has(PermissionFlagsBits.ManageMessages)) return;

    const doIGotPermsManageMessagesPerms = msg.guild.members.me?.permissions.has(PermissionFlagsBits.ManageMessages);

    if (doIGotPermsManageMessagesPerms) {
        msg.delete().catch(client.catch);
        if (!channelId) return;

        const channel = msg.guild.channels.cache.get(channelId) as TextChannel;
        if (!channel) return;

        if (channel.permissionsFor(msg.guild.members.me!)
            .has(PermissionFlagsBits.SendMessages & PermissionFlagsBits.ViewChannel).valueOf()) {

            const embed = new EmbedBuilder()
                    .setDescription(`Poll by <@${msg.author.id}> in <#${msg.channelId}> removed`);

            channel.send({embeds: [embed]}).catch(client.catch);
        }
    }

}