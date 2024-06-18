const banco = require("./bd.js");
const express = require("express");
const User = require("./model/User.js");
const Game = require("./model/Game.js");
const Grid = require("./model/Grid.js");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 8000;

app.use([cors(), bodyParser.json()]);

app.listen(port, () => {
  console.log("api está rodando na url base: http://localhost:8000/");
});

//userController
app.get("/user", async (req, res, next) => {
  console.log("connecting with database");
  await banco.sync({ force: false });
  const users = await User.findAll();
  if (!users.every((user) => user instanceof User)) {
    res.status(500).send("intruder on database");
  } else {
    const response = JSON.stringify(users, ["id", "name"], " ");
    res.status(200).send(response);
  }
});

app.get("/user/:id", async (req, res, next) => {
  console.log("connecting with database");
  await banco.sync({ force: false });
  if (req.params.id == null) {
    res.status(400).send("id is null");
  } else {
    const user = await User.findByPk(req.params.id);
    res.send({
      id: user.id,
      name: user.name,
    });
  }
});

app.post("/user", async (req, res, next) => {
  console.log("connecting with database");
  await banco.sync({ force: false });
  const user = await createUser(req.body);
  user.save();
  res.status(201).send({
    id: user.id,
    name: user.name,
    password: user.password,
  });
});

app.post("/user/login", async (req, res, next) => {
  //autentica o usuário
  const user = await User.findOne({ where: { name: req.body.name } });
  if (req.body.password == user.password) {
    let pass = user.password;

    //criar o JWT
    const createSecretKey = fs.readFileSync("./chaves/private.key", "utf8");
    const token = jwt.sign({ pass }, createSecretKey, {
      algorithm: "RS256",
      expiresIn: 300,
    });

    res.status(200).json({
      id: user.id,
      message: "User access granted",
      token: token,
    });
    //enviar o JWT para o usuário
  } else {
    res.status(401).json({
      message: "user access denied",
    });
  }
});

app.put("/user/:id", [
  verificaJWT,
  async (req, res, next) => {
    console.log("connecting with database");
    await banco.sync({ force: false });

    let user = await User.findByPk(req.params.id);
    if (user == null) res.status(404).send("User does not exists");
    else {
      try {
        await user.destroy();
        const updatedUser = await createUserWithId(
          req.params.id,
          req.body,
          user.password
        );
        updatedUser.save();
        res.status(200).send({
          id: updatedUser.id,
          name: updatedUser.name,
        });
      } catch (error) {
        let userStats = await User.findByPk(req.params.id);
        if (userStats == null)
          await createUserWithId(user.id, user, user.password);
        res.status(400).json({
          error: error.message + error.lineNumber,
        });
      }
    }
  },
]);

app.delete("/user/:id", [
  verificaJWT,
  async (req, res, next) => {
    console.log("connecting with database");
    await banco.sync({ force: false });

    let user = await User.findByPk(req.params.id);
    if (user == null) res.status(404).send("User does not exists");
    else {
      await user.destroy();
      res.status(204).send("successfully deleted");
    }
  },
]);

async function createUserWithId(id, body, password) {
  return User.create({
    id: id,
    name: body.name,
    password: password,
    level: body.level,
  });
}

async function createUser(body) {
  return User.create({
    name: body.name,
    password: body.password,
    level: 1,
  });
}

function verificaJWT(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({
      autenticado: false,
      message: "Can't authenticate, bad Header",
    });
  }
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Can't authenticate, unrecognized token",
    });
  }

  const publicKey = fs.readFileSync("./chaves/public.key", "utf8");

  jwt.verify(token, publicKey, { algorithm: ["RS256"] }, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Can't authenticate invalid token",
      });
    }

    return next();
  });
}

// Grid Controller
app.get("/grid", [
  verificaJWT,
  async (req, res, next) => {
    console.log("connecting with database");
    await banco.sync({ force: false });
    const grids = await Grid.findAll();
    res.status(200).json(grids.map((grid) => gridToResponse(grid)));
  },
]);

