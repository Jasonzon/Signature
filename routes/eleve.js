const router = require("express").Router()
const pool = require("../db")

router.get("/", async (req, res) => {
    try {
        const allEleves = await pool.query("select * from eleve")
        res.json(allEleves.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const oneEleve = await pool.query("select * from eleve inner join class on (class_id = eleve_class) where eleve_id = $1",[id])
        if (oneEleve.length !== 0) {
            res.json(oneEleve.rows[0])
        }
        else {
            res.send("Error").status("404")
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/class/:id", async (req, res) => {
    try {
        const {id} = req.params
        const allEleves = await pool.query("select * from eleve where eleve_class = $1",[id])
        res.json(allEleves.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/absence/:id", async (req, res) => {
    try {
        const {id} = req.params
        const allAbsences = await pool.query("select cours_date, matiere_name from participe inner join eleve on (eleve_id = participe_eleve) inner join cours on (cours_id = participe_cours) inner join matiere on (matiere_id = cours_matiere) where participe_eleve = $1 and participe_state = false",[id])
        res.json(allAbsences.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/", async (req, res) => {
    try {
        const {name,classe} = req.body
        const oneEleve = await pool.query("insert into eleve (eleve_name, cours_class) values ($1, $2) returning *",[name,classe])
        res.json(oneEleve.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {name,classe} = req.body
        const oneEleve = await pool.query("update eleve set eleve_name = $2, eleve_class = $3 where eleve_id = $1 returning *", [id,name,classe])
        if (oneEleve.length !== 0) {
            res.json(oneEleve.rows[0])
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
        const oneEleve = await pool.query("delete from eleve where cours_id = $1",[id])
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router