const { Router } = require('express');
const {
  getPeople,
  getPlanet,
  getVehicle,
  getStarship,
  getSpecie,
  getFilm
} = require('../controllers/swapi');

const swapiRouter = new Router();

swapiRouter.post('/people', getPeople);
swapiRouter.post('/planet', getPlanet);
swapiRouter.post('/vehicle', getVehicle);
swapiRouter.post('/starship', getStarship);
swapiRouter.post('/specie', getSpecie);
swapiRouter.post('/film', getFilm);

module.exports = swapiRouter;
