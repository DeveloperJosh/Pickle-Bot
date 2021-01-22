# Making Commands

## Making commands

Make a folder called commands and put the util folder in the command folder and add this to the folder:

{% code title="help.js" %}
```javascript
const { Command } = require('discord.js-commando');
const { stripIndents, oneLine } = require('common-tags');

const Discord = require('discord.js');


module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'util',
			memberName: 'help',
			aliases: ['commands'],
			description: 'Displays a list of available commands, or detailed information for a specified command.',
			examples: ['help', 'help prefix'],
			guarded: true,

			args: [
				{
					key: 'command',
					prompt: 'Info on commands.',
					type: 'string',
					default: ''
				}
			]
		});
	}


	async run(message, args) { 
    		const prefix = message.guild ? message.guild.commandPrefix : this.client.commandPrefix;

    const helpEmbed = new Discord.MessageEmbed();
    helpEmbed.setTitle("Command Help")
    helpEmbed.setColor("#e0e0e0")
		const groups = this.client.registry.groups;
		const commands = this.client.registry.findCommands(args.command, false, message);
		const showAll = args.command && args.command.toLowerCase() === 'all';
      
		if(args.command && !showAll) {
      
    if(commands.length === 1) {
      helpEmbed.setTitle(`${commands[0].name} help`)
      .setFooter("Command Help")
				let help = stripIndents`
					${oneLine`
						${commands[0].description}
						${commands[0].guildOnly ? ' (Server Only)' : ''}
						${commands[0].nsfw ? ' (NSFW)' : ''}
					`}
					**Format:** ${message.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ''}`)}
				`;
				if(commands[0].aliases.length > 0) help += `\n**Aliases:** ${commands[0].aliases.join(', ')}`;
				
				if(commands[0].details) help += `\n**Info:** ${commands[0].details}`;
        helpEmbed.setDescription(help)
				const messages = [];
				try {
          message.channel.send(helpEmbed)
				} catch(err) {
					messages.push(await message.reply('An error occured!'));
				}
				return messages;
			} else if(commands.length > 15) {
				return message.reply('Multiple commands found. Please be more specific.');
			} else if(commands.length > 1) {
				return message.reply("Multiple commands found.");
			} else {
				return message.reply(
					`Unable to identify command. Use ${message.usage(
						null, message.channel.type === 'dm' ? null : undefined, message.channel.type === 'dm' ? null : undefined
					)} to view the list of all commands.`
				);

  function disambiguation(items, label, property = 'name') {
	const itemList = items.map(item => `"${(property ? item[property] : item).replace(/ /g, '\xa0')}"`).join(',   ');
	return `Multiple ${label} found, please be more specific: ${itemList}`;
}
    
	}
    }
    else { 
   
          var xgroups = []
    var xcmds = []
    let helpStuff =`Morning, Here are my commands! ${prefix}help <command> for more info on a certain command!`

					groups.filter(grp => grp.commands.some(cmd => !cmd.hidden && (showAll || cmd.isUsable(message))))
						.map(grp => {
              xgroups.push(grp.name)
  xcmds.push(grp.commands.filter(cmd => !cmd.hidden && (showAll || cmd.isUsable(message)))
								.map(cmd => "`" + cmd.name + "`").join(', '))

							})
     
    helpEmbed.setDescription(helpStuff)
    .setFooter("For more info on a command, use " + prefix + "help [command]")
    let i = 0
    while (i < xgroups.length){
                  helpEmbed.setThumbnail(this.client.user.displayAvatarURL())
      helpEmbed.addField(xgroups[i], xcmds[i], true)
      i += 1
      
    }

      message.channel.send(helpEmbed)}
  }
}
```
{% endcode %}

{% hint style="info" %}
If you have any problems please dm ♡𝔹𝕝𝕦𝕖♡\#1270
{% endhint %}

Once you're strong enough, save the world:

{% code title="ping.js" %}
```javascript
const { Command } = require("discord.js-commando");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      group: "util",
      memberName: "ping",
      description: "pong",
      guildOnly: true
    });
  }

  async run(message, client) {
    
message.channel.send(`The heartbeat ping is ${Math.round(this.client.ws.ping)}ms.`);
      
  }
};
```
{% endcode %}



