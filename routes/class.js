const router = require("express").Router()
const pool = require("../db")

router.get("/", async (req, res) => {
    try {
        const allClasses = await pool.query("select * from class")
        res.json(allClasses.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const oneClass = await pool.query("select * from class where class_id = $1",[id])
        if (oneClass.length !== 0) {
            res.json(oneClass.rows[0])
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
        const {name} = req.body
        const oneClass = await pool.query("insert into class (class_name) values ($1) returning *",[name])
        res.json(oneClass.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {name} = req.body
        const oneClass = await pool.query("update class set class_name = $2 where class_id = $1 returning *", [id, name])
        if (oneClass.length !== 0) {
            res.json(oneClass.rows[0])
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
        const oneClass = await pool.query("delete from class where class_id = $1",[id])
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router