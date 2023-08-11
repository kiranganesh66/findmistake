let express = require("express");
let { open } = require("sqlite");
let app = express();
app.use(express.json());
let path = require("path");
let sqlite3 = require("sqlite3");

let dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;

const insilizationOfDbandsever = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server working on 3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

insilizationOfDbandsever();

app.get("/players/", async (request, response) => {
  let dbplyer = "select * from cricket_team";

  let player = await db.all(dbplyer);
  response.send(player);
});

//
app.post("/players/", async (request, response) => {
  let teamdetails = request.body;
  let { playerName, jerseyNumber, role } = teamdetails;

  let dbplyer = `insert into cricket_team (playerName, jerseyNumber, role)
  values( ${playerName} ,${jerseyNumber},${role}) `;

  let player = await db.run(dbplyer);
  let playerId = Response.lastId;
  response.send(player);
});
