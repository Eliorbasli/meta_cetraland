// const express = require('express')
// const { render } = require('express/lib/response')
// const app = express()

// app.get("/" , (req , res) => {
//         res.send('heloo')
// })

// app.listen(5000 , () => {
//     console.log("Server started on port 5000")
// })


//////////////////////////////////


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const userRouter = require("./routers/user.js");
const landRouter = require("./routers/land.js");
const Land = require("./models/Land.js");





mongoose.connect('mongodb://localhost/meta_centraLand', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", async () => {
  console.log("Connected to Database");
  if ((await Land.count()) === 0) {
    for (let i = 0; i < 200; i++) {
      for (let j = 0; j < 200; j++) {


        let land = new Land({
          type:
            i % 40 < 3 && i > 10 || i % 20 < 1 ||(j %40 < 3 && j > 10) || ( j%20 < 1 || (j === 199) || (i === 199))
              ? "road"
              : ((((i % 80 < 25) && (i % 80 > 15)) && (j %80 < 25 && j%80 > 15)) || ((i %40 < 25 && i % 40 > 15) && (j % 40 < 25 && j % 40 > 15)))
              ? "park"
              : "land",
        });
        
        // let land = new Land({
        //   type:
        //     i % 19 === 0 || j % 19 === 0
        //       ? "road"
        //       : i >= 20 && i <= 59 && j >= 20 && j <= 59
        //       ? "park"
        //       : "land",
        // });

        await land.save();
      }
    }
  }
});





// const slotColor = (row, col) => {
//   if ((((row %80 <25) && (row % 80 > 15)) 
//   && (col % 80 <25 && col % 80 >15))  
//   || ((row %40 < 25 && row %40 > 15) && (col % 40 <25 && col % 40 >15))){
//     return "rgba(60 , 179 , 113 , .7)"
//   }
//   else if ((row % 40 <3 && row > 10) || row %20 < 1|| (col %40 < 3 && col > 10) ||(col% 20 < 1) || (col === 199) || (row === 199)) {
//     return "rgba(50 , 50, 50)";
//   } 
//     return ;
// };

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);
app.use("/land", landRouter);

// app.get("/user" , (req , res) => {
//   res.send('user')
// })

app.get("/" , (req , res) => {
        res.send('heloo')
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server Started"));
