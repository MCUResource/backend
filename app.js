// setup.. this is similar to when we use our default tags in html
const express = require("express")
const Song = require("./models/song")
//we have to use cors in order to host a front end and backend on the same device
var cors = require("cors")
// activate or tell this app variable to be an express server
const app = express()
app.use(cors())

app.use(express.json())

const router = express.Router()

//grab all the songs in a database
router.get("/songs", async function(req, res) {
    let query = {}

    if(req.query.genre) {
        query = { genre: req.query.genre }
    }

    try {
        const songs = await Song.find(query)
        res.json(songs)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

router.post("/songs", async (req,res) =>{
    try{
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch(err){
        res.status(400).send(err)
    }
})


//all requests that usually use an api start with /api.. so the URL would be localhost:3000/apo/songs
app.use("/api", router)
app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});