# Setting Up Commando

## Getting Super Powers

How Mr.Commando's Index.js file looks

{% code title="Index.js" %}
```javascript
const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const DBL = require("dblapi.js");
const path = require('path');
const fs = require('fs');
require('dotenv').config();
Structures.extend('Guild', Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});

const client = new CommandoClient({
    commandPrefix: process.env.PREFIX,
    unknownCommandResponse: false,
    owner: 'your id here',
    invite: 'your support server here',
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
    { id: 'fun', name: 'Fun' },
    { id: 'mod', name: 'Moderation' },
    { id: 'music', name: 'Music' },
    { id: 'util', name: 'Utility' },
    { id: 'other', name: 'Other' },
    
    ])

    .registerCommandsIn(path.join(__dirname, 'commands'));

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});

const dbl = new DBL(process.env.DBL, client);

dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
});

client.login(process.env.TOKEN);
```
{% endcode %}

The .env file use this to put your tokens and the prefix

{% code title=".env" %}
```javascript
TOKEN=
PREFIX=?
DBL=
```
{% endcode %}

The config.json file use this for your apt tokens

{% code title="config.json" %}
```javascript
{
    "YoutubeAPI": "",
    "top": "",
    "newsAPI": ""
}
```
{% endcode %}

