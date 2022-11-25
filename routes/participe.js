const router = require("express").Router()
const pool = require("../db")

router.get("/", async (req, res) => {
    try {
        const allParticipes = await pool.query("select * from participe")
        res.json(allParticipes.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const oneParticipe = await pool.query("select * from participe where participe_id = $1",[id])
        if (oneParticipe.length !== 0) {
            res.json(oneParticipe.rows[0])
        }
        else {
            res.send("Error").status("404")
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/cours/:id", async (req, res) => {
    try {
        const {id} = req.params
        const allParticipe = await pool.query("select participe_id, participe_cours, participe_eleve, participe_state, cours_date, eleve_name, class_name from participe inner join cours on (cours.cours_id = participe.participe_cours) inner join class on (class.class_id = cours.cours_class) inner join eleve on (eleve.eleve_id = participe.participe_eleve) where cours_id = $1",[id])
        res.json(allParticipe.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.post("/", async (req, res) => {
    try {
        const {cours,eleve,state} = req.body
        const oneParticipe = await pool.query("insert into participe (participe_cours, participe_eleve, participe_state) values ($1, $2, $3) returning *",[cours,eleve,state])
        res.json(oneParticipe.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {cours,eleve,state} = req.body
        const oneParticipe = await pool.query("update participe set participe_state = $3 where participe_eleve = $2 and participe_cours = $1 where participe_id = $4 returning *", [cours,eleve,state,id])
        if (oneParticipe.length !== 0) {
            res.json(oneParticipe.rows[0])
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
        const oneParticipe = await pool.query("delete from participe where participe_id = $1",[id])
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router