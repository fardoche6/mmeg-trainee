module.exports = async (message, PlayerAccount) => {

    
    const list = await PlayerAccount.findAll();
    if(list){
        list.forEach(obj => {
            message.author.send(`${obj.username} = ${Intl.NumberFormat().format(obj.balance)};`);
        });
    } else {
        message.author.send('Erreur: table PlayerAccount empty; You need to use the command: !c 1');
    }
}