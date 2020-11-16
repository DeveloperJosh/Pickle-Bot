const Discord = require('discord.js');
var color = require('chalk');
const weather = require("weather-js");
const db = require("quick.db");
const ms = require("parse-ms");
const snekfetch = require('snekfetch');
const fsn = require('fs-nextra');
const { prefix, token, status, play, ownerid, online, url } = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(color.green(`Logged in as ${client.user.tag}!, In ${client.guilds.cache.size} Servers!`));

    client.user.setPresence({
        status: (online),
        activity: {
            name: (status),
            type: (play),
             url: (url)
        }
    });
});

client.on("guildCreate", (guild) => {
    const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
	.addField(`Hello! I'm ${client.user.username}`, `Thanks for adding me to your server!\n\nView all of my commands with p!help`)
    guild.owner.user.send(Embed);
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
    .setThumbnail(client.user.displayAvatarURL())
	.addFields(
		{ name: '__Commands__', value: 'Bot Prefix is ``p!``' },
		{ name: '__Utility Commands__⚙️', value: '``p!ping``, ``p!uptime``, ``p!serverinfo``, ``p!botinfo``, ``p!userinfo``, ``p!invite``', inline: true },
		{ name: '__Fun Commands__🤖', value: '``p!8ball``, ``p!pepe``, ``p!rate``, ``p!roll``, ``p!love``, ``p!remindme``, ``p!hug``, ``p!weather``', inline: true },
        { name: '__Mod Commands__🛠', value: '``p!kick reason``, ``p!ban reason``, ``p!warn reason``, ``p!say``', inline: true },
        { name: '__Money Commands__💸', value: '``p!bal``, ``p!deposit``, ``p!withdraw``, ``p!work``, ``p!monthly``, ``p!weekly``, ``p!daily``, ``p!profile``, ``p!store``, ``p!buy``, ``p!sell``, ``p!roulette``', inline: true },
	)
	.setTimestamp()
	.setFooter('Made by ♡𝔹𝕝𝕦𝕖♡#6268');
    console.log(`${message.author.username} used the help command`)

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
    .setFooter('I am in all of those servers')
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
        let member = message.mentions.members.first();
        if (!member) return message.reply('pls mention a member or write ID for BAN');
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You has no permission for ban members');
        if (!member.manageable) return message.reply('I cant ban this member'); 
     
        member.ban();
         }
    
    else if (command === 'kick') {
        let member = message.mentions.members.first();
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
        { name: 'Memory💻:', value: `${(process.memoryUsage().heapUsed / 1000 / 1000).toFixed(2)}` + "MBS"},
        { name: '**Created by👤:**', value: '♡𝔹𝕝𝕦𝕖♡#6268'},
        { name: '**Created at🗓:**', value: client.user.createdAt},
        { name: '**Logo by🖼️**:', value: 'Rai#0944'},
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
  .setFooter(`Requested By: ${message.author.username}`)

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
             
                     if(err) {
           message.channel.send('')
           return;
        }

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
         }
    
    else if (command === 'bal') {
  let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`**${user}'s Balance**\n\nPocket: ${bal}$\nBank: ${bank}$`);
  message.channel.send(moneyEmbed)
    }
    
else if (command === 'work') {

    let user = message.author;
    let author = db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 100) + 1;
          
        message.channel.send(`You worked as a ${replies[result]} and earned ${amount} pickles`)
        
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };
}
    
