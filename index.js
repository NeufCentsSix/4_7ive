const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = "=";

client.on('ready', function () {
    client.user.setStatus("dnd");
    client.user.setPresence({
      game: {
        name: "Prefixe \"=\" | 4 7ife Bot",
        type: "STREAMING",
        url: "https://www.twitch.tv/needles.tv"
      }
    });
  });

  client.on('ready', () => {
    console.log('Bot online !');
  });

  client.on("message", function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLowerCase() === prefix + "help"){
let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTitle("**__Page D'Aide Moderation :__**")
        .setColor("#347eff")
        .addBlankField()
        .addField("**__MUTE__**", "__`Permets de mute une personnes ...`__", true)
        .addField("**__CLEAR__**", "__`Permet d'effacer des messages entre 1 et 99 ...`__")
        .addField("**__UNMUTE__**", "__`Permet de unmute/demute une personne mute .`__")
        .addField("**__EMBED__**", "__`Permet d'ecrire en embed . Les messages sont envoyés avec le bot .`__")
        .addField("**__MP__**", "__`Permet de mp toutes les personnes présentes sur le serveur.`__")
        .addField("**__WARN__**", "__`Permet de warn (avertir) une personne`__")
        .addField("**__BAN__**", "__`Permet de ban une personne`__")
        .addField("**__KICK__**", "__`Permet de kick une personne .`__")
        .addBlankField()
        .setFooter("Ruthless | RP PS3")
    message.channel.send(embed)
}
});

  //--------------------------------------------------------------------------------------------------//


  client.on('ready', () => {
    console.log('Clear + Mute prêt a l\'emploi !');
  });
//Clear code :
  client.on('message', function (message) {
      if (!message.guild) return
      let args = message.content.trim().split(/ +/g)
   
      if (args[0].toLowerCase() === prefix + "clear") {
          message.delete()
          if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**Vous n'avez pas la permission d'utiliser cette commande** ${message.author}`).then(message => {
              message.delete(3000)
         });

          let count = args[1]
          if (!count) return message.channel.send("**Veuillez indiquer un nombre de messages à supprimer**").then(message => {
              message.delete(3000)
         });

          if (isNaN(count)) return message.channel.send("**Veuillez indiquer un nombre valide**").then(message => {
              message.delete(3000)
         });

          if (count < 1 || count > 100) return message.channel.send("**Vos messages demandées depasse de mon max .**\n> __Choisissez un nombre entre **1 et 100* .__").then(message => {
              message.delete(3000)
         });

          message.channel.bulkDelete(parseInt(count) + 1)
      }


//Mute code :
      if (args[0].toLowerCase() === prefix + "mute") {
          if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**Vous n'avez pas la permission d'utiliser cette commande** ${message.author}`).then(message => {
              message.delete(3000)
         });

          let member = message.mentions.members.first()
          if (!member) return message.channel.send(`:pushpin: **Vous devez mentionné un/e utilisateur!** ${message.author}\n > __Sinon je ne peux pas mute la personne voulue .__`)
          if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send(`:pushpin: **Vous ne pouvez pas mute ce membre** ${message.author}`).then(message => {
              message.delete(3000)
         });

          if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send(`:pushpin: **Je ne peux pas mute ce membre** ${message.author}\n > __Ajoutez moi les permissions qu'il faut !__`).then(message => {
              message.delete(3000)
         });

          let muterole = message.guild.roles.find(role => role.name === 'Muted')
          if (muterole) {
              member.addRole(muterole)
              message.channel.send('**:mute: La personne mentionnez `( ' +member.tag + member + ')` a été mute**\n> __Il est mute pendant un temps indeterminée .__')
          }

          else {
              message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
                  message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                      channel.overwritePermissions(role, {
                          SEND_MESSAGES: false
                      })
                  })
                  member.addRole(role)
                  message.channel.send('**:mute: La personne mentionnez `( ' + member.tag + member.ID + ')` a été mute**\n > __Il est mute pendant un temps indeterminée .')
              })
          }
      }
  });

client.on('ready', () => {
    console.log('Unmute prêt a l\'emploi !');
  });

