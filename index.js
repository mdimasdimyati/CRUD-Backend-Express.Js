const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const blogs = [
    {id: 1, title: "Belajar Laravel"},
    {id: 2, title: "Belajar Express"},
    {id: 3, title: "Belajar React.js"},
]

app.get("/", (req, res )=> {
    res.send({
        title : "Hello World",
    })
})

app.get("/blog", (req, res) => {
    res.send({
        blogs,
    });


});

//Tambah blog
app.post("/blogs", (req, res) => {
    const{title} = req.body

    if(!title){
        return res.send({
            error: true,
            message: "Please input title"
        })
    }

    const ids = blogs.map((blog) => blog.id);
    const latesId = Math.max(...ids)

    const newBlog = {
        id: latesId + 1,
        title,
    }
    blogs.push(newBlog);

    res.send({
        status: "success",
        blog: newBlog,
    })
});

app.patch("/blogs/:id", (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    const idIndex = blogs.findIndex((blog) => blog.id === +id);
  
    if(idIndex == -1){
        res.send({
            error: true,
            message: "Id tidak ditemukan",
        });
    }
    blogs.splice(idIndex, 1, {
        id: +id,
        title,
    });

    res.send({
        status: 'success',
        message: 'Berhasil Update..'
    })
})

app.delete("/blogs/:id", (req,res) => {
    const {id} = req.params;

    const idIndex = blogs.findIndex((blog) => blog.id === +id);
    blogs.splice(idIndex, 1);
    res.send({
        status: 'success',
        message: 'Berhasil Delete..'
    })

})

app.get("/about", (req, res )=> {
    res.send({
        title : "About",
    })
})

app.listen(port, () => {
    console.log(`Your app runing on port ${port}`);
});