else if (command === 'deposit') {
     let user = message.author;

  let member = db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

  if (args[0] == 'all') {
    let money = db.fetch(`money_${message.guild.id}_${user.id}`)
    let bank = db.fetch(`bank_${message.guild.id}_${user.id}`)

    let embedbank = new Discord.MessageEmbed()
    .setColor('#FFFFFF')
    .setDescription("You don't have any pickles to deposit")

    if(money === 0) return message.channel.send(embedbank)

    db.add(`bank_${message.guild.id}_${user.id}`, money)
    db.subtract(`money_${message.guild.id}_${user.id}`, money)
    let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You have deposited all your pickles into your bank`);
  message.channel.send(embed5)
  
  } else {
  
  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`Specify an amount to deposit`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
      .catch(err => console.log(err))
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You can't deposit negative pickles`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You don't have that much pickles`);

  if (member < args[0]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You have deposited ${args[0]} pickles into your bank`);

  message.channel.send(embed5)
  db.add(`bank_${message.guild.id}_${user.id}`, args[0])
  db.subtract(`money_${message.guild.id}_${user.id}`, args[0])
          };        
    }

    else if (command === 'withdraw') {
          let user = message.author;

  let member = db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

  if (args[0] == 'all') {
    let money = db.fetch(`bank_${message.guild.id}_${user.id}`)
    
    db.subtract(`bank_${message.guild.id}_${user.id}`, money)
    db.add(`money_${message.guild.id}_${user.id}`, money)
    let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You have withdrawn all your pickles from your bank`);
  message.channel.send(embed5)
  
  } else {

  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`Specify an amount to withdraw`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You can't withdraw negative pickles`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You don't have that much pickles in the bank`);

  if (member2 < args[0]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You have withdrawn ${args[0]} pickles from your bank`);

  message.channel.send(embed5)
  db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
  db.add(`money_${message.guild.id}_${user.id}`, args[0])
      
  };
    }
    
    else if (command === 'store') {
 let embed = new Discord.MessageEmbed()
    .setDescription("**VIP Ranks**\n\nBronze: 3500 pickles [p!buy bronze]\n\n**Lifestyle Items**\n\nFresh Nikes: 600 [p!buy nikes]\nCar: 800 [p!buy car]\nMansion: 1200 [p!buy mansion]")
    .setColor("#FFFFFF")
    message.channel.send(embed);
    }
    
    else if (command === 'storeinfo') {
         if (args[0] == 'bronze') {
    
      let embed = new Discord.MessageEmbed()
      .setDescription("**Bronze Rank**\n\nBenefits: Cool new rank")
      .setColor("#FFFFFF")
      message.channel.send(embed)
    } else if(args[0] == 'nikes') {
      let embed = new Discord.MessageEmbed()
      .setDescription("**Fresh Nikes**\n\nBenefits: Chance to win pickles, roles on our Discord Server")
      .setColor("#FFFFFF")
      message.channel.send(embed)
    } else if(args[0] == 'car') {
      let embed = new Discord.MessageEmbed()
      .setDescription("**Car**\n\nBenefits: Chance to win pickles, roles on our Discord Server")
      .setColor("#FFFFFF")
      message.channel.send(embed)
  } else if(args[0] == 'mansion') {
    let embed = new Discord.MessageEmbed()
    .setDescription("**Mansion**\n\nBenefits: Chance to win pickles, roles on our Discord Server")
    .setColor("#FFFFFF")
    message.channel.send(embed)
  };
        
    }
    
    else if (command === 'buy') {
            let user = message.author;

    let author = db.fetch(`money_${message.guild.id}_${user.id}`)

    let Embed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You need 3500 pickles to purchase Bronze VIP`);

    if (args[0] == 'bronze') {
        if (author < 3500) return message.channel.send(Embed)
        
        db.fetch(`bronze_${message.guild.id}_${user.id}`);
        db.set(`bronze_${message.guild.id}_${user.id}`, true)

        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Purchased Bronze VIP For 3500 pickles`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 3500)
        message.channel.send(Embed2)
    } else if(args[0] == 'nikes') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You need 600 pcikles to purchase some Nikes`);

        if (author < 600) return message.channel.send(Embed2)
       
        db.fetch(`nikes_${message.guild.id}_${user.id}`)
        db.add(`nikes_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Purchased Fresh Nikes For 600 pickles`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 600)
        message.channel.send(Embed3)
    } else if(args[0] == 'car') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You need 800 pickles to purchase a new car`);

        if (author < 800) return message.channel.send(Embed2)
       
        db.fetch(`car_${message.guild.id}_${user.id}`)
        db.add(`car_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Purchased a New Car For 800 pickles`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 800)
        message.channel.send(Embed3)
    } else if(args[0] == 'mansion') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You need 1200 pickles to purchase a Mansion`);

        if (author < 1200) return message.channel.send(Embed2)
       
        db.fetch(`house_${message.guild.id}_${user.id}`)
        db.add(`house_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Purchased a Mansion For 1200 pickles`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 1200)
        message.channel.send(Embed3)
    } else {
        let embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription('Enter an item to buy')
        message.channel.send(embed3)
        
    };
        
    }
    
    else if (command === 'weekly') {
   let user = message.author;
  let timeout = 604800000;
  let amount = 500;

  let weekly = db.fetch(`weekly_${message.guild.id}_${user.id}`);

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You have already collected your weekly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You've collected your weekly reward of ${amount} pickles`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())
  };
    }
    
    else if (command === 'daily') {
          let user = message.author;

  let timeout = 86400000;
  let amount = 200;

  let daily = db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You've collected your daily reward of ${amount} pickles`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`daily_${message.guild.id}_${user.id}`, Date.now())
  };
    }
    
    else if (command === 'beg') {
          let user = message.author;

  let timeout = 180000;
  let amount = 5;

  let beg = db.fetch(`beg_${message.guild.id}_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You've begged and received ${amount} pickles`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`beg_${message.guild.id}_${user.id}`, Date.now())
  };
    }
    
    else if (command === 'profile') {
          let user = message.mentions.members.first() || message.author;

  let money = db.fetch(`money_${message.guild.id}_${user.id}`)
  if (money === null) money = 0;

  let bank = db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let vip = db.fetch(`bronze_${message.guild.id}_${user.id}`)
    if(vip === null) vip = 'None'
    if(vip === true) vip = 'Bronze'

  let shoes = db.fetch(`nikes_${message.guild.id}_${user.id}`)
  if(shoes === null) shoes = '0'

  let newcar = db.fetch(`car_${message.guild.id}_${user.id}`)
  if(newcar === null) newcar = '0'

  let newhouse = db.fetch(`house_${message.guild.id}_${user.id}`)
  if(newhouse === null) newhouse = '0'

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`**${user}'s Profile**\n\nPocket: ${money}\nBank: ${bank}\nVIP Rank: ${vip}\n\n**Inventory**\n\nNikes: ${shoes}\nCars: ${newcar}\nMansions: ${newhouse}`);
  message.channel.send(moneyEmbed); 
        
    }
    
    else if (command === 'roulette') {
          let user = message.author;

  function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}
    
