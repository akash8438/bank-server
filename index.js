var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');

var app = express();

app.use(cors());
app.use(express.json());

app.get('/' , function(req , res){
    res.send('Hello World');
})


app.listen(3002 , ()=>{
    console.log("server run on port 3002");
});

mongoose.connect('mongodb+srv://akash:akash@cluster0.nagmf.mongodb.net/bank').then(()=>{console.log("Databases connected...")}).catch((err)=>{console.log(err)})


// schema
let data = new mongoose.Schema({
    userid:Number,
    name:String,
    email:String,
    password:String,
    amount : Number
})



// model

let Data = mongoose.model("test",data);


app.get('/data' , (req , res)=>{
    Data.find().then((item)=>res.send(item));   // all data fetch the find()
})



app.post('/create' , (req , res)=>{
    Data.create(req.body).then((item)=>res.send(item)).catch((err)=>console.log(err))
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const deletedUser = await Data.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


  // UPDATE 
  app.put('/update/:id', async (req, res) => {
    try {
      const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send(updatedData);
    } catch (error) {
      res.status(500).send({ message: "Error updating data", error });
    }
  });