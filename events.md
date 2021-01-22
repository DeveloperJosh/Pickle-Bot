# Events

## Making events

Make a events folder and put this in there

{% code title="ready.js" %}
```javascript
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = (client) => {

    client.setMaxListeners(100);
    console.log(`Connected to Discord Client as ${client.user.tag} [${client.user.id}].`)
    console.log(`Ready to serve on ${client.guilds.cache.size} servers, for ${client.users.cache.size} users.`)
    client.user.setActivity(`Your Text Here`, {
    type: "PLAYING",
    url: "https://www.twitch.tv/test"
  })
    
};
```
{% endcode %}



