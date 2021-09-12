const cheerio = require("cheerio")
const request = require("request")
const axios = require("axios")
const express = require("express")
const app = express()

app.use(express.json())

let userData = {}

async function getInstagramData(user) {

     await request(`https://www.anonigviewer.com/profile.php?u=${user}`, (err, res, html) => {
        if (!err && res.statusCode == 200) {
            const $ = cheerio.load(html)


            const userName = $(".user-name").text().replace(/\s\s+/g, "")
            const userImage = $(".user-img").attr("src")
            const userPosts = $(".container > div:first-child > div:last-child div:nth-of-type(1) span:first-child").text().replace(/\s\s+/g, "")
            const userFollowers = $(".container > div:first-child > div:last-child div:nth-of-type(2) span:first-child").text().replace(/\s\s+/g, "")
            const userFollowing = $(".container > div:first-child > div:last-child div:nth-of-type(3) span:first-child").text().replace(/\s\s+/g, "")

            userData = { userName, userImage, userPosts, userFollowers, userFollowing }


        }
    });

}

app.get("/api/:user", async (req,res) => {

    await getInstagramData(req.params.user);
    setTimeout(() => {
        res.send(userData)
    }, 10000)

})



app.listen(4000)
