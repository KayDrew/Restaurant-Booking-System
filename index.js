import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import flash from 'express-flash';
import session from 'express-session';
import pkg from 'pg-promise';
import restaurant from './services/restaurant.js';



const app = express()

app.use(express.static('public'));
app.use(flash());

app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.static('images'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(session({
  secret: "no secret",
  resave: false,
  saveInitialized: false
}));

const connectionString=process.env.URL;
const Pool= pkg();
const db=Pool ({connectionString ,
ssl: true 
});
const routes = restaurant(db);

app.get("/", async(req, res) => {

    //get all the tables
let allTables=await routes.getTables();

//show success message
req.flash("success",routes.getSuccess());

//show error message
req.flash("error",routes.getError());

    res.render('index', { tables : allTables,
 
    
})
});

app.post("/bookings",async (req,res)=>{

    //get table id,username, booking size
    let id= await req.body.tableId;
    let username= await req.body.username;
    let number_of_people=await req.body.booking_size;
    let phoneNumber=req.body.phone_number;

    //record booking
    await routes.bookTable(username,number_of_people,phoneNumber,id);

    res.redirect('/');

})

//app.post("")

app.get("/bookings",async (req, res) => {

    //get booked tabes
let bookedTables=await routes.getBookedTables();

    res.render('bookings', { tables :bookedTables})
});

app.post("/cancel",async (req,res)=>{

    //get table name
    let tableName=req.body.table;
  
    //cancel booking
   await routes.cancelTableBooking(tableName);

    res.redirect("/bookings");

});

app.get("/bookings/:username",async(req,res)=>{

    //get username from url
    let username=req.params.username;

    //standardise result in array
 let arr=[];

 //get table for one user
let userBooking=await routes.getBookedTablesForUser(username);
arr.push(userBooking);


//flash erroor
req.flash("error1",routes.getUserError());

    res.render("bookings",{
        tables:arr
    })
})



var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('🚀  server listening on:', portNumber);
});