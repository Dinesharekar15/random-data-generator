const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const PORT=7000;

const app=express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/company', {useNewUrlParser: true, useUnifiedTopology: true});

const employeeSchema=new mongoose.Schema({
    name:String,
    age:Number,
    salary:Number,
    position:String
});

const Employee=mongoose.model('Employee', employeeSchema);

app.post('/', async(req,res)=>{
    try{
        const randomEmployee={
            name:`Employee${Math.floor(Math.random() * 1000)}`,
            age:Math.floor(Math.random()*50)+20,
            salary: Math.floor(Math.random() * 100000),
            position:`developer`
        }
        const newEmployee=new Employee(randomEmployee);
        await newEmployee.save();
        console.log('Employee saved successfully');
        res.status(200).json({ message: 'Random data generated and saved successfully!' });

    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})