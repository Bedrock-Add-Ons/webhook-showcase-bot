# WebhookShowcaseBot
Copies messages from a showcase channel to a discussion channel

## Notes
### In config.json
Rename `config.example.json` to `config.json` and fill in all the fields.
The discussion webhook should be from domain `discord.com` rather than `discordapp.com` or `discord.gg`

Do have https://discord.com/api/webhooks/815121980596158495/46D6aKk3xXxqf6oj-JQZIRqvjvZ2HBHrjr3VtsJ6o0OfextKjhvNOI-sA7Uhhzvix69K

Don't have https://discordapp.com/api/webhooks/815121980596158495/46D6aKk3xXxqf6oj-JQZIRqvjvZ2HBHrjr3VtsJ6o0OfextKjhvNOI-sA7Uhhzvix69K or https://discord.gg/api/webhooks/815121980596158495/46D6aKk3xXxqf6oj-JQZIRqvjvZ2HBHrjr3VtsJ6o0OfextKjhvNOI-sA7Uhhzvix69K
### In your server
If anyone or any bot reacts to a message before it gets sent in the discussion channel it will not send the embed
