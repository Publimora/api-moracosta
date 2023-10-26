import app from "./app.js";
import "./database.js";
import { PORT } from "./config.js";
import "./libs/initialSetup.js";
import path from "path";

app.use(express.static(path.join(__dirname,"public")))

app.listen(PORT);
console.log("Server on port", app.get("port"));
