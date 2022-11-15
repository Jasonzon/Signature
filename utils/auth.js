module.exports = async (req, res, next) => {
    try {
        const jwtToken = await req.header("token")
        if (!jwtToken) {
            return res.status(403).send("Not Authorized")
        }
        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        if (!payload) {
            return res.status(403).send("Not Authorized")
        }
        req.prof = payload.prof
        req.mail = payload.mail
        next()

    } catch (err) {
        console.error(err.message)
        return res.status(403).send("Not Authorized")
    }
}