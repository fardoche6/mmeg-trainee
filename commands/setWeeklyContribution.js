module.exports = async (message, commandArgs, appSetting) => {

    const amount = parseFloat(commandArgs.replace(",", "."), 10) * 1000000;
    console.log(amount);
  
    return appSetting
        .findOne({ where: {id: 1} })
        .then(function(obj) {
            // update
            if(obj){
              console.log('setWeeklyContribution: Found one to update');
              obj.update({weeklyContribution: amount}, {where: {id: 1}});
            }
                
            // insert
            console.log('setWeeklyContribution: Nothing found, creating it!');
            appSetting.create({weeklyContribution: amount});            
        })
        .then(function() {
            return message.author.send(`New weekly contribution set at ${Intl.NumberFormat().format(amount)}.`);
    })
}

// const affectedRows = await appSetting.update({WeeklyContribution: amount});
    // do not find
    // const doExist = await appSetting.findOne({where: true});    
    // if (doExist) {
    //     console.log('found one to update something, amount:' + amount);
    //     appSetting.update({weeklyContribution: amount}, {where: {id: 1}});
    // } else {
    //     appSetting.create({weeklyContribution: amount});
    // }
    // return message.author.send(`New weekly contribution set at ${amount}.`);