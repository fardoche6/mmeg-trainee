module.exports = message => {
  
    const messageEmbed = {
            title: 'Commands list',
            thumbnail: {
                url: 'https://cdn.glitch.com/c8584549-055f-4a01-921c-e5e35355a300%2Faccounter.jpg?v=1584766477375',
            },
            fields: [
                {
                    name: '**$contribute <amountM> or $c <amountM>**',
                    // name: '\u200b',   // null
                    value: 'ex: **$c 2** --> Contribute 2M crystals',
                    inline: false
                },                
                {
                    name: '(Soon) **$summaryDay**',
                    // name: '\u200b',   // null
                    value: '**In progress**, show the performance of guild quests done for a day',
                    inline: false
                },
                {
                    name: '(Soon) **$summaryWeek**',
                    value: '**In progress**, show the performance of guild quests done for a week',
                    inline: false
                }
            ]
        };
        // messageEmbed.color = 0xFFFFF;
        message.author.send({ embed: messageEmbed });
        // const user = message.mentions.users.first();
        // // message.channel.send(`
        // message.author.send(`The commands are:
        // $c 1    --> Contribution of 1 000 000 crystals.
        // $summaryday --> give a summary of the last full day (yesterday).
        // $summaryweek --> give a summary of the last week.
        //  `);
}