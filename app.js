var express = require('express');
var app = express();
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = 'dNIqjRizz4FokBqT/MaquXsb1qb+SCxlRNfJOjmK9yu91dSFpPWFDzDvZXWSR5I7pDEoI1F+v+VQktU+sLwoy8yCE4iX/8RswH2w6NcPO9MxmtlPocWqKfaoGjPFjIS/ehisf3bLKFlWQEpJdPkKLgdB04t89/1O/w1cDnyilFU='
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');

const domain = "www.umosstest.tk"
const sslport = 23023;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.post('/hook', function (req, res) {

    var eventObj = req.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;


    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);

    if (eventObj.message.text == 'buttons'){
        buttons(eventObj.replyToken, eventObj.message.text);
    }
    else if (eventObj.message.text == 'quick'){
        quickreply(eventObj.replyToken, eventObj.message.text);

    }
    else {
        reply(eventObj.replyToken, eventObj.message.text);
    }

    res.sendStatus(200);
});
function quickreply(replyToken, message) {
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken": replyToken,
                "messages":[
                    {
                        "type": "text", 
                        "text": "Select your favorite food category or send me your location!",
                        "quickReply": {
                          "items": [
                            {
                              "type": "action",
                              "imageUrl": "https://ifh.cc/g/Tj1uDj.jpg",
                              "action": {
                                "type": "message",
                                "label": "한식",
                                "text": "한식"
                              }
                            }
                            ,
                            {
                                "type": "action",
                                "imageUrl": "https://ifh.cc/g/Tj1uDj.jpg",
                                "action": {
                                  "type": "message",
                                  "label": "일식",
                                  "text": "일식"
                                }
                            },
                            {
                                "type": "action", 
                                "imageUrl": "https://ifh.cc/g/Tj1uDj.jpg",
                                "action": {
                                  "type": "message",
                                  "label": "중식",
                                  "text": "중식"
                                }
                            },
                            {
                              "type": "action",
                              "imageUrl": "https://ifh.cc/g/Tj1uDj.jpg",
                              "action": {
                                "type": "message",
                                "label": "양식",
                                "text": "양식"
                              }
                            },
                            {
                                "type": "action",
                                "imageUrl": "https://ifh.cc/g/Tj1uDj.jpg",
                                "action": {
                                  "type": "message",
                                  "label": "아시아",
                                  "text": "아시아"
                                }
                            },
                            {
                                "type": "action",
                                "imageUrl": "https://ifh.cc/g/Tj1uDj.jpg",
                                "action": {
                                  "type": "message",
                                  "label": "패스트푸드",
                                  "text": "패스트푸드"
                                }
                              },
                            {
                              "type": "action", 
                              "action": {
                                "type": "location",
                                "label": "Send location"
                              }
                           }
                        ]
                        }
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
}

function buttons(replyToken, message) {
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken": replyToken,
                "messages":[
                    // {
                    //     "type":"text",
                    //     "text":"Hello, user"
                    // },
                    {
                        "type": "template",
                        "altText": "This is a buttons template",
                        "template": {
                            "type": "buttons",
                            "thumbnailImageUrl": "https://ifh.cc/g/Tj1uDj.jpg",
                            "imageAspectRatio": "rectangle",
                            "imageSize": "cover",
                            "imageBackgroundColor": "#FFFFFF",
                            "title": "Menu",
                            "text": "Please select",
                            "defaultAction": {
                                // "type": "uri", 
                                // "label": "View detail",
                                // "uri": "http://example.com/page/123"
                            },
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "Buy",
                                    "data": "action=buy&itemid=123"
                                },
                                {
                                    "type": "postback",
                                    "label": "Add to cart",
                                    "data": "action=add&itemid=123"
                                },
                                {
                                    "type": "uri",
                                    "label": "View detail",
                                    "uri": "http://example.com/page/123"
                                }
                            ]
                        }
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
}

function reply(replyToken, message){
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":replyToken,
                "messages":[
                    {
                        "type":"text",
                        "text":"Hello, user"
                    },
                    {
                        "type":"text",
                        "text":"May I help you?"
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
}

try {
    const option = {
      ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
      key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };
  
    HTTPS.createServer(option, app).listen(sslport, () => {
      console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }
  
