import { GatewayDispatchEvents, Message, PermissionFlagsBits } from "discord.js";
import { type GatewayMessageCreateDispatchData } from "discord-api-types/gateway";
import type AntiPolls from "../../utils/client.ts";

export const raw = true;
export const type = GatewayDispatchEvents.MessageCreate;

export async function run(client: AntiPolls, data: GatewayMessageCreateDispatchData & {
    poll?: unknown;
}) {
    if (!("poll" in data)) return;

    console.log("Poll discovered");

    // @ts-expect-error we are fine creating it
    const msg = new Message(client, data) as Message;

    if (!msg.inGuild()) return;

    const doIGotPermsManageMessagesPerms = msg.guild.members.me?.permissions.has(PermissionFlagsBits.ManageMessages);

    if (doIGotPermsManageMessagesPerms) {
        msg.delete().catch(client.catch);
    } else {
        console.log("missing permission")
    }

}