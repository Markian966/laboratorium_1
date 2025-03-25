// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.

// 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.

// 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.

// 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
// Podpowiedź: fileSystem.readFile(...);

// 🏗 Stwóz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
// Podpowiedź: fileSystem.writeFile(...);
// Podpowiedź: response.setHeader("Location", "/product/new");

// 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.


const fs = require("fs");
const STATUS_CODE = require("../constants/statusCode");

const productRouting = (method, url, res) => {
    if (url === "/product/add" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <html>
                <head><title>Shop – Add product</title></head>
                <body>
                    <h1>Add product</h1>
                    <form action="/product/add" method="POST">
                        <input type="text" name="name" placeholder="Product Name" required />
                        <input type="text" name="description" placeholder="Description" required />
                        <button type="submit">Add</button>
                    </form>
                </body>
            </html>
        `);
    } else if (url === "/product/add" && method === "POST") {
        let body = "";
        res.writeHead(STATUS_CODE.FOUND, { Location: "/product/new" });

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            fs.writeFileSync("product.txt", body);
            res.end();
        });
    } else if (url === "/product/new") {
        let content = "No new products.";
        if (fs.existsSync("product.txt")) {
            content = fs.readFileSync("product.txt", "utf8");
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <html>
                <head><title>Shop – Newest product</title></head>
                <body>
                    <h1>Newest product</h1>
                    <p>${content}</p>
                </body>
            </html>
        `);
    } else {
        console.log(`ERROR: requested url ${url} doesn’t exist.`);
        res.writeHead(STATUS_CODE.NOT_FOUND, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
    }
};

module.exports = productRouting;
