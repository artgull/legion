const Discord = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()
const bot = new Discord.Client({
    partials: ['MESSAGE', 'REACTION']
})

bot.on('voiceStateUpdate', async (oldState, newState) => {
    // Если инициатор события - бот, игнорируем, во избежание перезаходов
    if (newState.id === bot.user.id) return;
    // Если бот не в канале - прерываем дальнейшее выполнение
    if (!newState.guild.me.voice.channelID) return;
    // Если пользователь зашел в канал - прерываем
    if (!oldState.channelID) return;
    // Если бота нет в канале - прерываем
    if (oldState.channelID !== newState.guild.me.voice.channelID) return;
    // Определяем, вышел ли пользователь из канала. Если нет - прерываем
    if (newState.channelID) return;
    // Определяем значение гильдии, для удобности (и понятности)
    let guild = newState.guild;
    // Получаем объект канала
    let channel = guild.channels.resolve(oldState.channelID);
    // Если в канале есть кто-то кроме бота - прерываем
    if (channel.members.size > 1) return;
    // Выходим из канала и пишем сообщение
    await guild.me.voice.setChannel(null);
});

bot.on('ready', () => {
    new WOKCommands(bot, {
        commandsDir: 'commands',
        //featuresDir: 'features',
        
        // The name of the local file for your message text and translations
        // Omitting this will use the built-in message path
        //messagesPath: '',
        // If WOKCommands warning should be shown or not, default true
        showWarns: true,
        // How many seconds to keep error messages before deleting them
        // -1 means do not delete, defaults to -1
        del: -1,
        defaultLangauge: "russian",
        ignoreBots: true,
        dbOptions: {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
        testServers: '435499299137257493',
        
        disabledDefaultCommands: [
             'help',
             'command',
            // 'language',
            // 'prefix',
             'requiredrole'
        ]
    })
        .setDefaultPrefix('.')
        .setColor(0xff0000)
        .setBotOwner('218611183886794753')
        .setMongoPath(process.env.MONGO_URI)
})

bot.login(process.env.TOKEN)