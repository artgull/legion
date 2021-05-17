module.exports = {
    name: 'играть',
    aliases: 'и',
    guildonly: true,
    // Invoked when the command is actually ran
    callback: ({client, message, args}) => {
        message.delete()
        const channel = client.channels.cache.get("690192044643188748");
        const voiceChannel = message.member.voice.channel;
        const voiceChannelID = message.member.voice.channelID;
        if(!voiceChannel) return message.reply("Необходимо находится в голосовом канале чтобы использовать команду.").then(msg => setTimeout(() => msg.delete(), 3000))
        
        channel.join().then(async connection => {
        console.log("Connected")
        await connection.play('https://open.spotify.com/track/5kz9d0Cxx7RK8PjRLlWnAt?si=e94955e533be416b')
        }).catch(e => { console.error(e); });
    }
}