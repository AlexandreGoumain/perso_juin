// On  importe le module express qui sera utilisé pour faire tourner notre serveur Noder
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { env } from "./config/env";
import { requestLogger } from "./middlewares/requestLogger";
import router from "./routes";

// Initialise notre app express
const app = express();
const { PORT, ORIGIN } = env;

app.use(
    cors({
        origin: ORIGIN, // Autoriser UNIQUEMENT cette adresse à requêter sur mon serv
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Méthodes HTTPS autorisées (les autres seront bloquées)
        credentials: true,
    })
);
app.use(express.json()); // pour analyser les requêtes JSON
app.use(requestLogger);

// Notre router global, situé dans src/routes/index.ts
app.use("/", router);

// CI DESSOUS - EXEMPLE (A NE PAS PRENDRE EN CONSIDERATION) //////
const controller = (request: Request, response: Response) => {
    response.send("Bienvenue page d'accueil");
};

const middleWare1 = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log("On passe par le middleware 1 et tout va bien");
    next();
};

const middleWare2 = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log("ON PASSE PAS");
    response.status(401).send("Interdit");
};

// Définition des routes :
app.get("/", middleWare1, middleWare2, controller);

////////// FIN D'EXEMPLE
//////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    // Mise en écoute du serveur (met le serveur en écoute sur le port spécifié et affiche un message à la console quand c'est prêt)
    console.log("Le serveur est en écoute sur: http://localhost:" + PORT);
});

// Controller => fonction appellée par la route (ex: (req, res) => { ... })
// Route => ensemble de path + methode + controller
