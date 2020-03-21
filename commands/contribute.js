module.exports = async (message, PlayerAccount, appSetting, commandArgs) => {
    // ########################## CONTRIBUTE ####################3
    
    var weeklyContributionAmount;
    console.log('findOne');
    const weeklyContribution = await appSetting.findOne({where: true});
    if(weeklyContribution) {
        console.log('Found a weekly contribution');
        weeklyContributionAmount = parseFloat(weeklyContribution.get('weeklyContribution'), 10);
    } else {
        // ALEX: we should send message to officer channel: the weeklyContributionAmount reset. 
        // put an amount by default.
        console.log('Didnt Find a weekly contribution. set to Zero');
        weeklyContributionAmount = 0;
    } 

    // verify if the person put 1,5 (they want decimal with point)
    const amount = parseFloat(commandArgs.replace(",", "."), 10) * 1000000;
    const username = message.author.username;
    var messageEmbed;
    // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
    const doExist = await PlayerAccount.findOne({ where: { username: username } });        
    if (doExist) {
        // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
        const actualBalance = parseFloat(doExist.get('balance'), 10); // parsing bug
        const newBalance = actualBalance + amount;
        const affectedRows = await PlayerAccount.update({ balance: newBalance }, { where: { username: username } });
        if (affectedRows > 0) {
            // nice to have: if you contribute the week event, you get a trophy image)
            if (newBalance>= weeklyContributionAmount) {
            messageEmbed = {
                title: 'Contribution Added',
                description: 'Achievement succeeded!',
                thumbnail: {
                    url: 'https://image.freepik.com/vecteurs-libre/trophee_53876-25485.jpg',
                },
                fields: [
                    {
                        name: 'Amount',
                        value: Intl.NumberFormat().format(amount),
                        inline: true
                    },                
                    {
                        name: 'Your Balance',
                        value: Intl.NumberFormat().format(newBalance),
                        inline: true
                    },
                    {
                        name: 'Weekly Contribution',
                        value: Intl.NumberFormat().format(weeklyContributionAmount),
                        inline: true
                    }
                ]
            };
        } else {
            messageEmbed = {
                title: 'Contribution Added',
                description: 'Achievement in progress, keep it up!',
                fields: [
                    {
                        name: 'Amount',
                        value: Intl.NumberFormat().format(amount),
                        inline: true
                    },                
                    {
                        name: 'Your Balance',
                        value: Intl.NumberFormat().format(newBalance),
                        inline: true
                    },
                    {
                        name: 'Weekly Contribution',
                        value: Intl.NumberFormat().format(weeklyContributionAmount),
                        inline: true
                    }
                ]
            };
        }
        return message.author.send({ embed: messageEmbed });
      }
        } else {
        // If not exist: create the new user with the new balance.
        // try {
            console.log('Create the Player with value');
            messageEmbed = {
                  title: 'Contribution Added',
                  description: 'Achievement in progress, keep it up!',
                  fields: [
                    {
                        name: 'Amount',
                        value: Intl.NumberFormat().format(amount),
                        inline: true
                    },                
                    {
                        name: 'Your Balance',
                        value: Intl.NumberFormat().format(amount),
                        inline: true
                    },
                    {
                        name: 'Weekly Contribution',
                        value: Intl.NumberFormat().format(weeklyContributionAmount),
                        inline: true
                    }
                ]
              };   
            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
            await PlayerAccount.create({
                balance: amount,
                username: username
            }).then(t => {message.author.send({ embed: messageEmbed })
            });
        // } catch (e) {
        //     if (e.name === 'SequelizeUniqueConstraintError') {
        //         return message.reply('That user already exists.');
        //     }
        //     return message.reply('Something went wrong with adding a user with contribution.');
        // }
    }
}