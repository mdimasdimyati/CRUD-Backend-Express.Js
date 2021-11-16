const express = require('express');
const routes = require("./routes/user")
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/users",routes);

app.listen(port, () => {
    console.log(`Your app runing on port ${port}`);
});