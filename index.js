const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
const PORT = process.env.PORT || 5000
const path = require("path")

//middlewares

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
}

app.use(cors())
app.use(express.json())

app.use("/prof", require("./routes/prof"))
app.use("/eleve", require("./routes/eleve"))
app.use("/class", require("./routes/class"))
app.use("/cours", require("./routes/cours"))
app.use("/participe", require("./routes/participe"))
app.use("/matiere", require("./routes/matiere"))

app.get("/*", (req,res) => {
    res.sendFile(path.join(__dirname,"client/build/index.html"))
})

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`)
})