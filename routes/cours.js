const router = require("express").Router()
const pool = require("../db")

router.get("/", async (req, res) => {
    try {
        const allCourses = await pool.query("select * from cours")
        res.json(allCourses.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const oneCours = await pool.query("select * from cours where cours_id = $1",[id])
        if (oneCours.length !== 0) {
            res.json(oneCours.rows[0])
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
        const {date,name,prof,classe} = req.body
        const oneCours = await pool.query("insert into cours (cours_date, cours_name, cours_prof, cours_class) values ($1, $2, $3, $4) returning *",[date,name,prof,classe])
        res.json(oneCours.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {date,name,prof,classe} = req.body
        const oneCours = await pool.query("update cours set cours_date = $2, cours_name = $3, cours_prof = $4, cours_prof = $5 where cours_id = $1 returning *", [id,date,name,prof,classe])
        if (oneCours.length !== 0) {
            res.json(oneCours.rows[0])
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
        const oneCours = await pool.query("delete from cours where cours_id = $1",[id])
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router