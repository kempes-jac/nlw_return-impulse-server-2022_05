import express from "express";
import { routes } from "./routes";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5555']
}));
app.use(routes);

app.listen(3333,
  ()=>{
    console.log('Server running');
    
  }  
);