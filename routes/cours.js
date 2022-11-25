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
        const oneCours = await pool.query("select * from cours inner join class on (class.class_id = cours.cours_class) inner join matiere on (matiere.matiere_id = cours.cours_matiere) where cours_id = $1",[id])
        if (oneCours.rows.length !== 0) {
            res.json(oneCours.rows[0])
        }
        else {
            return res.json({}).send("Not Found").status(404)
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/prof/:id", async (req, res) => {
    try {
        const  {id} = req.params
        const allCourses = await pool.query("select * from cours where cours_prof = $1",[id])
        res.json(allCourses.rows)
    } catch (err) {
        console.log(err.message)
    }
})

router.get("/today/:id", async (req, res) => {
    try {
        const {id} = req.params
        const allCourses = await pool.query("select cours_id, cours_date, class_name, matiere_name from cours inner join class on (cours.cours_class = class.class_id) inner join matiere on (cours.cours_matiere = matiere.matiere_id) where cours_prof = $1 and cours_date >= date_trunc('day', now()) order by cours_date",[id])
        res.json(allCourses.rows)
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