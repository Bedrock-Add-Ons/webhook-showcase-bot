const { Client, Intents, WebhookClient } = require('discord.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const config = require('./config.json')
const creationsWebhook = new WebhookClient({ "url": config.discussion_webhook })

// log when bot is running
client.once("ready", () => console.log("Ready"))

// copy messages from showcase to discussion
client.on("messageCreate", async message => {

	if (message.channel.id != config.showcase_id) return
	if (message.member.nickname == null) membername = message.author.username
	else membername = message.member.nickname

	const webhookData = { "content": message.content, "username": membername, "files": [], "avatarURL": message.author.avatarURL({ dynamic: true }), "allowedMentions": { parse: [] } }
	message.attachments.forEach(attachment => {
		const ImageLink = attachment.proxyURL
		webhookData.files.push(ImageLink)
	})
	const messageObject = await creationsWebhook.send(webhookData)
	console.log("Showcase sent by " + message.author.username + '#' + message.author.discriminator + " in " + message.channel.name + ": " + message.content)

	setTimeout(async () => {
		try {
			await message.react("👍");
		} catch (err) {
			console.log(messageObject.id)
			creationsWebhook.deleteMessage(messageObject.id)
		}
	}, 6000)
})

client.login(config.token)
