const router = require("express").Router()
const pool = require("../db")

router.get("/", async (req, res) => {
    try {
        const allMatieres = await pool.query("select * from matiere")
        res.json(allMatieres.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const oneMatiere = await pool.query("select * from matiere where matiere_id = $1",[id])
        if (oneMatiere.length !== 0) {
            res.json(oneMatiere.rows[0])
        }
        else {
            res.send("Error").status("404")
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/prof/:id", async (req, res) => {
    try {
        const {id} = req.params
        const allMatieres = await pool.query("select * from matiere where matiere_prof = $1",[id])
        res.json(allMatieres.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/", async (req, res) => {
    try {
        const {name,prof} = req.body
        const oneMatiere = await pool.query("insert into matiere (matiere_name, matiere_prof) values ($1, $2) returning *",[name,prof])
        res.json(oneMatiere.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {name,prof} = req.body
        const oneMatiere = await pool.query("update matiere set matiere_name = $2, matiere_prof = $3 where matiere_id = $1 returning *", [id,name,prof])
        if (oneMatiere.length !== 0) {
            res.json(oneMatiere.rows[0])
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
        const oneMatiere = await pool.query("delete from matiere where matiere_id = $1",[id])
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router