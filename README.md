# Anti Poll Discord Bot

Discord released poll's to 10% of servers on 3/21/2024 without a permission tied to it that can be easily disabled. 
This bot is a temporary solution to disable polls in your server.

The bot will delete all polls sent by members.
Polls by members with the `manage messages` permission will not be deleted.

This bot requires the permissions `view channel` and `manage messages`.

## Setup

- Install [Bun](https://bun.sh)
- Clone this repository
- Fill out the `.env` file with your bot token.
- Run `bun install`
- Run `bun start`