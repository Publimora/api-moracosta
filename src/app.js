import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Routes
import indexRoutes from "./routes/index.routes.js";
import modelosRoutes from "./routes/modelo.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import marcaRoutes from "./routes/marca.routes.js";
import vehiculosRoutes from "./routes/vehiculo.routes.js";

const app = express();
app.use(cookieParser());

// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  origin: ["http://localhost:5173", "https://moracosta.netlify.app"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

app.use(cors(corsOptions));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

// Routes
app.use("/api", indexRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/modelos", modelosRoutes);
app.use("/api/marcas", marcaRoutes);
app.use("/api/vehiculos", vehiculosRoutes);

export default app;
