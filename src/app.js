import express from "express";
import routerUser from "./routes/routesUser.js";
import routerPet from "./routes/routesPet.js";
import routerServicos from "./routes/routesAgendamento.js";

const app = express();

app.use(express.json());
app.use(routerUser);
app.use(routerPet);
app.use(routerServicos);

export default app;