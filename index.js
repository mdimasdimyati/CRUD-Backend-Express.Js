const express = require('express');
const routes = require("./routes/user")
// const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')


const port = 5000;

app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json())

app.use("/users",routes);

app.listen(port, () => {
    console.log(`Your app runing on port ${port}`);
});