app.get("/grid/:id", [
  verificaJWT,
  async (req, res, next) => {
    console.log("connecting with database");
    await banco.sync({ force: false });
    let grid = await Grid.findByPk(req.params.id);
    if (grid == null) res.status(404).json({ error: "Grid not found" });
    if (req.params.id == null) {
      res.status(400).json({ error: "id is null" });
    } else {
      res.status(200).json(gridToResponse(grid));
    }
  },
]);

app.post("/grid", [
  verificaJWT,
  async (req, res, next) => {
    console.log("connecting with database");
    await banco.sync({ force: false });
    const grid = await createGrid(req);
    grid.save();
    res.status(201).json(gridToResponse(grid));
  },
]);

app.put("/grid/:id", [
  verificaJWT,
  async (req, res, next) => {
    console.log("connecting with database");
    await banco.sync({ force: false });

    let grid = await Grid.findByPk(req.params.id);
    if (grid == null) res.status(404).json({ error: "Grid not found" });
    else {
      await grid.destroy();
      const updatedGrid = await createGridWithId(req.params, req.body);
      updatedGrid.save();
      res.status(200).json(gridToResponse(grid));
    }
  },
]);

app.delete("/grid/:id", [
  verificaJWT,
  async (req, res, next) => {
    console.log("connecting with database");
    await banco.sync({ force: false });

    let grid = await Grid.findByPk(req.params.id);
    if (grid == null) res.status(404).json({ error: "User not found" });
    else {
      await grid.destroy();
      res.status(204).end();
    }
  },
]);

function gridToResponse(grid) {
  return JSON.parse(
    JSON.stringify(grid, [
      "id",
      "line0",
      "line1",
      "line2",
      "line3",
      "line4",
      "line5",
      "line6",
      "line7",
      "line8",
    ])
  );
}

async function createGrid(req) {
  return Grid.create({
    line0: body.line0,
    line1: body.line1,
    line2: body.line2,
    line3: body.line3,
    line4: body.line4,
    line5: body.line5,
    line6: body.line6,
    line7: body.line7,
    line8: body.line8,
  });
}

async function createGridWithId(params, body) {
  return Grid.create({
    id: params.id,
    line0: body.line0,
    line1: body.line1,
    line2: body.line2,
    line3: body.line3,
    line4: body.line4,
    line5: body.line5,
    line6: body.line6,
    line7: body.line7,
    line8: body.line8,
  });
}

//Game Controller

app.get("/game", [
  verificaJWT,
  async (req, res, next) => {
    try {
      const games = await Game.findAll();
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
]);

app.get("/game/:id", [
  verificaJWT,
  async (req, res, next) => {
    try {
      const game = await Game.findByPk(req.params.id);
      if (game) {
        res.json(gameToResponse(game));
      } else {
        res.status(404).json({ error: "Game not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
]);

app.post("/game", [
  verificaJWT,
  async (req, res, next) => {
    try {
      const game = await createGame(req.body);
      res.status(201).json(gameToResponse(game));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
]);

app.put("/game/:id", [
  verificaJWT,
  async (req, res, next) => {
    try {
      const game = await Game.findByPk(req.params.id);
      if (game) {
        await game.update(req.body);
        res.json(game);
      } else {
        res.status(404).json({ error: "Game not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
]);

app.delete("/game/:id", [
  verificaJWT,
  async (req, res, next) => {
    try {
      const game = await Game.findByPk(req.params.id);
      if (game) {
        await game.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Game not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
]);

async function createGame(body) {
  const grid = Grid.findByPk(body.grid_id);
  const gridContent = JSON.parse(
    grid.line0 +
      "," +
      grid.line1 +
      "," +
      grid.line2 +
      "," +
      grid.line3 +
      "," +
      grid.line4 +
      "," +
      grid.line5 +
      "," +
      grid.line6 +
      "," +
      grid.line7 +
      "," +
      grid.line8
  );
  return Game.create({
    difficult: body.difficult,
    hasEnded: false,
    user_id_fk: body.user_id,
    grid: gridContent,
  });
}

function gameToResponse(game) {
  return JSON.parse(
    JSON.stringify(game, [
      "id",
      "difficult",
      "hasEnded",
      "user_id_fk",
      "grid_id_fk",
    ])
  );
}
