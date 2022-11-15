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
        const oneParticipe = await pool.query("select * from participe where participe_cours = $1",[id])
        if (oneParticipe.rows.length !== 0) {
            res.json(oneParticipe.rows[0])
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
        const {cours,eleve} = req.body
        const oneParticipe = await pool.query("insert into participe (participe_cours, participe_eleve) values ($1, $2) returning *",[cours,eleve])
        res.json(oneParticipe.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {cours,eleve} = req.body
        const oneParticipe = await pool.query("update participe set participe_cours = $2, participe_eleve = $3 where participe_id = $1 returning *", [id,cours,eleve])
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