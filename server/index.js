import dotenv from "dotenv";
import { connectDB } from "./services/db.mongo.js";
import { app } from "./app.js";
dotenv.config({
    path: "./.env",
});
try {
    await connectDB();
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
} catch (err) {
    console.log("MONGO db connection failed !!! ", err);
}

// connectDB()
//     .then(() => {
//         app.listen(process.env.PORT || 8000, () => {
//             console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.log("MONGO db connection failed !!! ", err);
//     });
