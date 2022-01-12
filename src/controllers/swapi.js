const nodeFetch = require('node-fetch');

async function getPeople(req, res) {
  console.info('getPeople - req ', req);

  const peopleId = req.query?.peopleId || req.body?.peopleId;

  console.info('getPeople peopleId ---', peopleId);

  const resData = await nodeFetch(`https://swapi.dev/api/people/${peopleId}`);

  const data = await resData.json();

  console.info('getPeople data ---', data);

  res.send(data);
}

async function getPlanet(req, res) {
  console.info('getPlanet - req ', req);

  const planetId = req.query?.planetId || req.body?.planetId;

  console.info('getPlanet planetId ---', planetId);

  const resData = await nodeFetch(`https://swapi.dev/api/planets/${planetId}`);

  const data = await resData.json();

  console.info('getPlanet data ---', data);

  res.send(data);
}

async function getVehicle(req, res) {
  console.info('getVehicle - req ', req);

  const vehicleId = req.query?.vehicleId || req.body?.vehicleId;

  console.info('getVehicle vehicleId ---', vehicleId);

  const resData = await nodeFetch(
    `https://swapi.dev/api/vehicles/${vehicleId}`
  );

  const data = await resData.json();

  console.info('getVehicle data ---', data);

  res.send(data);
}

async function getStarship(req, res) {
  console.info('getStarship - req ', req);

  const starshipId = req.query?.starshipId || req.body?.starshipId;

  console.info('getStarship starshipId ---', starshipId);

  const resData = await nodeFetch(
    `https://swapi.dev/api/starships/${starshipId}`
  );

  const data = await resData.json();

  console.info('getStarship data ---', data);

  res.send(data);
}

async function getSpecie(req, res) {
  console.info('getSpecies - req ', req);

  const specieId = req.query?.specieId || req.body?.specieId;

  console.info('getSpecie specieId ---', specieId);

  const resData = await nodeFetch(`https://swapi.dev/api/species/${specieId}`);

  const data = await resData.json();

  console.info('getSpecie data ---', data);

  res.send(data);
}

async function getFilm(req, res) {
  console.info('getFilm - req ', req);

  const filmId = req.query?.filmId || req.body?.filmId;

  console.info('getFilm filmId ---', filmId);

  const resData = await nodeFetch(`https://swapi.dev/api/films/${filmId}`);

  const data = await resData.json();

  console.info('getFilm data ---', data);

  res.send(data);
}

module.exports = {
  getPeople,
  getPlanet,
  getVehicle,
  getStarship,
  getSpecie,
  getFilm
};
