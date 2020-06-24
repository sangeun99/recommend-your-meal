var express = require('express');
var app = express();
const request = require('request');
const KAKAOURL = 'https://dapi.kakao.com/v2/local/search/keyword.json'
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const WEATHERURL = 'https://api.openweathermap.org/data/2.5/weather'
const TOKEN = 'tdMyZeVtg7OY2v5C9rRC67mxNbOh7SFCxA9dor29QFOh2bmaVDlYRTKMAv0sojmmyQXY4eYzHZKoME5LraY/TPidg+GjhBWw1gYK9gitMV13N21Bw1h0k48pJwfdz6+r4LVrrZm37ggW8kSW6PWW1wdB04t89/1O/w1cDnyilFU='
const KAKAOKEY = '6bf1af821e72e1795ed820a6fa553448';
const WEATHERKEY = '3250bfdaf394e55292242e42b0c32eb9';
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

var c_food = new Array( '냉면', '콩국수', '모밀', '초밥', '샌드위치', '스테이크');
var h_food = new Array( '마라탕', '칼국수', '짬뽕', '닭볶음탕', '찌개' );
var r_food = new Array( '파전', '보쌈', '짬뽕', '떡볶이', '찌개' );

app.use(bodyParser.json());
app.post('/hook', function (req, res) {

    var eventObj = req.body.events[0];
    var message = eventObj.message;

    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);

    if (eventObj.message.type == 'location'){
        mylocation = message;
    }

    // else if (! isNaN(eventObj.message.text)){ // 숫자일때
    // }

    else if (eventObj.message.text == '내위치') {
        quickreply(eventObj.replyToken, eventObj.message.text);
    }
    else if (eventObj.message.text == '날씨추천') {
        getweather(eventObj.replyToken);
    }

    res.sendStatus(200);
});

function getweather(replyToken){
    request.get({
        url: WEATHERURL+'?lat='+mylocation.latitude+'&lon='+mylocation.longitude+'&appid='+WEATHERKEY+'&units=metric',
        json : true
    }, (error, response, body) => {
        console.log(body);
        var mainweather = body.weather[0].main;
        var celcius = parseInt(body.main.temp);

        if (mainweather == 'rain'){
            randomfood = r_food[Math.floor(Math.random() * r_food.length)];
            explain = '오늘은 비가 옵니다. 오늘의 추천메뉴는 ' + randomfood + '입니다.';
        }
        else if (celcius >= 0){
            randomfood = c_food[Math.floor(Math.random() * c_food.length)];
            explain = '오늘은 날씨가 덥습니다. 오늘의 추천메뉴는 ' + randomfood + '입니다.';
        }
        else if (celcius < 0){
            randomfood = h_food[Math.floor(Math.random() * h_food.length)];
            explain = '오늘은 날씨가 춥습니다. 오늘의 추천메뉴는 ' + randomfood + '입니다.';
        }
        findlocation(replyToken, randomfood, explain);
    });
}

function findlocation(replyToken, keyword, explain){

    var options = {
        url: KAKAOURL,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `KakaoAK ${KAKAOKEY}`
        },
        form : {
            'query' : keyword,
            'category_group_code' : 'FD6',
            'x' : mylocation.longitude,
            'y' : mylocation.latitude,
            'radius' : 20000,
            'size' : 1
        },
        json : true
    };

    request.get(options, function(error,response,body){
        if(!error && response.statusCode == 200) {
            console.log(body);
            if (body.documents[0]){
                replyresult(replyToken, body.documents[0], explain);
            }
        }
    });
}

function replyresult(replyToken, result, explain) {
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
                        "type" : "text",
                        "text" : explain
                    },
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
                        "text": "You can select your location!",
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
