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

//Grab a single song in the database
router.get("/songs/:id", async (req,res) =>{
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch{
        res.status(400).send(err)
    }
})

//update is to update an existing record/resource/database entry.. it uses a PUT request
router.put("/songs/:id", async(req,res) =>{
    //first we need to find and update the song the front end wants us to udpate.
    //to do this we need to request the id of the song from request
    //and then find it in the database and update it.
    try{
        const song = req.body
        await Song.updateOne({_id: req.params.id},song)
        console.log(song)
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.delete("/songs/:id", async(req,res) => {
    //methos or function in mongoose/mongo to delete a single instance of a song or object
   try{
    await Song.deleteOne({_id: req.params.id})
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
