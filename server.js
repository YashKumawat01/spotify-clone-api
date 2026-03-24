require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT

const startServer = async (req, res) => {
  try {

    app.listen(PORT, async ()=>{

      await connectDB();

      console.log(`Server is Running on PORT : ${PORT}`)
    })


  } catch (error) {

    console.log("Error in Server :",error)
    process.exit(1)
  }
};
startServer();