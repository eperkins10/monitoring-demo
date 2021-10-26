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

let students = []

app.post("/api/student", (req, res) => {
    const {name} = req.body
    name = name.trim()

    students.push(name)
    
    rollbar.log("student added successfully", 
    {author: "Ethan", type: "manual entry"})
    
    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`runnin on ${port}`))