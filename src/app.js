const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, validate } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);

  // TODO
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  if(!validate(id)) {
    return response.status(400).json({ error: "invalid ID" });
  }
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);


  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "repository not found" });
  }

  const repository = {
    id :id,
    title,
    url,
    techs,
    likes :repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);

  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "invalid ID" });
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send();
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  if(!validate(id)) {
    return response.status(400).json({ error: "invalid ID" });
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "invalid ID" });
  }

  const repository = repositories[repositoryIndex]

  repositories[repositoryIndex] = {
    id,
    title: repositories[repositoryIndex].title,
    url: repositories[repositoryIndex].url,
    techs: repositories[repositoryIndex].techs,
    likes: repositories[repositoryIndex].likes + 1,
  }

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
