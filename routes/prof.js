const router = require("express").Router()
const pool = require("../db")
const jwt = require("jsonwebtoken")
//const auth = require("../utils/auth")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
require("dotenv").config()

router.get("/", async (req, res) => {
    try {
        const allProfs = await pool.query("select * from prof")
        res.json(allProfs.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/auth/", async (req,res) => {
    try {
        const jwtToken = req.header("token")
        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        res.json({prof_id:payload.prof,prof_mail:payload.mail})
    } catch (err) {
        console.error(err.message)
    }
})

router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const oneProf = await pool.query("select * from prof where prof_id = $1",[id])
        if (oneProf.length !== 0) {
            res.json(oneProf.rows[0])
        }
        else {
            res.send("Error").status(404)
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/eleve/:id", async (req, res) => {
    try {
        const {id} = req.params
        const allResults = await pool.query("select * from eleve where eleve_name like %$1%",[id])
        res.json(allResults.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/", async (req, res) => {
    try {
        const {name,password,mail} = req.body
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)
        const oneProf = await pool.query("insert into prof (prof_name, prof_password, prof_mail) values ($1, $2, $3) returning *",[name,bcryptPassword,mail])
        if (oneProf.rows.length === 0) {
            return res.status(403).send("Not Authorized")
        }
        else {
            res.status(200).send("Granted")
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {name,mail,password} = req.body
        const oneProf = await pool.query("update prof set prof_name = $2, prof_mail = $3 where prof_id = $1 returning *", [id,name,mail])
        if (oneProf.length !== 0) {
            res.json(oneProf.rows[0])
        }
        else {
            res.send("Error").status("404")
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const oneProf = await pool.query("delete from prof where prof_id = $1",[id])
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/connect", async (req,res) => {
    try {
        const {mail, password} = req.body
        const newProf = await pool.query("SELECT * FROM prof WHERE prof_mail = $1",[mail])
        if (newProf.rows.length !== 0) {
            const validPassword = await bcrypt.compare(password,newProf.rows[0].prof_password)
            if (validPassword) {
                const token = jwtGenerator(newProf.rows[0].prof_id,newProf.rows[0].prof_mail)
                res.json({rows:newProf.rows,token})
            }
            else {
                return res.status(403).send({rows:[]})
            }
        }
        else {
            return res.status(403).send("Not Authorized")
        }
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router