const express = require("express"); // importujemy biblioteke express - do tworzenia serwera backendowego
const mongoose = require("mongoose"); // importujemy biblioteke mongoose - do komunikacji z baza danych MongoDB
const cors = require("cors"); // importujemy biblioteke cors - do obslugi zapytan z innych domen (przyda sie potem przy laczeniu z frontendem juz na wlasciwym serwerze)
const mainRouter = require("./routes/promotors"); // importujemy glowny endpoint API z pliku routes/promotors.js
const app = express(); // tworzymy aplikacje express

app.use(cors()); // uzywamy cors
app.use(express.json()); // uzywamy middleware express.json() do przetwarzania zapytan w formacie JSON

mongoose.connect(`mongodb://127.0.0.1:27017/promotory`, {}).then(() => console.log("connected"))
// polaczenie z lokalna baza danych MongoDB o nazwie "promotory"

app.use("/promotors", mainRouter); // uzywamy glowny endpoint API pod sciezka /promotors

app.listen(4000, () => console.log("backend working"));
// uruchamiamy serwer na porcie 4000 i wyswietlamy komunikat w konsoli, ze backend dziala