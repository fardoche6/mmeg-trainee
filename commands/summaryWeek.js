module.exports = message => {
    const exampleEmbed = {
        title: 'Summary of the week',
        description: 'Feature in Construction... Feel free to make comment and give idea. Cheers!',
        // description: 'REFERENCEWEEK: Week in reference to compare, could be last week or at the beginning of a new method to see the progression. ' + 
        //                 'GLYPHSWON: The number of glyph you should get after a week if you have 100% participation in guild quests. ' +
        //                 'RAIDS: The number of raid you can do with the number of guild quests you have done. ' +
        //                 'CRYSTALS: The number of crystals that every member would have to spend weekly if we keep the same speed.',
        fields: [
            {
                name: 'TotalQuests',
                value: '119',
                inline: true
            },                
            {
                name: 'ReferenceWeek',
                value: '80',
                inline: true
            },
            {
                name: 'Progression(%)',
                value: '32%',
                inline: true
            },
            {
                name: 'GlyphsWon',
                value: '59,5 (1425)',
                inline: true
            },
            {
                name: 'ReferenceWeek',
                value: '43 (1250)',
                inline: true
            },
            {
                name: 'Progression(%)',
                value: '30%',
                inline: true
            },
            {
                name: 'Raids',
                value: '12.35',
                inline: true
            },
            {
                name: 'ReferenceWeek',
                value: '7.95',
                inline: true
            },
            {
                name: 'Progression(%)',
                value: '25%',
                inline: true
            },
            {
                name: 'Crystals',
                value: '2 500 000',
                inline: true
            },
            {
                name: 'ReferenceWeek',
                value: '1 400 000',
                inline: true
            },
            {
                name: 'Progression(%)',
                value: '32%',
                inline: true
            }
        ]
    };
    
    return message.author.send({ embed: exampleEmbed });
}