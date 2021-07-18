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
	if (message.channel.id != config.showcase_id) return
	if (message.member.nickname == null) membername = message.author.username
	else membername = message.member.nickname
	if (message.attachments.array().length > 0) {
		let url = []
		message.attachments.forEach(attachment => {
			const ImageLink = attachment.proxyURL;
			url.push(ImageLink)
		});
		try {
			creationsWebhook.send(message.content, { "username": membername, "files": url, "avatarURL": message.author.avatarURL({ dynamic: true }), allowedMentions: { parse: [] } })
		} catch {
			creationsWebhook.send(`${message.content} \n ${message.url}`, { "username": membername, "avatarURL": message.author.avatarURL({ dynamic: true }), allowedMentions: { parse: [] } })
		}
	}
	else {
		creationsWebhook.send(message.content, { "username": membername, "avatarURL": message.author.avatarURL({ dynamic: true }), allowedMentions: { parse: [] } })
	}
	message.react("👍"); // this is optional, adds an emoji as a reaction in the showcase channel
})
