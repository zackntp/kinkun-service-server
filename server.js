const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user.route')
const kinkunRoutes = require('./routes/kinkun.route');

const app = express();

const PORT =process.env.PORT;

//middleware

app.use(cors());
app.use(express.json());

//global routes
app.use('/user',userRoutes)
app.use('/kinkun',kinkunRoutes)

//image
app.use('/images/user',express.static('images/user'))
app.use('/images/kinkun',express.static('images/kinkun'))


app.get('/',(req,res) =>{
 
   res.json({message : 'Welcome to our Web Server!....'})
});

app.listen(PORT || 3000,()=>{
    console.log(`Server is running on port ${PORT}`)
})