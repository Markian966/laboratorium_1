// 📦 Zaimportuj moduł odpowiedzialne za routing poszczególnych części aplikacji.
// 📦 Zaimportuj obiekt STATUS_CODE.

// 🏗 Stwórz tutaj funkcję 'requestRouting', która będzie obsługiwać zapytania HTTP.
// Podpowiedź: const requestRouting = (request, response) => {
// 🏗 Tutaj stwórz logowanie do konsoli informacji, mówiące o typie logowania (INFO), dacie, metodzie oraz url żądania.
// 🏗 Tutaj stwórz podstawowy 'request routing' dla ścieżek '/', zawierającej /product' oraz '/logout'. Przekaż `request` i `routing` do odpowiednio routingu.

// 🏗 Obsłuż specjalny przypadek, jeśli użytkownik zostanie przekierowany na ścieżkę /kill, aplikacja się zamknie.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (PROCESS), dacie oraz informację, że wylogowowyanie zostało wywołane a aplikacja zamknie się.

// 🏗 Tutaj stwórz obsługę przypadku, jeśli żądany URL nie istnieje. Zwróć wtedy błąd 404.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (ERROR), dacie oraz informację, że żądany url nie istnieje.
//  };

// 🔧 Wyeksportuj funkcję 'requestRouting', aby inne moduł mogły jej używać.



const homeRouting = require("./home");
const productRouting = require("./product");
const logoutRouting = require("./logout");
const STATUS_CODE = require("../constants/statusCode");

const requestRouting = (req, res) => {
    console.log(`INFO [${new Date().toISOString()}]: ${req.method} - ${req.url}`);

    if (req.url === "/") {
        homeRouting(req.method, res);
    } else if (req.url.startsWith("/product")) {
        productRouting(req.method, req.url, res);
    } else if (req.url === "/logout") {
        logoutRouting(req.method, res);
    } else if (req.url === "/kill") {
        console.log(`PROCESS [${new Date().toISOString()}]: logout has been initiated, shutting down.`);
        process.exit();
    } else {
        res.writeHead(STATUS_CODE.NOT_FOUND, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
    }
};

module.exports = requestRouting;
