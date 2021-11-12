import express from "express"
import path from "path"
import { router } from "./routes/users"

const app = express()

const PORT:number | string = process.env.PORT || 3000 

app.set('views','./views')
app.set('view engine', 'ejs') 
app.set('json spaces', 2)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))
app.use("/css", express.static(path.join(__dirname + "/public/css")))
app.use("/js", express.static(path.join(__dirname + "/public/js")))
app.use("/img", express.static(path.join(__dirname + "/public/img")))

app.use("/api/users", router)

app.get("/", (req,res) => {
    res.render("index")
})

app.use((req, res, next) => {
    res.status(404).render("404")
})

app.listen(PORT, ()=>{
    console.log("ONLINE!\n in port "+ PORT )
})