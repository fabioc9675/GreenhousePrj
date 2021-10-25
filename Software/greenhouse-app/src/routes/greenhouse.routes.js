const express = require("express");
const router = express.Router();

const Greenhouse = require("../models/greenhouse");

// reading data from database
router.get("/", async (req, res) => {
  // make a request for the database
  const greenhouse = await Greenhouse.find();
  // when client ask for '/' server response
  res.json(greenhouse);
});

// reading data by id
router.get("/id/:id", async (req, res) => {
  // make a request to the database
  const greenhouse = await Greenhouse.findById(req.params.id);
  // when client ask for '/' server response
  res.json(greenhouse);
});

// reading last data by institution
router.get("/last/inst/:inst", async (req, res) => {
  // make a request to the database
  // Examples
  // http://localhost:3000/api/greenhouse/inst/UdeA
  const institute = req.params.inst;
  const greenhouse = await Greenhouse.find({
    institution: institute,
  })
    .limit(1)
    .sort({ $natural: -1 });
  // when client ask for '/' server response
  res.json(greenhouse);
});

// reading data by institution
router.get("/inst/:inst", async (req, res) => {
  // make a request to the database
  // Examples
  // http://localhost:3000/api/greenhouse/inst/UdeA
  const institute = req.params.inst;
  const greenhouse = await Greenhouse.find({
    institution: institute,
  }).sort({ createdAt: 1 });
  // when client ask for '/' server response
  res.json(greenhouse);
});

// reading dates actives by institution
router.get("/datesInst/:inst", async (req, res) => {
  // make a request to the database
  // Examples
  // http://localhost:3000/api/greenhouse/inst/UdeA
  const institute = req.params.inst;
  const greenhouse = await Greenhouse.find(
    {
      institution: institute,
    },
    { createdAt: 1, _id: 0 } // asking just for createdAt without _id
  );
  // when client ask for '/' server response
  res.json(greenhouse);
});

// reading data by institution and numHouse
router.get("/inst/:inst/numH/:numH", async (req, res) => {
  // make a request to the database
  // Examples
  // http://localhost:3000/api/greenhouse/inst/UdeA/numH/1
  const institute = req.params.inst;
  const numHouse = req.params.numH;
  const greenhouse = await Greenhouse.find({
    institution: institute,
    numHouse: numHouse,
  }).sort({ createdAt: 1 });
  // when client ask for '/' server response
  res.json(greenhouse);
});

// reading data by institution and date
router.get("/inst/:inst/date/:start/:end", async (req, res) => {
  // make a request to the database
  // Examples
  // http://localhost:3000/api/greenhouse/inst/UdeA/date/2021-10-07/2021-10-08T10:00:00Z
  const institute = req.params.inst;
  const start = new Date(req.params.start);
  const end = new Date(req.params.end);
  const greenhouse = await Greenhouse.find({
    institution: institute,
    createdAt: {
      $gte: start,
      $lt: end,
    },
  }).sort({ createdAt: 1 });
  // when client ask for '/' server response
  res.json(greenhouse);
});

// reading data by institution, numHouse and date
router.get("/inst/:inst/numH/:numH/date/:start/:end", async (req, res) => {
  // make a request to the database
  // Examples
  // http://localhost:3000/api/greenhouse/inst/UdeA/numH/1/date/2021-10-07/2021-10-08T10:00:00Z
  const institute = req.params.inst;
  const numHouse = req.params.numH;
  const start = new Date(req.params.start);
  const end = new Date(req.params.end);
  const greenhouse = await Greenhouse.find({
    institution: institute,
    numHouse: numHouse,
    createdAt: {
      $gte: start,
      $lt: end,
    },
  }).sort({ createdAt: 1 });
  // when client ask for '/' server response
  res.json(greenhouse);
});

// Adding data to the database // {"institution":"UdeA","numHouse":1,"temp_env":25.0,"mois_env":74,"radi_env":12,"temp_earth":[12.5,25.3,14.2,12.2],"humi_earth":[14,15,12,13]}
router.post("/", async (req, res) => {
  const {
    institution,
    numHouse,
    temp_env,
    mois_env,
    radi_env,
    temp_earth,
    humi_earth,
  } = req.body;
  const greenhouse = new Greenhouse({
    institution,
    numHouse,
    temp_env,
    mois_env,
    radi_env,
    temp_earth,
    humi_earth,
  });
  console.log(greenhouse);
  await greenhouse.save();
  res.json({ status: "Greenhouse Recorded" });
});

// Update data
router.put("/id/:id", async (req, res) => {
  const {
    institution,
    numHouse,
    temp_env,
    mois_env,
    radi_env,
    temp_earth,
    humi_earth,
  } = req.body;
  const greenhouse = {
    institution,
    numHouse,
    temp_env,
    mois_env,
    radi_env,
    temp_earth,
    humi_earth,
  };
  await Greenhouse.findByIdAndUpdate(req.params.id, greenhouse);
  res.json({ status: "Greenhouse Modified" });
});

// Delete data
router.delete("/id/:id", async (req, res) => {
  await Greenhouse.findByIdAndRemove(req.params.id);
  res.json({ status: "Greenhouse Deleted" });
});

module.exports = router;
