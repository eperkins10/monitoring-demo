const express   = require("express")

const path      = require("path")
const Rollbar   = require("rollbar")
const app       = express()

let rollbar = new Rollbar({
    accessToken: 'bc0a75ee4cbb4e39933c2f9397b18930',
    captureUncaught: true,
    captureUnhandledRejections: true

})



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`runnin on ${port}`))