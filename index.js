import express from "express";
import { TwitterApi } from "twitter-api-v2";
import process from "process";
import pg from 'pg';
import https from 'https';

// consumer keys - api key
const appKey = process.env.TWITTER_API_KEY;
// consumer keys - api key secret
const appSecret = process.env.TWITTER_API_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

const client = new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
});
client.readWrite;
const app = express();

const tiktok = async (tiktokAmount, tiktokLink, hatenaLink) => {
    var text = "【期間限定】今なら誰でも" + tiktokAmount + "円ゲットできるよ\n招待URL: " + tiktokLink + "\nルールを守らないとお金がもらえないので必ず↓を見て登録してね"
        var random = Math.floor(Math.random() * (30));
        const emojis = [
            "😀",
            "😆",
            "🤣",
            "😉",
            "🥰",
            "😍",
            "🤩",
            "😘",
            "😚",
            "😋",
            "😝",
            "🤑",
            "🫣",
            "🤫",
            "🤔",
            "🫡",
            "😏",
            "🥳",
            "😎",
            "😲",
            "😮",
            "😳",
            "🥺",
            "🥹",
            "😻",
            "🙊",
            "💖",
            "❤️‍🔥",
            "💯",
            "🐶",
            "🐺",
            "🐱",
            "🐭",
            "🐹",
            "🐰",
            "🐸",
            "🐯",
            "🐨",
            "🐻",
            "🐷",
            "🐽",
            "🐮",
            "🐗",
            "🐵",
            "🐒",
            "🐴",
            "🐑",
            "🐘",
            "🐼",
            "🐧",
            "🐦",
            "🐤",
            "🐥",
            "🐣",
            "🐔",
        ]
        var random = emojis[Math.floor(Math.random()* emojis.length)];
        console.log(random)
        var hashTag = "\n#TikTokLite #ポイ活 #副業 #稼げる #TikTok";
        var link = "\n" + hatenaLink;
        var tweet = text + random + hashTag + link;
        console.log(tweet)
        client.v2.tweet(tweet); 
}

app.get("/tiktok4500", (req, res) => {
    try {
        tiktok(process.env.TIKTOK_AMOUNT, process.env.TIKTOK_URL, process.env.HATENA_URL);
    } catch (err) {
        console.log(err);
    }
    res.send('get');
});

const greet = async () => {
    var args = [
        20,
        30,
        40
    ]
    var age = args[Math.floor(Math.random() * args.length)];
    var random = Math.floor(Math.random() * 34) + 1;
    var requestUrl = "https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20220601?applicationId=" + process.env.RAKUTEN_APP_ID
        + "&age=" + age + "&sex=1&carrier=0&page=" + random + "&affiliateId=" + process.env.RAKUTEN_AFFILIATE_ID;
    console.log(requestUrl);
    await axios.get(requestUrl, {
    }).then(async (response) => {
        if (response.status !== 201) {
            var randomNo = Math.floor(Math.random() * (response.data.Items.length));
            var itemName = response.data.Items[randomNo].Item.itemName;
            var catchcopy = response.data.Items[randomNo].Item.catchcopy;
            var affiliateUrl = response.data.Items[randomNo].Item.affiliateUrl;
            console.log(itemName);
            console.log(catchcopy);
            console.log(affiliateUrl);
            var tweetText = itemName + catchcopy
            client.v2.tweet(tweetText.substring(0, 90) + " " + affiliateUrl + " #楽天ROOM #楽天 #楽天市場 #ad #PR");
            console.log("完了");

        }
    }).catch((error) => {
        console.log(error);
        return;
    });


};


app.get("/rakuten", (req, res) => {
    try {
        greet();
    } catch (err) {
        console.log(err);
    }
    res.send('get');
});



app.get("/", (req, res) => {
    try {
        console.log("ログ定期実行")
    } catch (err) {
        console.log(err);
    }
    res.send('get');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);