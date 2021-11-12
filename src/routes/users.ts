import { Router } from "express"
// import * as fetch from "node-fetch"
export const router = Router()

import users from "../users.json" 
import { userInterface } from "../modules/class"

router.get("/", async (req, res) => {
    res.json(users)
})

router.post("/", (req, res) => {
    if(req.body.nick && req.body.time) {
        const id:number = users.length
        let newUser:userInterface = {
            id:id,
            nick: req.body.nick,
            time: req.body.time
        }
        users.push(newUser)
        res.status(200).send(users)
    }
    else res.status(400).send( new Error("Error to edit data") )
})



