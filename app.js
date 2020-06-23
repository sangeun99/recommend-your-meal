var express = require('express');
var app = express();
const KAKAOKEY = '6bf1af821e72e1795ed820a6fa553448';
const request = require('request');
const KAKAOURL = 'https://dapi.kakao.com/v2/local/search/keyword.json'
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = 'dNIqjRizz4FokBqT/MaquXsb1qb+SCxlRNfJOjmK9yu91dSFpPWFDzDvZXWSR5I7pDEoI1F+v+VQktU+sLwoy8yCE4iX/8RswH2w6NcPO9MxmtlPocWqKfaoGjPFjIS/ehisf3bLKFlWQEpJdPkKLgdB04t89/1O/w1cDnyilFU='
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');

const domain = "www.umosstest.tk"
const sslport = 23023;
const bodyParser = require('body-parser');
var mylocation = { // 기본주소
    "address": '대한민국 경기도 용인시 기흥구 서천동 443',
    "latitude":  37.24652623601692,
    "longitude": 127.07758311277773
};

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

    if (eventObj.message.type == 'location'){
        mylocation = message;
    }

    else if (eventObj.message.text == '내위치'){
        quickreply(eventObj.replyToken, eventObj.message.text);
    }

    else {
        findlocation(eventObj.replyToken, eventObj.message.text);
    }

    res.sendStatus(200);
});

function findlocation(replyToken, keyword){

    var options = {
        url: KAKAOURL,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `KakaoAK ${KAKAOKEY}`
        },
        form : {
            'query' : keyword,
            'x' : mylocation.latitude,
            'y': mylocation.longitude,
            'size' : 1
        },
        json : true
    };

    request.get(options, function(error,response,body){
        if(!error && response.statusCode == 200) {
            console.log(body.documents[0]);
            replyresult(replyToken, body.documents[0]);
        }
    });
}

function replyresult(replyToken, result) {
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
                        "type": "location",
                        "title": result.place_name,
                        "address": result.road_address_name,
                        "latitude":  result.y,
                        "longitude": result.x
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
}

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
                        "text": "You can send your location!",
                        "quickReply": {
                          "items": [                            
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
