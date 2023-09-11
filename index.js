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


req.flash("success",routes.getSuccess());

req.flash("error",routes.getError());

    res.render('index', { tables : allTables,
 
    
})
});

app.post("/bookings",async (req,res)=>{

    let id= await req.body.tableId;
    let username= await req.body.username;
    let number_of_people=await req.body.booking_size;
    let phoneNumber=req.body.phone_number;

    await routes.bookTable(username,number_of_people,phoneNumber,id)
    res.redirect('/');

})

//app.post("")

app.get("/bookings", (req, res) => {
    res.render('bookings', { tables : [{}, {}, {}, {}, {}, {}]})
});




var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('🚀  server listening on:', portNumber);
});