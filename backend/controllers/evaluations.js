const { validationResult } = require("express-validator");

const Evaluation = require("../models/evaluations");

//fetch all data from the db
exports.fetchAll = async (req, res, next) => {
  try {
    const [allEvaluations] = await Evaluation.fetchAll();
    res.status(200).json(allEvaluations);
  } catch (err) {
    //catch errors
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//post information to the database
exports.postEvaluation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return console.log(errors);

  const objectif = req.body.objectif;
  const note = req.body.note;
  const enligne = req.body.enligne;
  const fonctionnalite = req.body.fonctionnalite;

  try {
    const EvaluationDetails = {
      //userDetails contains these fields
      objectif: objectif,
      note: note,
      enligne: enligne,
      fonctionnalite: fonctionnalite,
    };

    const result = await Evaluation.save(EvaluationDetails); //result awaits the user infos

    res.status(201).json({ message: "Evaluation saved !" });
  } catch (err) {
    //catch errors
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteEvaluation = async (req, res, next) => {
  try {
    const deleteResponse = await Evaluation.delete(req.params.id); //we are deleting the formation that has that certain id
    res.status(200).json(deleteResponse);
  } catch (err) {
    //catch errors
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
