const banco = require("./bd.js");
const express = require("express");
const User = require("./model/User.js");
const Game = require("./model/Game.js");
const Grid = require("./model/Grid.js");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log("api está rodando na url base: http://localhost:8000/");
});

//userController
app.get("/user", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });
    const users = await User.findAll();
    if (!users.every((user) => user instanceof User)) {
      res.status(500).send("intruder on database");
    } else {
      const response = JSON.stringify(users, ["id", "name"], " ");
      res.status(200).send(response);
    }
  })();
});

app.get("/user/:id", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
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
  })();
});

app.post("/user", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });
    const user = await createUser(req);
    user.save();
    res.status(201).send({
      id: user.id,
      name: user.name,
    });
  })();
});

app.put("/user/:id", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });

    let user = await User.findByPk(req.params.id);
    if (user == null) res.status(404).send("User does not exists");
    else {
      await user.destroy();
      console.log(await User.findByPk(19));
      const updatedUser = await createUserWithId(req);
      updatedUser.save();
      res.status(200).send({
        id: updatedUser.id,
        name: updatedUser.name,
      });
    }
  })();
});

app.delete("/user/:id", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });

    let user = await User.findByPk(req.params.id);
    if (user == null) res.status(404).send("User does not exists");
    else {
      await user.destroy();
      res.status(204).send("successfully deleted");
    }
  })();
});

async function createUserWithId(req) {
  return User.create({
    id: req.params.id,
    name: req.body.name,
  });
}
async function createUser(req) {
  return User.create({
    name: req.body.name,
  });
}

// Grid Controller
app.get("/grid", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });
    const grids = await Grid.findAll();
    grids.every((grid) => grid instanceof Grid);
    res.status(200).send(grids.map((grid) => gridToResponse(grid)));
  })();
});

app.get("/grid/:id", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });
    let grid = await Grid.findByPk(req.params.id);
    if (grid == null) res.status(404).send("Grid does not exists");
    if (req.params.id == null) {
      res.status(400).send("id is null");
    } else {
      res.status(200).send(gridToResponse(grid));
    }
  })();
});

app.post("/grid", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });
    const grid = await createGrid(req);
    grid.save();
    res.status(201).send(gridToResponse(grid));
  })();
});

app.put("/grid/:id", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });

    let grid = await Grid.findByPk(req.params.id);
    if (grid == null) res.status(404).send("Grid does not exists");
    else {
      await grid.destroy();
      const updatedGrid = await createGridWithId(req);
      updatedGrid.save();
      res.status(200).send(gridToResponse(grid));
    }
  })();
});

app.delete("/grid/:id", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });

    let grid = await Grid.findByPk(req.params.id);
    if (grid == null) res.status(404).send("User does not exists");
    else {
      await grid.destroy();
      res.status(204).send("successfully deleted");
    }
  })();
});

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
    line0: req.body.line0,
    line1: req.body.line1,
    line2: req.body.line2,
    line3: req.body.line3,
    line4: req.body.line4,
    line5: req.body.line5,
    line6: req.body.line6,
    line7: req.body.line7,
    line8: req.body.line8,
  });
}

async function createGridWithId(req) {
  return Grid.create({
    id: req.params.id,
    line0: req.body.line0,
    line1: req.body.line1,
    line2: req.body.line2,
    line3: req.body.line3,
    line4: req.body.line4,
    line5: req.body.line5,
    line6: req.body.line6,
    line7: req.body.line7,
    line8: req.body.line8,
  });
}

//Game Controller
app.get("/grid", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });
    const grids = await Grid.findAll();
    grids.every((grid) => grid instanceof Grid);
    res.status(200).send(grids.map((grid) => gridToResponse(grid)));
  })();
});

app.get("/grid/:id", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });
    let grid = await Grid.findByPk(req.params.id);
    if (grid == null) res.status(404).send("Grid does not exists");
    if (req.params.id == null) {
      res.status(400).send("id is null");
    } else {
      res.status(200).send(gridToResponse(grid));
    }
  })();
});

app.post("/grid", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });
    const grid = await createGrid(req);
    grid.save();
    res.status(201).send(gridToResponse(grid));
  })();
});

app.put("/grid/:id", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });

    let grid = await Grid.findByPk(req.params.id);
    if (grid == null) res.status(404).send("Grid does not exists");
    else {
      await grid.destroy();
      const updatedGrid = await createGridWithId(req);
      updatedGrid.save();
      res.status(200).send(gridToResponse(grid));
    }
  })();
});

app.delete("/grid/:id", (req, res, next) => {
  (async () => {
    console.log("sincronizando o banco");
    await banco.sync({ force: false });

    let grid = await Grid.findByPk(req.params.id);
    if (grid == null) res.status(404).send("User does not exists");
    else {
      await grid.destroy();
      res.status(204).send("successfully deleted");
    }
  })();
});

//Game Controller

router.get("/game", (req, res, next) => {
  (async () => {
    try {
      const games = await Game.findAll();
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })();
});

router.get("/game/:id", (req, res, next) => {
  (async () => {
    try {
      const game = await Game.findByPk(req.params.id);
      if (game) {
        res.json(game);
      } else {
        res.status(404).json({ error: "Game not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })();
});

router.post("/game", async (req, res, next) => {
  (async () => {
    try {
      const game = await Game.create(req.body);
      res.status(201).json(game);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })();
});

router.put("/game/:id", async (req, res, next) => {
  (async () => {
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
  })();
});

// Delete a game by ID
router.delete("/game/:id", async (req, res, next) => {
  (async () => {
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
  })();
});
