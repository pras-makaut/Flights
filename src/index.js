const express = require('express');
const {ServerConfig} = require('./config');
const apiRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT, async ()=>{
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // Bad code just for checking some query
    // const {Airport ,City} = require('./models')
    // const kol= await City.findByPk(11);
    // const airport1  = await kol.createAirport({name:"xyz",code:"zyx"})
    // const airport2  = await kol.createAirport({name:"wxy",code:"yxw"})
    
    // const allAirport = await kol.getAirports();
    // const cairport = await Airport.findByPk(1);
    // await kol.removeAirports(cairport);

    // await City.destroy({
    //     where : {
    //         id:11
    //     }
    // })
    
})

