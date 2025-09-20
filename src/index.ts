import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";
import { seedInitialProducts } from "./services/productService";
import productRouter from "./routes/productRouter";
import cartRouter from "./routes/cartRouter";


const app       = express();
const PORT      = 3001;
const MONGO_URI = "mongodb://localhost:27017/ecommerce";


app.use(express.json());


mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});


// seed some initial products 
seedInitialProducts();


app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log("Server is running on port 3001");
});