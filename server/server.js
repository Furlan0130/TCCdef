const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const { getCoordinates } = require("./services/mapservice");

const app = express();

app.use(cors());
app.use(express.json());

// cria ou abre o banco
const db = new sqlite3.Database("banco.db");

db.run("PRAGMA foreign_keys = ON");

// criar tabelas
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS alunos (
      rm INTEGER PRIMARY KEY,
      nome TEXT,
      endereco TEXT,
      nomeresp TEXT,
      cpfresp TEXT,
      horariosaida TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS veiculos (
      numero INTEGER PRIMARY KEY,
      placa TEXT,
      capacidade INT,
      passageirosat INT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS rota (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      regiao TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS motoristas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      cnh TEXT,
      rotatt INTEGER,
      veiculo_respo INTEGER,
      FOREIGN KEY (rotatt) REFERENCES rota(id),
      FOREIGN KEY (veiculo_respo) REFERENCES veiculos(numero)
    )
  `);

});

// listar alunos
app.get("/alunos", (req, res) => {

  db.all("SELECT * FROM alunos", (err, rows) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    res.json(rows);
  });

});

// cadastrar aluno
app.post("/alunos", async (req, res) => {

  const { rm, nome, endereco, nomeresp, cpfresp, horariosaida } = req.body;

  try {
    // 🔥 já preparando pra usar coordenadas
    const coords = await getCoordinates(endereco);

    console.log("Coordenadas:", coords);

    db.run(
      `INSERT INTO alunos 
      (rm, nome, endereco, nomeresp, cpfresp, horariosaida) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [rm, nome, endereco, nomeresp, cpfresp, horariosaida],
      function (err) {

        if (err) {
          res.status(500).json(err);
          return;
        }

        res.json({
          ok: true,
          coordenadas: coords
        });
      }
    );

  } catch (error) {
    res.status(500).json({ erro: "Erro ao processar endereço" });
  }

});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});

// ESTE ISOLADO (pode apagar depois)
async function teste() {
  const coords = await getCoordinates("Rua Barreto Leme, Campinas, SP, Brasil");
  console.log("Teste coordenadas:", coords);
}

teste();