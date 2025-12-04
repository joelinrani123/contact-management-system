import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';


dotenv.config();
const app=express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.use(express.json());

app.use('/contacts',contactRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB connected');
    app.listen(PORT,()=>{
        console.log(`Server running in port ${PORT}`)
    })

})
.catch((err)=>console.log(err));

