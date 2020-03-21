const Discord = require('discord.js');
const client = new Discord.Client();
const help = require("./commands/help");
const helpOfficer = require("./commands/helpOfficer");


const questlog = require("./commands/questlog");

// contribution system
const contribute = require("./commands/contribute");
const setWeeklyContribution = require("./commands/setWeeklyContribution");
const contributorList = require("./commands/contributorList");
const substractAllMembersContribution = require("./commands/substractAllMembersContribution");

// quest
const summaryDay = require("./commands/summaryDay");
const summaryWeek = require("./commands/summaryWeek");

// database
const Sequelize = require('sequelize');

// patch to ping server every 5min to not shutdown.
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 140000);


// init database
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

// create PlayerAccount Table
const PlayerAccount = sequelize.define('PlayerAccount', {
	username: {
		type: Sequelize.STRING,
		unique: true,
	},
	balance: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

// Create AppSetting table (used to keep information of the guild ex: minimum contribution required).
const AppSetting = sequelize.define('AppSetting', {
	weeklyContribution: {
		type: Sequelize.FLOAT,
        defaultValue: 3000000,
        allowNull: false
	}
});

const GuildQuests = sequelize.define('GuildQuests', {
	name: {
		type: Sequelize.STRING
		// unique: true,
    },
    Group: {
		type: Sequelize.STRING,
    },
    value: {
		type: Sequelize.INTEGER,
		defaultValue: 445,
		allowNull: false,
    },
	battleCommand: {
		type: Sequelize.INTEGER,
		defaultValue: 297,
		allowNull: false,
    },
    XP: {
		type: Sequelize.INTEGER,
		defaultValue: 100,
		allowNull: false,
    },
    guildCoins: {
		type: Sequelize.INTEGER,
		defaultValue: 15,
		allowNull: false,
    },
    soulstone: {
		type: Sequelize.INTEGER,
		defaultValue: 25,
		allowNull: false,
    },
    soulstoneType: {
		type: Sequelize.STRING,
		defaultValue: 'normal',
		allowNull: false,
    },
    crystalsUsed: {
		type: Sequelize.INTEGER,
		defaultValue: 1000000,
		allowNull: false,
    },
    isCompleted: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false,
    }    
});

async function addGuildQuest(guildQuestValue, msg) {
    console.log('addGuildQuest');
    try {
        return await GuildQuests.create({
           name: guildQuestValue.name,
           Group: guildQuestValue.Group,
           value: guildQuestValue.value,
           battleCommand: guildQuestValue.battleCommand,
           XP: guildQuestValue.XP,
           guildCoins: guildQuestValue.guildCoins,
           soulstone: guildQuestValue.soulstone,
           soulstoneType: guildQuestValue.soulstoneType,
           crystalsUsed: guildQuestValue.crystalsUsed,
           isCompleted: false
       });
   } catch (e) {
       return msg.reply('Something went wrong with adding a guild quest.');
   }
}

client.login(process.env.DISCORD_TOKEN);

client.once('ready', () => {
    console.log('Ready!');
    PlayerAccount.sync();
    // PlayerAccount.sync({ force: true });
    // GuildQuests.sync();
    GuildQuests.sync({ force: true });
    AppSetting.sync();
    // AppSetting.sync({ force: true });
});
 
client.on('message', (msg) => {                    // When a message is created
  
  // filtre que les commandes
  if (msg.author.bot) return;
  if (!msg.content.startsWith(process.env.PREFIX)) return;
  
  const input = msg.content.slice(process.env.PREFIX.length).split(' ');
  const command = input.shift().toLowerCase();
  const commandArgs = input.join(' ');
  
  if (command === 'help') {
        return help(msg);
  } else if (command === 'helpofficer') {
        return helpOfficer(msg);
  } else if(command === 'questlog'){
        return questlog(msg, GuildQuests);
  } else if(command === 'summaryday'){
      return summaryDay(msg);
  } else if(command === 'summaryweek'){
        return summaryWeek(msg);
  } else if (command === 'contribute' || command === 'c') {
        return contribute(msg, PlayerAccount, AppSetting, commandArgs);
  } else if(command === 'contributionlist'){
        return contributorList(msg, PlayerAccount);
  } else if(command === 'substractallmemberscontribution'){
        return substractAllMembersContribution(msg, PlayerAccount, AppSetting);
  } else if(command === 'setweeklycontribution'){
        return setWeeklyContribution(msg, commandArgs, AppSetting);
  } else if(command === 'questlog'){
        return questlog(msg, GuildQuests);
  } else {
        console.log('dans else');
        // ##############  ACTIVATE GUILD QUEST #######################        
        // init object with default value
        var guildQuestValue;
        // ##########   group 1  ########
        if(command.search('1') > 0) {
            guildQuestValue = {
                Group: '1General',
                value: 445,
                battleCommand: 8910,
                XP: 3000,
                guildCoins: 15,
                soulstone: 25,
                soulstoneType: 'water',
                crystalsUsed: 1000000,
                isCompleted: false
            };
        // ##########   group 2  ########
        } else if(command.search('2') > 0) {
            guildQuestValue = {
                Group: '1General',
                value: 1030,
                battleCommand: 12510,
                XP: 5190,
                guildCoins: 30,
                soulstone: 35,
                soulstoneType: 'water',
                crystalsUsed: 1500000,
                isCompleted: false
            };
        // ##########   group 3  ########
        } else if(command.search('3') > 0) {
            guildQuestValue = {
                Group: '1General',
                value: 1650,
                battleCommand: 16110,
                XP: 7440,
                guildCoins: 45,
                soulstone: 45,
                soulstoneType: 'water',
                crystalsUsed: 2000000,
                isCompleted: false
            };
        } else { return; }

        // almost have all the information, little tuning here.
        switch (command) {
            // summon rank 2 monsters (only)
            case 'cc1' || 'creaturecollector':
                guildQuestValue.name = 'Creature Collector1';
                guildQuestValue.value = 900;
                break;
            case 'cc2' || 'increasestrenth2':
                guildQuestValue.name = 'Creature Collector2';
                break;
            case 'cc3' || 'increasestrenth3':
                guildQuestValue.name = 'Creature Collector3';
                guildQuestValue.value = 1490;
                break;
            // sell glyph
            case 'g1' || 'glyphtrading1':
                guildQuestValue.name = 'Glyph Trading Festival1';
                guildQuestValue.value = 900;
                break;
            case 'g2' || 'glyphtrading2':
                guildQuestValue.name = 'Glyph Trading Festival2';
                break;
            case 'g3' || 'glyphtrading3':
                guildQuestValue.name = 'Glyph Trading Festival3';
                guildQuestValue.value = 1490;
                break; 
            // upgrade glyph
            case 'str1' || 'increasestrenth1':
                guildQuestValue.name = 'Increase your Strength1';
                guildQuestValue.value = 900;
                break;
            case 'str2' || 'increasestrenth2':
                guildQuestValue.name = 'Increase your Strength2';
                guildQuestValue.value = 1300;
                break;
            case 'str3' || 'increasestrenth3':
                guildQuestValue.name = 'Increase your Strength3';
                guildQuestValue.value = 1490;
                break; 
            // rank 2 --> 3
            case 't1' || 'trainer1':
                guildQuestValue.Group = '2Creature';
                guildQuestValue.name = 'Trainer Festival1';
                guildQuestValue.value = 93;
                guildQuestValue.soulstoneType = 'air';
                break;
            case 't2' || 'trainer2':
                guildQuestValue.Group = '2Creature';
                guildQuestValue.name = 'Trainer Festival2';
                guildQuestValue.value = 110;
                guildQuestValue.soulstoneType = 'air';
                break;
            case 't3' || 'trainer2':
                guildQuestValue.Group = '2Creature';
                guildQuestValue.name = 'Trainer Festival3';
                guildQuestValue.value = 130;
                guildQuestValue.soulstoneType = 'air';
                break;
            // summon any monsters
            case 'soul1' || 'soulstone1':
                guildQuestValue.Group = '3Collection';
                guildQuestValue.name = 'Soulstone1';
                guildQuestValue.value = 625;
                guildQuestValue.soulstoneType = 'fire';
                break;
            case 'soul2' || 'soulstone2':
                guildQuestValue.Group = '3Collection';
                guildQuestValue.name = 'Soulstone2';
                guildQuestValue.value = 1640;
                guildQuestValue.soulstoneType = 'fire';
                break;
            case 'soul3' || 'soulstone3':
                guildQuestValue.Group = '3Collection';
                guildQuestValue.name = 'Soulstone3';
                guildQuestValue.value = 3080;
                guildQuestValue.soulstoneType = 'fire';
                break;
            case 'sum1' || 'soulstone1':
                guildQuestValue.Group = '3Collection';
                guildQuestValue.name = 'Summon1';
                guildQuestValue.value = 150;
                guildQuestValue.soulstoneType = 'fire';
                break;
            case 'sum2' || 'soulstone2':
                guildQuestValue.Group = '3Collection';
                guildQuestValue.name = 'Summon2';
                guildQuestValue.value = 540;
                guildQuestValue.soulstoneType = 'fire';
                break;
            case 'sum3' || 'soulstone3':
                guildQuestValue.Group = '3Collection';
                guildQuestValue.name = 'Summon3';
                guildQuestValue.value = 630;
                guildQuestValue.soulstoneType = 'fire';
                break;     
            default:
                break;
        }
        
        console.log('Name: ' + guildQuestValue.name);
        // ADD GuildQuest with message
        addGuildQuest(guildQuestValue)
            .then(obj =>                
                // send message to specific channel
                // const test = msg.client.channels.cache.find(ch => ch.name === 'notifications')
                msg.client.channels.cache.find(ch => ch.name === 'notifications')
                .send(`everyone New ${obj.name} Quest available for donation! At least participate the minimum to get your free ${obj.soulstone} epic fragments! If you do not see the guild quest, please restart the application. Thank you!`)
            );
  }
});


// to create a welcome member
// client.on('guildMemberAdd', member => {
//     console.log('Client.on guildMemberAdd');
//     if (message.author.bot) return;
//     if (!message.content.startsWith(prefix)) return;

//     // Send the message to a designated channel on a server:
//     const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
//     // Do nothing if the channel wasn't found on this server
//     if (!channel) return;
//     // Send the message, mentioning the member
//     channel.send(`Welcome to the server, ${member}`);
//   });