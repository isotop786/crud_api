const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');

const Item = require('./Model/item');

const app = express();
app.use(express.json());
app.use(cors({
    origin:"*"
}))

// mongoose.connect(process.env.MONGO_URI).then(()=>{
mongoose.connect("mongodb+srv://maruf:Pass1234@cluster0.t878jel.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("MongoDB connected")
})
.catch(err =>{
    console.log("Error: "+err);
})
;

app.get('/items', async (req, res) =>{
    const items = await Item.find();
    res.json(items);
})
app.get('/items/:id', async (req, res) =>{
    const { id } = req.params;
    const item = await Item.findById(id);
    res.json(item);
})

app.post('/items', async (req, res)=>{
    const {name, description} = req.body;
    const newItem = new Item({name, description});
    await newItem.save();
    res.json(newItem);
})

app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true });
    res.json(updatedItem);
  });
  
  app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item deleted' });
  });


app.listen(3300,()=>{
    console.log("server running on port 3300")
})