// require dependencies
const Discord = require("discord.js")
const config = require('./config.json');

// set up discord client
const client = new Discord.Client()
client.login(config.token)

// set up webhook
const webhookID = config.discussion_webhook.substr(33, 18)
const webhookToken = config.discussion_webhook.substr(52, 68)
const creationsWebhook = new Discord.WebhookClient(webhookID, webhookToken)

// log when bot is running
client.once("ready", () => console.log("Ready"))

// move messages
client.on("message", message => {
	setTimeout(() => {
		if (message.channel.id != config.showcase_id) return
		if (message.member.nickname == null) membername = message.author.username
		else membername = message.member.nickname
		if (message.attachments.array().length > 0) {
			const url = getattach()
			function getattach() {
				const attachurl = message.attachments.first().url
				return attachurl
			}
			console.log(url)
			creationsWebhook.send(message.content, { username: membername, files: [url], avatarURL: message.author.avatarURL({ dynamic: true }) })
		}
		else {
			creationsWebhook.send(message.content, { username: membername, avatarURL: message.author.avatarURL({ dynamic: true }) })
		}

	}, 5000)
})
