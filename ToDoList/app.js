const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// console.log(date());

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));

app.get("/", function(req, res){
    // res.send("Hey, I'm harsh.");
    // let currentDay = today.getDay();
    // let day = "";

    // if (currentDay === 6 || currentDay === 0)
    // {
    //     day = "Weekend";
    // }
    // else
    // {
    //     day = "Weekday";
    // }

    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wdnesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    //     default:
    //         console.log("The current value of the day is : " + currentDay);
    //         break;
    // }

    let day = date.getDate();
    res.render("list", {
        listTitle: day,
        itemsArray: items
    });
})

app.post("/", function(req, res){
    const item = req.body.newItem;
    console.log(req.body);
    if (req.body.list === " Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

    items.push(item);
    res.redirect("/");
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", itemsArray: workItems});
})

app.listen(3000, function(){
    console.log("Your app is running successfully on port 3000.");
})

