const Discord = require("discord.js")
const client = new Discord.Client()
const mention = /<@\d+>/g

let count = []

client.on('ready', () => {
  console.log("ready")
})

function givemute(server, member){
    server.roles.cache.forEach((role) => {
        if(role.name === "mute"){
            member.edit({roles: null}).then(() => {
                member.roles.add(role)
            })
        }
    })
}

client.on('message', (message) => {
    if(message.author.bot){
        return
    }if(message.channel.type == 'dm'){
        return
    }if(message.channel.name === "반성의-방"){
        return
    }

    let server = message.guild
    let mentiontext = message.content.match(mention)
    let mentioncount = 0
    let user = message.author

    if(message.author.id != "706431855104360468"){
        server.members.cache.forEach((member) => {
            if(message.author.id === "706431855104360468"){
                return
            }else if(member.id === user.id){
                if(mentiontext === null){
                }else{
                    while(mentiontext[mentioncount]){
                        mentioncount++
                    }
                    if(mentioncount >= (5 - 1)){
                        if(!member.manageable){
                            return
                        }else{
                            givemute(server, member)
                            member.send("당신은 DFIC에서 멘션테러를 했으므로 mute가 되었습니다. 이의 있으시면 관리자에게 문의하세요.")
                        }
                    }
                }
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
                                if(!member.manageable){
                                    return
                                }else{
                                    givemute(server, member)
                                    member.send("당신은 DFIC에서 도배를 했으므로 mute가 되었습니다. 이의 있으시면 관리자에게 문의하세요.")
                                }
                            }if(count[i].samemsgcount >= 5){
                                if(!member.manageable){
                                    return
                                }else{
                                    givemute(server, member)
                                    member.send("당신은 DFIC에서 도배를 했으므로 mute가 되었습니다. 이의 있으시면 관리자에게 문의하세요.")
                                }
                            }else if(message.content.length >= 500){
                                count[i].lagmsgcount++
                            }if(count[i].lagmsgcount >= 3){
                                if(!member.manageable){
                                    return
                                }else{
                                    givemute(server, member)
                                    member.send("당신은 DFIC에서 도배를 했으므로 mute가 되었습니다. 이의 있으시면 관리자에게 문의하세요.")
                                }
                            }
                        }else{
                            if(count[i].msgcount >= 7){
                                if(!member.manageable){
                                    return
                                }else{
                                    givemute(server, member)
                                    member.send("당신은 DFIC에서 도배를 했으므로 mute가 되었습니다. 이의 있으시면 관리자에게 문의하세요.")
                                }
                            }else if(message.content.length >= 500){
                                count[i].lagmsgcount++
                                count[i].content = message.content
                                count[i].msgcount++
                                count[i].samemsgcount = 1
                            }if(count[i].lagmsgcount >= 3){
                                if(!member.manageable){
                                    return
                                }else{
                                    givemute(server, member)
                                    member.send("당신은 DFIC에서 도배를 했으므로 mute가 되었습니다. 이의 있으시면 관리자에게 문의하세요.")
                                }
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