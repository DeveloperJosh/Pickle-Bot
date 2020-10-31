const Discord = require('discord.js');
var color = require('chalk');
const weather = require("weather-js");
const { prefix, token, status, play, ownerid, online } = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(color.green(`Logged in as ${client.user.tag}!`));

    client.user.setPresence({
        status: (online),
        activity: {
            name: (status),
            type: (play)
        }
    });
});

client.on('guildMemberAdd', member => {
    member.roles.add(member.guild.roles.cache.find(i => i.name === 'Member'))
    
    const welcomeEmbed = new Discord.MessageEmbed()
    
    welcomeEmbed.setColor('#5cf000')
    welcomeEmbed.setTitle('**' + member.user.username + '** Welcome to the server, There are **' + member.guild.memberCount + '** people')
    
    member.guild.channels.cache.find(i => i.name === 'welcome').send(welcomeEmbed)
});

const responseObject = {
  "My pickle": "I have come for your pickle!",
  "my pickle": "I have come for your pickle!",
  "Pickle": "I have come for your pickle!",
  "pickle": "I have come for your pickle!"
};

client.on("message", (message) => {
  if(responseObject[message.content]) {
    message.channel.send(responseObject[message.content]);
  }
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    
    let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    Date.now() - message.createdTimestamp
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

	if (command === 'ping') {
		///message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        const pingEmbed = new Discord.MessageEmbed()
	//.setColor('#251dff')
    .setColor("RANDOM")
	.setTitle('Ping')
	.addField("Pong", `🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
	.setTimestamp()
	.setFooter('Made by ♡𝔹𝕝𝕦𝕖♡#6268');

message.channel.send(pingEmbed);
        
	} else if (command === 'uptime') {
		///message.channel.send(`I have been on for ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`);
        const uptimeEmbed = new Discord.MessageEmbed()
	.setColor("RANDOM")
	.setTitle('Uptime')
	.addField("Online for", `${days}d, ${hours}h, ${minutes}m, ${seconds}s`)
	.setTimestamp()
	.setFooter('Made by ♡𝔹𝕝𝕦𝕖♡');
        message.channel.send(uptimeEmbed);
	}
    
    else if (command === 'help') {
        const helpEmbed = new Discord.MessageEmbed()
	.setColor("RANDOM")
	.setTitle('Help')
	.setDescription('This is the help command')
    .setThumbnail('https://vignette.wikia.nocookie.net/superfanon/images/2/22/Pickle_Man.jpg/revision/latest?cb=20170826192908')
	.addFields(
		{ name: '__Commands__', value: 'Bot Prefix is ``p!``' },
		{ name: '__Utility Commands__⚙️', value: '``p!ping``, ``p!uptime``, ``p!serverinfo``, ``p!botinfo``, ``p!userinfo``, ``p!invite``', inline: true },
		{ name: '__Fun Commands__🤖', value: '``p!8ball``, ``p!pepe``, ``p!rate``, ``p!remindme``, ``p!weather location``', inline: true },
        { name: '__Mod Commands__🛠', value: '``p!kick reason``, ``p!ban reason``, ``p!warn reason``', inline: true },
	)
	.setTimestamp()
	.setFooter('Made by ♡𝔹𝕝𝕦𝕖♡#6268');

message.channel.send(helpEmbed);
    }
  
    else if (command === 'servers'){
        if (message.author.id !== (ownerid)) return false;
        let guilds = '';
        client.guilds.cache.forEach((guild) => {
            guilds = guilds.concat(guild).concat("\n"); 
        })
    const serverlist = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`The Bot is in these servers`)
    .addField((guilds), 'They all have the pickles')
    .setFooter('Made By ♡𝔹𝕝𝕦𝕖♡')
  message.channel.send(serverlist);
     }
    
   else if (command === "invite") {
      const Embed = new Discord.MessageEmbed()
	.setColor("RANDOM")
	.setTitle('Invite me')
	.setURL("https://discord.com/api/oauth2/authorize?client_id=750043057952391298&permissions=8&scope=bot")
  message.channel.send(Embed);
     }
    
    else if (command === 'serverinfo') {
        const serverinfo = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Server Info")
            .setImage(message.guild.iconURL)
            .setDescription(`${message.guild}'s information`)
            .addField("Owner", `The owner of this server is ${message.guild.owner}`)
            .addField("Member Count", `This server has ${message.guild.memberCount} members`)
            .addField("Emoji Count", `This server has ${message.guild.emojis.cache.size} emojis`)
            .addField("Roles Count", `This server has ${message.guild.roles.cache.size} roles`)
            .addField("Created at", `Made on ${message.guild.createdAt}`)
            .setTimestamp()
            .setFooter("Made by ♡𝔹𝕝𝕦𝕖♡#6268")
            
        message.channel.send(serverinfo);
         }
   
     else if (command === 'sad') {
         const sad = new Discord.MessageEmbed()
         .setTitle("My Developer is sad")
         .setImage("https://data.whicdn.com/images/320214384/original.gif")
         .setFooter("If you found this good job...")
       
        message.channel.send(sad);
        }
    
 else if (command === 'ban') {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return message.reply('pls mention a member or write ID for BAN');
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You has no permission for ban members');
        if (!member.manageable) return message.reply('I cant ban this member'); 
        member.ban();
         }
    
    else if (command === 'kick') {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return message.reply('pls mention a member or write ID for KICK');
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You has no permission for kick members');
        if (!member.manageable) return message.reply('I cant kick this member');
        member.kick();
           }
    
  else if (command === "botinfo") {
    const botinfo = new Discord.MessageEmbed()
    .addField("**Bot Name🤖:**", client.user.username)
    .setTitle("**Bot Information📄**")
    .addFields(
        { name: '**Version⚙️:**', value: "1.0.7"},
        { name: '**Prefix⚙️:**', value: "p!"},
        { name: 'Bot Library⭕:', value: "Discord.js"},
        { name: '**Created by👤:**', value: '♡𝔹𝕝𝕦𝕖♡#6268'},
        { name: '**Created at🗓:**', value: client.user.createdAt},
        { name: '**Logo by🖼️**:', value: 'ジェイク#0944'},
        { name: '**help🛠:**', value: 'Dm ♡𝔹𝕝𝕦𝕖♡#6268 for more info'},
)
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter("For More Commands Type: p!help")
    message.channel.send(botinfo);
     }
    
    else if (command === '8ball') {
         if(!args[1]) return message.reply("Plesae enter a full question with 2 or more words!");
    let replies = ["Yes", "No", "I don't know", "Ask again later!", "Cyka", "I am not sure!", "Pls No", "You tell me", "Without a doubt", "Cannot predict now", "Without a doubt", ];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.join(" ");

    let ballembed = new Discord.MessageEmbed()

    .setAuthor(message.author.username)
    .setColor("RANDOM")
    .addField("Question:", question)
    .addField("Answer:", replies[result]);

    message.channel.send(ballembed);
      }
  
    else if (command === 'userinfo') {
const user = message.mentions.users.first() || message.author
const embed = new Discord.MessageEmbed()
  .setTitle('User information')
  .addField('Player Name', user.username)
   .addField('ID', user.id)
  .addField("Status",`${ user.presence.status}`, true)
  .addField('Created', user.createdAt)
  .addField('Current server', message.guild.name)
  .setColor("RANDOM")
  .setThumbnail(user.displayAvatarURL())
  .setFooter(`Requested By:${message.author.username}`)

message.channel.send(embed);
    }
    
    else if (command === 'warn') {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have premission to do that!");
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.');
  if (reason.length < 1) return message.reply('You must have a reason for the warning.');

  let dmsEmbed = new Discord.MessageEmbed()
  .setTitle("Warn")
  .setColor("#00ff00")
  .setDescription(`You have been warned on \`${message.guild.name}\``)
  .addField("Warned by", message.author.tag)
  .addField("Reason", reason);

  user.send(dmsEmbed);

  message.delete();
  
  message.channel.send(`${user.tag} has been warned`)
    }
    
    else if (command === 'rate') {
        let ratus = message.mentions.members.first();
if(!ratus) return message.channel.send("Tag someone to rate them!");

let rates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

let result = Math.floor((Math.random() * rates.length));

if(ratus.user.id === message.author.id) {
  return message.channel.send(`**${message.author.username}**, I'd give you ${result}/10`);
} else return message.channel.send(`I'd give **__${ratus.user.username}__** ${result}/10`);
    }
    
    else if (command === 'weather') {
         weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
        if(err) message.channel.send(err)

        if(result.length === 0) {
            message.channel.send("**please enter a valid location**")
            return;
        }

        var current = result[0].current 
        var location = result[0].location 

        let embed = new Discord.MessageEmbed()
           .setDescription(`**${current.skytext}**`) 
           .setAuthor(`Weather for ${current.observationpoint}`) 
           .setThumbnail(current.imageUrl) 
           .setColor("RANDOM") 
           .addField("Timezone", `UTC${location.timezone}`, true) 
           .addField("Degree Type", location.degreetype, true) 
           .addField("Temperature", `${current.temperature}`, true)
           .addField("Feels like", `${current.feelslike} Degrees`, true)
           .addField("Winds", current.winddisplay, true)
           .addField("Humidity", ` ${current.humidity}%`, true)
           .addField("Day", `${current.day}`, true)
           .addField("Date", `${current.date}`, true)
           
           message.channel.send(embed)

    });

    message.delete();
       }
    
    else if (command === 'pepe') {
         let pepe1 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage("https://cdn.discordapp.com/emojis/428556352915505165.png?v=1");

    let pepe2 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage("https://cdn.discordapp.com/emojis/428556326482739230.png?v=1");

    let pepe3 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage("https://cdn.discordapp.com/emojis/428556486235389973.png?v=1");

    let pepe4 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage("https://cdn.discordapp.com/emojis/428556308929576960.png?v=1");

    let pepe5 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage("https://cdn.discordapp.com/emojis/428556295218659329.png?v=1");

    let pepe6 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage("https://cdn.discordapp.com/emojis/428556467021545473.png?v=1");

    let pepe7 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage("https://cdn.discordapp.com/emojis/428556448507625474.png?v=1");

    let pepe8 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage("https://cdn.discordapp.com/emojis/428556377754042378.png?v=1");

    let pepe9 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage("https://cdn.discordapp.com/emojis/428556281767526405.png?v=1");

    let pepe10 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage("https://cdn.discordapp.com/emojis/428556266366042112.png?v=1");

    let pepes = [pepe1, pepe2, pepe3, pepe4, pepe5, pepe6, pepe7, pepe8, pepe9, pepe10]

    let dapepe = Math.floor((Math.random() * pepes.length));

    message.channel.send(pepes[dapepe]);
       }
    
    else if (command === 'remindme') {
        	var time = args[0];
	var reminder = args.splice(1).join(' ');

	if (!time) return message.reply('Can\'t remind you if I don\'t know when to do so...');
	if (!reminder) return message.reply('You forgot the reminder');

	time = time.toString();

	if (time.indexOf('s') !== -1) {
		var timesec = time.replace(/s.*/, '');
		var timems = timesec * 1000;
	} else if (time.indexOf('m') !== -1) { 
		var timemin = time.replace(/m.*/, '');
		timems = timemin * 60 * 1000;
	} else if (time.indexOf('h') !== -1) { 
		var timehour = time.replace(/h.*/, '');
		timems = timehour * 60 * 60 * 1000;
	} else if (time.indexOf('d') !== -1) { 
		var timeday = time.replace(/d.*/, '');
		timems = timeday * 60 * 60 * 24 * 1000;
	}	else {
		return message.reply('The time must be in the format of <number>[s/m/h/d]');
	}

	message.reply(`I will remind you in \`${time}\` about \`${reminder}\``);

	setTimeout(function () {
		message.reply(`You asked me \`${time}\` ago to remind you about \`${reminder}\``);
	}, parseInt(timems));

   };
});

client.login(token);
