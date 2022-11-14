const router = require("express").Router()
const pool = require("../db")

router.get("/", async (req, res) => {
    try {
        const allProfs = await pool.query("select * from prof")
        res.json(allProfs.rows)
    } catch (err) {
        console.log(err.message)
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
            res.send("Error").status("404")
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/", async (req, res) => {
    try {
        const {name,password} = req.body
        const oneProf = await pool.query("insert into prof (prof_name, prof_password) values ($1, $2) returning *",[name,password])
        res.json(oneProf.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {name,password} = req.body
        const oneProf = await pool.query("update prof set prof_name = $2 where prof_id = $1 returning *", [id,name])
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

module.exports = router