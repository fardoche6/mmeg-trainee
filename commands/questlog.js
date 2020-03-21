module.exports = async (message, GuildQuests) => {

    // equivalent to: SELECT name FROM tags;
    const log = await GuildQuests.findAll();
    message.author.send(`Name;Group;Value;BattleCommand;XP;GuildCoins;Soulstone;SoulstoneType;Crystals;Start;End;IsCompleted`);
    log.forEach(guildQuestObject => {
        message.author.send(`${guildQuestObject.name};${guildQuestObject.Group};${guildQuestObject.value};${guildQuestObject.battleCommand};${guildQuestObject.XP};${guildQuestObject.guildCoins};${guildQuestObject.soulstone};${guildQuestObject.soulstoneType};${guildQuestObject.crystalsUsed};${guildQuestObject.createdAt};${guildQuestObject.updatedAt};${guildQuestObject.isCompleted}`);
    });
    // const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
    // return message.author.send(`List of tags: ${tagString}`);
    return;
}