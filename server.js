const express = require("express");
const { get } = require("http");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;


// get encoded data from the url
app.use(express.urlencoded({ extended: false }));
// get json data from the body
app.use(express.json());
// serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("^/$ | index(.html)?", (req, res) => {
    //the path must start with / and end with / or /index.html
    // where .html is optional
    res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/new-page(.html)?", (req, res) => {
  
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
app.get("/old-page(.html)?", (req, res) => {
  
    res.redirect( 301, "new-page.html");
});


app.get("/hello(.html)?", (req, res,next) => {
    console.log("hello world from middleware");
    next(); 
},(req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

//chained functions

const one = (req, res, next) => {
    console.log("one");
    next();
}
const two = (req, res, next) => {
    console.log("two");
    next();
}
const three = (req, res, next) => {
    console.log("three");
    res.send("done");
}

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
}); 

app.get("/chained(.html)?", [one, two, three]);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


