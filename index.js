const cheerio = require("cheerio")
const request = require("request")
const axios = require("axios")

async function getInstagramData(users) {

    for(user of users) {

    await request(`https://www.anonigviewer.com/profile.php?u=${user}`, (err, res, html) => {
        if(!err && res.statusCode == 200) {
            const $ = cheerio.load(html);

            let userInfo = {}

            const userName = $(".user-name").text().replace(/\s\s+/g, "");
            const userImage = $(".user-img").attr("src");
            const userPosts = $(".container > div:first-child > div:last-child div:nth-of-type(1) span:first-child").text().replace(/\s\s+/g, "");
            const userFollowers = $(".container > div:first-child > div:last-child div:nth-of-type(2) span:first-child").text().replace(/\s\s+/g, "");
            const userFollowing = $(".container > div:first-child > div:last-child div:nth-of-type(3) span:first-child").text().replace(/\s\s+/g, "");

            userInfo = {userName, userImage, userPosts, userFollowers, userFollowing}

            axios.post("http://localhost:3000/data", userInfo);

            
        }
    });

}

}

const users = ["therock", "fighterdesigner"]
getInstagramData(users);
