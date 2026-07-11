// setup.. this is similar to when we use our default tags in html
const express = require("express")
//we have to use cors in order to host a front end and backend on the same device
var cors = require("cors")
// activate or tell this app variable to be an express server
const app = express()
app.use(cors())
const router = express.Router()

//making an api using routes
//Routes are used to handle browser requests. They look like URLs. The difference is that when a browser requests a route, it is dynamically handled by using a function.

//GET or a regular request when someone goes to http://localhost:3000/hello. When using a function in a route, we almost always have a parameter or handle a response and request.

router.get("/songs", function(req, res) {
    const songs = [
        {
            title: "We Found Love",
            artist: "Rhianna",
            popularity: 10,
            releaseDate: new Date(2011, 9, 22),
            genre: ["electro house"]
        },
        {
            title: "Happy",
            artist: "Pharrell Williams",
            popularity: 10,
            releaseDate: new Date(2013, 11, 21),
            genre: ["soul", "new soul"]
        }
    ];

 
    res.json(songs)
})

//all requests that usually use an api start with /api.. so the URL would be localhost:3000/apo/songs
app.use("/api", router)
app.listen(3000)