let colour = args[0];
let money = parseInt(args[1]);
let moneydb = db.fetch(`money_${message.guild.id}_${user.id}`)

let random = Math.floor(Math.random() * 37);

let moneyhelp = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(`Specify an amount to gamble | p!roulette <color> <amount>`);

let moneymore = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(`You are betting more than you have`);

let colorbad = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(`Specify a color | Red [1.5x] Black [2x] Green [15x]`);


    if (!colour)  return message.channel.send(colorbad);
    colour = colour.toLowerCase()
    if (!money) return message.channel.send(moneyhelp); 
    if (money > moneydb) return message.channel.send(moneymore);
    
    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(colorbad);
    
    
    
    if (random == 0 && colour == 2) { // Green
        money *= 15
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed1 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You won ${money} pickles\n\nMultiplier: 15x`);
        message.channel.send(moneyEmbed1)
        console.log(`${message.author.tag} Won ${money} on green`)
    } else if (isOdd(random) && colour == 1) { // Red
        money = parseInt(money * 1.5)
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You won ${money} pickles\n\nMultiplier: 1.5x`);
        message.channel.send(moneyEmbed2)
    } else if (!isOdd(random) && colour == 0) { // Black
        money = parseInt(money * 2)
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You won ${money} pickles\n\nMultiplier: 2x`);
        message.channel.send(moneyEmbed3)
    } else { 
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed4 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You lost ${money} pickles\n\nMultiplier: 0x`);
        message.channel.send(moneyEmbed4)
    };
        
    }
     
    else if (command === 'pay') {
     let user = message.mentions.members.first() 

  let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

  let embed1 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`Mention someone to pay`);

  if (!user) {
      return message.channel.send(embed1)
  }
  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`Specify an amount to pay`);
  
  if (!args[1]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You can't pay someone negative money`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You don't have that much money`);

  if (member < args[1]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You have payed ${user.user.username} ${args[1]} pickles`);

  message.channel.send(embed5)
  db.add(`money_${message.guild.id}_${user.id}`, args[1])
  db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1]);
    }
    
    else if (command === 'sell') {
            let user = message.author;

    if(args[0] == 'nikes') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have Nikes to pickles`);

        let nikeses = db.fetch(`nikes_${message.guild.id}_${user.id}`)

        if (nikeses < 1) return message.channel.send(Embed2)
       
        db.fetch(`nikes_${message.guild.id}_${user.id}`)
        db.subtract(`nikes_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Sold Fresh Nikes For 600 pickles`);

        db.add(`money_${message.guild.id}_${user.id}`, 600)
        message.channel.send(Embed3)
    } else if(args[0] == 'car') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have a Car to sell`);

       let cars = db.fetch(`car_${message.guild.id}_${user.id}`)

        if (cars < 1) return message.channel.send(Embed2)
       
        db.fetch(`car_${message.guild.id}_${user.id}`)
        db.subtract(`car_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Sold a Car For 800 pickles`);

        db.add(`money_${message.guild.id}_${user.id}`, 800)
        message.channel.send(Embed3)
    } else if(args[0] == 'mansion') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You don't have a Mansion to sell`);

        let houses = db.fetch(`house_${message.guild.id}_${user.id}`)

        if (houses < 1) return message.channel.send(Embed2)
       
        db.fetch(`house_${message.guild.id}_${user.id}`)
        db.subtract(`house_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MesssageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Sold a Mansion For 1200 pickles`);

        db.add(`money_${message.guild.id}_${user.id}`, 1200)
        message.channel.send(Embed3)
    };
        
    }
    
    else if (command === 'monthly') {
        let user = message.author;
            let timeout = 2592000000
    let amount = 3000

    let monthly = db.fetch(`monthly_${message.author.id}`);

    if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
        let time = ms(timeout - (Date.now() - monthly));

        message.channel.send(`You already collected ur monthly reward, you can come back and collect it in **${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
    } else {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Daily`, message.author.displayAvatarURL)
    .setColor("GREEN")
    .setDescription(`**Monthly Reward**`)
    .addField(`Collected`, amount)

    message.channel.send(embed)
        
    db.add(`money_${message.guild.id}_${user.id}`, amount)
    db.set(`monthly_${message.author.id}_${user.id}`, Date.now())
        
    };
        
    }
    
    else if (command === 'say') {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have premission to do that!");
        const saywhat = args.join(" ")
        const text = new Discord.MessageEmbed()
        .addField('How to use', 'p!say text')
        if (saywhat < 1) return message.channel.send(text)
         message.delete();
    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name}`)
    .addField(`${message.author.username} Said:`, saywhat)
    message.channel.send(embed);
        
    }
    
    else if (command === 'roll') {
           const value = parseInt(args.join(" "));
        if (isNaN(value)) return message.channel.send("Not a valid number to roll")
        if (!isFinite(value)) return message.channel.send("Can not roll infinite")
        isFinite
        const roll = Math.floor(Math.random() * value) + 1;
        const embed = new Discord.MessageEmbed()
        .addField("The dice rolled", roll)
        .setColor(0x00A2E8)
        message.channel.send(embed)
        
    }
    
    else if (command === 'setgame') {
           if (message.author.id == (ownerid)) {
            var argresult = args.join(' ');
            client.user.setActivity(argresult);
            const embed = new Discord.MessageEmbed()
            .addField("Game Set To:", argresult)
            .setColor(0x00A2E8)
            message.channel.send(embed);
            console.log((color.blue`Bot game was set to: ${argresult}`))
        } else {
            message.reply("You do not have the permissions. Creator of the bot only. :x:");
            
        };
    
    }
    
   else if (command === 'setstatus') {
           if (message.author.id == (ownerid)) {
            var argresult = args.join(' ');
            client.user.setStatus(argresult);
            const embed = new Discord.MessageEmbed()
            .addField("Status Set To:", argresult)
            .setColor(0x00A2E8)
            message.channel.send(embed);
            console.log((color.red`Bot status was set to: ${argresult}`))
        } else {
            message.reply("You do not have the permissions. Creator of the bot only. :x:");
            
        };
     
      }
    
    else if (command === 'clear') {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have premission to do that!");
                const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number');
        }

        else if (amount < 1 || amount > 99) {
            return message.reply('you need to input a number between 1 and 90.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.log(err);
            message.channel.send('there was an error trying to clear messages in this channel');
            
       });
       
    }
    
    else if (command === 'love') {
let person = message.mentions.members.first(message, args[0]);
if(person.id === message.author.id) return message.channel.send("Can't mention yourself");

        const love = Math.round(Math.random() * 100);
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
        
        let loveEmbed = new Discord.MessageEmbed()
        .setTitle("Love percentage")
        .setDescription(`${message.author} loves ${person} this much: ${love}%\n\n${loveLevel}`)
        message.channel.send(loveEmbed)
        
    }
    
    else if (command === 'hug') {
          let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must ping a user');
             let pepe1 = new Discord.MessageEmbed()
    .setTitle(`You huged ${user.tag}`)
    .setColor("#00ff00")
    .setImage("https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif");

    let pepe2 = new Discord.MessageEmbed()
    .setTitle(`You huged ${user.tag}`)
    .setColor("#00ff00")
    .setImage("https://media.giphy.com/media/JUwliZWcyDmTQZ7m9L/giphy.gif");

    let pepe3 = new Discord.MessageEmbed()
    .setTitle(`You huged ${user.tag}`)
    .setColor("#00ff00")
    .setImage("https://tenor.com/view/anime-hug-hug-hugs-anime-girl-anime-girl-hug-gif-16787485");

    let pepe4 = new Discord.MessageEmbed()
    .setTitle(`You huged ${user.tag}`)
    .setColor("#00ff00")
    .setImage("https://media1.tenor.com/images/506aa95bbb0a71351bcaa753eaa2a45c/tenor.gif?itemid=7552075");

    let pepe5 = new Discord.MessageEmbed()
    .setTitle(`You huged ${user.tag}`)
    .setColor("#00ff00")
    .setImage("https://media.tenor.com/images/b6d0903e0d54e05bb993f2eb78b39778/tenor.gif");

    let pepe6 = new Discord.MessageEmbed()
    .setTitle(`You huged ${user.tag}`)
    .setColor("#00ff00")
    .setImage("https://thumbs.gfycat.com/BlueDecimalAardwolf-small.gif");

    let hugs = [pepe1, pepe2, pepe3, pepe4, pepe5, pepe6]

    let hug = Math.floor((Math.random() * hugs.length));

    message.channel.send(hugs[hug]);
        
   };
});

client.login(token);
