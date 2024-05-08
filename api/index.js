import express from 'express'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from './router'

//coneccion a la BD
mongoose.Promise=global.Promise;
const dbUrL= "mongodb://localhost:27017/tesis";
mongoose.connect(
    dbUrL,{
        useNewUrlParser: true,
        useUnifiedTopology:  true
    }
).then(mongoose=>console.log( "CONECTADO A LA BD DESDE EL PUERTO 27017 "))
.catch(err=>console.log(err));

const app=  express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/api/',router)//baase de las rutas

app.set('port',process.env.PORT||3000);
app.listen(app.get('port'),()=>{
    console.log("EL SERVIDOR SE EJECUTA PERFECTAMENTE EN EL PUERTO 3000")
})