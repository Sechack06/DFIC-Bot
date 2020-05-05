const Discord = require("discord.js")
const client = new Discord.Client()
const mention = /<@(!|&)\d+>/g

let count = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (message) => {
    let server = message.guild
    let mentiontext = message.content.match(mention)
    let mentioncount = 0
    if(mentiontext === null){
    }else{
        do{
            mentioncount++
        }while(mentiontext[mentioncount])
        if(mentioncount >= (5 - 1)){
            message.channel.send("멘션테러")
        }
    }
    if(message.author.id != "706431855104360468"){
        let user = message.author
        server.members.cache.forEach((member) => {
            if(message.author.id === "706431855104360468"){
                return
            }else if(member.id === user.id){
                let i = 0
                do{
                    if(!count[i]){
                        if(message.content.length >= 500){
                            count.push({id: user.id, msgcount: 1, content: message.content, samemsgcount: 1, lagmsgcount: 1})
                            return
                        }else{
                            count.push({id: user.id, msgcount: 1, content: message.content, samemsgcount: 1, lagmsgcount: 0})
                            return
                        }
                    }else if(count[i].id === user.id){
                        if(count[i].content === message.content){
                            count[i].msgcount++
                            count[i].samemsgcount++
                            if(count[i].msgcount >= 7){
                                message.reply("도배")
                            }if(count[i].samemsgcount >= 5){
                                message.reply("도배")
                            }else if(message.content.length >= 500){
                                count[i].lagmsgcount++
                            }if(count[i].lagmsgcount >= 3){
                                message.reply("도배")
                            }
                        }else{
                            if(count[i].msgcount >= 7){
                                message.reply("도배")
                            }else if(message.content.length >= 500){
                                count[i].lagmsgcount++
                                count[i].content = message.content
                                count[i].msgcount++
                                count[i].samemsgcount = 1
                            }if(count[i].lagmsgcount >= 3){
                                message.reply("도배")
                            }else{
                                count[i].content = message.content
                                count[i].msgcount++
                                count[i].samemsgcount = 1
                            }
                        }
                        return
                    }else{
                        if(message.content.length >= 700){
                            count.push({id: user.id, msgcount: 1, content: message.content, samemsgcount: 1, lagmsgcount: 1})
                        }else{
                            count.push({id: user.id, msgcount: 1, content: message.content, samemsgcount: 1, lagmsgcount: 0})
                        }
                    }
                    i++
                }while(count[i])
            }
        })
    }
})

setInterval(() => {count = []}, 10000)

const token = process.env.token

client.login(token)