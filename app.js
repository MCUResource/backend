// setup.. this is similar to when we use our default tags in html
const express = require("express")
const Song = require("./models/song")
//we have to use cors in order to host a front end and backend on the same device
var cors = require("cors")
// const bodyParser = require("body-parser")
const jwt = require("jwt-simple")
const User = require("./models/users")
// activate or tell this app variable to be an express server
const app = express()
app.use(cors())

app.use(express.json())

const router = express.Router()
const secret = "supersecret"

//creating a new user
router.post("/user", async(req,res) =>{
    if(!req.body.username || !req.body.password){
        res.status(400).json({error: "Missing username or password"})
    }

    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })
    try{
        await newUser.save()
        console.log(newUser)
        res.sendStatus(201) //created
    }
    catch(err){
        res.status(400).send(err)
    }
})

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
    try{
        await Song.deleteOne({_id: req.params.id})
        res.sendStatus(204)
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