//Unmute code :
  client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLowerCase() === prefix + "unmute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**Veuillez spécifié un utilisateur valide ${message.author}\n> __Verifiez qu'il est bien sur le serveur .__`).then(message => {
            message.delete(3000)
       });

        let member = message.mentions.members.first()
        if (!member) return message.channel.send(`:pushpin: **__Vous devez mentionné un utilisateur!__** ${message.author}`)
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send(`:pushpin: **Vous ne pouvez pas unmute ce membre** ${message.author}`).then(message => {
            message.delete(3000)
       });

        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send(`:pushpin: **Je ne peux pas unmute ce membre** ${message.author}`).then(message => {
            message.delete(3000)
       });

        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.removeRole(muterole)
            message.channel.send('**:loud_sound: La personne mentionnez `( ' + member.tag + ')` a été unmute**\n > Il peux désormais **parler** . .__')
        }
    }
});

//MPSpam - MPALL Code :
client.on('ready', () => {
    console.log('Mpall prêt a l\'emploi !');
  });

client.on('message', message => {
    let id = '598563097359286275'; // Remplir par ton ID . Une seule ID peut etre rentré .
    let cmd = '=mp'; // Le nom de la commande . Ajoutez bien le prefixe avec "prefixe + mp" par exemple .
    let number = 1; // Le nombre de message a envoyé en mp .
    let msg = 'Test 1'; // Le message envoyé .
    
    if(message.author.id === id) {
        if(message.content === cmd) {
            
            message.guild.members.forEach(m => {
                if(m.id !== client.id && m.id !== id) {
                    m.createDM().then(channel => {
                        for (let i = 1; i <= number; i++) {
                            channel.send(msg)
                        }
                    }).catch(console.error);
                }
            })
            
        }
    }
});

client.on('ready', () => {
    console.log('Embed prêt a l\'emploi !');
  });

client.on('message', message => {
    let Command = prefix + 'embed ';
    if (message.content.startsWith(Command)) {
        let contenu = message.content.substring(Command.length);
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM") // La couleur que vous voulez en hexagonal .
        .setTitle(contenu)
        message.channel.sendMessage(embed).catch(console.error);
        message.delete().catch(console.error);
    }
  });

  client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
  
    if (args[0].toLowerCase() === prefix + 'kick') {
      message.delete(3000)
      if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(` \`Vous n'avez pas la permission d'utiliser cette commande!\`${message.author}`).then(message => {
        message.delete(3000)
      });
      let member = message.mentions.members.first()
      if (!member) return message.channel.send(`\`Vous devez mentionné un/e utilisateur!\` ${message.author}`).then(message => {
        message.delete(3000)
      });
      if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("`Vous ne pouvez pas kick cet utilisateur`:x:").then(message => {
        message.delete(3000)
      });
      if (!member.kickable) return message.channel.send(`\`Je ne peux pas exclure cet utilisateur\`${message.author}`).then(message => {
        message.delete(3000)
      });
      member.kick()
      message.channel.send(member.user.username + '`a été exclu`:white_check_mark:`').then(message => {
        message.delete(3000)
      });
    }
  });

  client.on('message', message => {

    if (!message.guild) return;
  
    if (message.content.startsWith('=ban')) {
  
      const user = message.mentions.users.first();
  
      if (user) {
  
        const member = message.guild.member(user);
  
        if (member) {
          member.ban({
            reason: 'Danger pour le server!',
          }).then(() => {
  
            message.reply(`\`Banni avec succer ${user.tag}\``);
          }).catch(err => {
  
            message.reply('`Je suis incapable de bannir le membre`');
  
            console.error(err);
          });
        } else {
  
          message.reply('`Cet utilisateur n\'est pas dans ce serveur!`');
        }
      } else {
  
        message.reply('`Vous n\'avez pas mentionné l\'utilisateur à ban!`');
      }
    }
  });

client.on("message", function (message) {
    let Command = prefix + 'warn';
        if (message.content.startsWith(Command)) {
            let contenu = message.content.substring(Command.length);

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**Vous n'avez pas la permission d'utiliser cette commande** ${message.author}`).then(message => {
            message.delete(3000)
       });
       let member = message.mentions.members.first()
       if (!member) return message.channel.send(`:pushpin: **Vous devez mentionné un/e utilisateur!** ${message.author}\n > __Sinon je ne peux pas warn la personne voulue .__`)
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send(`:pushpin: **Vous ne pouvez pas warn ce membre** ${message.author}`).then(message => {
           message.delete(3000)
      });
      if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send(`:pushpin: **Je ne peux pas warn ce membre** ${message.author}\n > __Ajoutez moi les permissions qu'il faut !__`).then(message => {
        message.delete(3000)
   });
   message.channel.send('**:mute: La personne mentionnez `( ' + member + ')` a été warn pour :**' + contenu)
   message.delete().catch(console.error);
   }
});

client.login(proces.env.TOKEN);
