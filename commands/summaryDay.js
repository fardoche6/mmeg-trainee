module.exports = message => {
    const exampleEmbed = {
        title: 'Daily Summary (yesterday)',
        description: 'Feature in Construction... Feel free to make comment and give idea. Cheers!',
        // description: 'REFERENCEDAY: Day in reference to compare, could be a day last week or at the beginning of a new method to see the progression. ' + 
        //                 'GLYPHSWON: The number of glyph you should get if you have 100% participation in guild quests. ' +
        //                 'RAIDS: The number of raid you can do with the number of guild quests you have done. ' +
        //                 'CRYSTALS: The number of crystals that every member would have to spend daily at this speed.',
        fields: [
            {
                name: 'TotalQuests',
                value: '17',
                inline: true
            },                
            {
                name: 'ReferenceDay',
                value: '15',
                inline: true
            },
            {
                name: 'Progression(%)',
                value: '20%',
                inline: true
            },
            {
                name: 'GlyphsWon',
                value: '8,5 (425)',
                inline: true
            },
            {
                name: 'ReferenceDay',
                value: '5 (250)',
                inline: true
            },
            {
                name: 'Progression(%)',
                value: '30%',
                inline: true
            },
            {
                name: 'Raids',
                value: '1.35',
                inline: true
            },
            {
                name: 'ReferenceDay',
                value: '0.95',
                inline: true
            },
            {
                name: 'Progression(%)',
                value: '25%',
                inline: true
            },
            {
                name: 'Crystals',
                value: '500 000',
                inline: true
            },
            {
                name: 'ReferenceDay',
                value: '400 000',
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
  };