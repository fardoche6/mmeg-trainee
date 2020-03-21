module.exports = async (message, PlayerAccount, appSetting) => {

    var weeklyContributionAmount;
    const weeklyContribution = await appSetting.findOne({where: true});
    if(weeklyContribution) {
        weeklyContributionAmount = parseFloat(weeklyContribution.get('weeklyContribution'), 10);

        // every player, substract the contribution.
        // const counter = 0;
        const list = await PlayerAccount.findAll();
        if(list){
            list.forEach(obj => {
                //
                const newBalance = obj.balance - weeklyContributionAmount;
                console.log(newBalance);
                PlayerAccount.update({ balance: newBalance }, { where: { username: obj.username } });
                // counter++;
            });
            message.author.send(`member's accounts changed!`);

        } else {
            message.author.send('Erreur: table PlayerAccount empty; You need to use the command: !c 1');
        }
    }
}