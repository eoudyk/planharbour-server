// import seed data files, arrays of objects
const lessonsData = require("../seed-data/lessons");

exports.seed = function (knex) {
  return knex("lessons")
    .del()
    .then(function () {
      return knex("lessons").insert(lessonsData);
    });
};
