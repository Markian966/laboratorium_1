// 📦 Musisz zaimportować tutaj moduł 'http'.
// 📦 Żeby użyć tutaj PORT, musisz zaimportować go z modułu konfiguracyjnego z pliku 'config.js'.
// 📦 Zaimportuj funkcję 'requestRouting' z modułu 'routing/routing.js'.

// 🏗 Tutaj, stwórz funkcję 'requestListener, która przekazuje 'request' i 'response' do 'requestRouting'.

// 🏗 Tutaj, stwóz serwer Node.js. Pamiętaj przypisać go do stałej i przekazać mu 'requestListener'.

// 🏗 Uruchom serwer na porcie PORT.
// Podpowiedź: server.listen(???);


const http = require("http"); // Importujemy moduł HTTP
const PORT = require("./config"); // Importujemy port
const requestRouting = require("./routing/routing"); // Importujemy routing

// Tworzymy serwer
const server = http.createServer((req, res) => {
    requestRouting(req, res);
});

// Serwer nasłuchuje na określonym porcie
server.listen(PORT, () => {
    console.log(`The server runs on port ${PORT}`);
});
