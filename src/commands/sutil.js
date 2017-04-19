exports.run = function (client, msg, args, guilds) {

	if (msg.author.id !== "180093157554388993") return false;

	if (!args[0]) return msg.channel.createMessage({
		embed: {
			color: 0x1E90FF,
			title: "Specify an action",
			description: "< farm | leave | lookup | blacklist | hm | mi >"
		}
	})

	if (args[0] === "farm") {
		if (!args[1]) return msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			title: "You need to specify a bot % threshold"
		}})

		let g = client.guilds.filter(g => g.members.filter(m => m.bot).length / g.members.size * 100 >= args[1])
		msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			title: `Matches Found (${g.length})`,
			fields: [
				{ name: "\u200B", value: (g.length > 0 ? g.slice(0, 10).map(s => `**${s.name}** (${s.id})`).join("\n") : "None"), inline: true }
			]
		}})

	}

	if (args[0] === "leave") {
		if (!args[1] || isNaN(args[1])) return msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			title: "You need to specify an ID"
		}})

		if (!client.guilds.get(args[1])) return msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			title: ":warning: Not found"
		}})

		client.guilds.get(args[1]).leave();

		msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			description: "<:oktrump:284357092859707392>"
		}})
	}

	if (args[0] === "mi") {
		if (!args[1]) return msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			title: "You need to specify a server ID"
		}})

		if (!client.guilds.get(args[1])) return msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			title: ":warning: Not found"
		}})

		client.guilds.get(args[1]).defaultChannel.createInvite({ maxAge: 15 }).then(inv => {
			msg.channel.createMessage("discord.gg/" + inv.code)
		}).catch(err => {
			msg.channel.createMessage("Failed to generate invite")
		})

	}

	if (args[0] === "hm") {
		if (!args[1]) return msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			title: "You need to specify a member ID"
		}})

		let servers = client.guilds.filter(g => g.members.has(args[1]));
		msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			title: `Servers with member: ${args[1]}`,
			fields: [
				{ name: `${servers.length} results`, value: servers.map(s => s.name).join("\n"), inline: true }
			]
		}})

	}

	if (args[0] === "lookup") {
		if (!args[1]) return msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			title: "You need to specify a name or ID"
		}})

		if (isNaN(args[1])) {
			let search = client.guilds.filter(g => g.name.toLowerCase().includes(args.slice(1).join(" ").toLowerCase()))
			return msg.channel.createMessage({ embed: {
				color: 0x1E90FF,
				title: `Search Results (${search.length})`,
				fields: [
					{ name: "\u200B", value: (search.length > 0 ? search.slice(0, 10).map(s => `**${s.name}** (${s.id})`).join("\n") : "None"), inline: true }
				]
			}})
		} else {
			if (!client.guilds.get(args[1])) return msg.channel.createMessage({ embed: {
				color: 0x1E90FF,
				title: ":warning: Not found"
			}})

			let g = client.guilds.get(args[1])
			let bp = (g.members.filter(m => m.bot).length / g.members.size * 100).toFixed(2)
			msg.channel.createMessage({ embed: {
				color: 0x1E90FF,
				title: g.name,
				description: `Owner: ${client.users.get(g.ownerID) ? client.users.get(g.ownerID).username + client.users.get(g.ownerID).discriminator + " (" + g.ownerID + ")" : "Unknown"}`,
				fields: [
					{ name: "Overall Users", value: g.members.size, inline: true },
					{ name: "Bots", value: g.members.filter(m => m.bot).length, inline: true },
					{ name: "Users", value: g.members.filter(m => !m.bot).length, inline: true },
					{ name: "%", value: `${bp}% (${bp > 75 ? "NO" : "OK"})`, inline: true },
				]
			}})
		}
	}

	if (args[0] === "blacklist") {
		if (!args[1] || isNaN(args[1])) return msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			title: "You need to specify an ID"
		}})

		msg.channel.createMessage({ embed: {
			color: 0x1E90FF,
			title: ":warning: Command not finished."
		}})
	}
}

exports.usage = {
	main: "{prefix}{command}",
	args: "[ DEVELOPER COMMAND ]"
};