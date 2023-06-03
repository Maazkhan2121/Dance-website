const express = require("express");
const path = require("path");

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const app = express();
const port = 80;

//Define Mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    Email: String,
    Address: String,

});
const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('Home.pug', params);
})
app.get('/Contact', (req, res) => {
    const params = {}
    res.status(200).render('Contact.pug', params);
})
app.post('/Contact', (req, res) => {
    const mydata = new contact(req.body);
    mydata.save().then(() => {
        res.send("this item has been send to database")
    }).catch(()=>{
        res.status(400).send("item was not send to the database")
        })
    // res.status(200).render('Contact.pug', );
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});