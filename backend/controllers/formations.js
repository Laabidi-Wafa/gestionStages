const { validationResult } = require('express-validator');

const Formations = require('../models/formations');

//fetch all data from the db
exports.fetchAll = async (req, res, next) => {
    try{
        const [allFormations] = await Formations.fetchAll();
        res.status(200).json(allFormations);

    }
    catch (err) { //catch errors
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }

}


//post information to the database
exports.postFormation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return console.log(errors);

  const titre = req.body.titre;
  const lieu = req.body.lieu;
  const dateDeb = req.body.dateDeb;
  const dateFin = req.body.dateFin;

  try {
    

    const formationsDetails = { //userDetails contains these fields
      titre: titre,
      lieu: lieu,
      dateDeb: dateDeb,
      dateFin: dateFin,

    };

    const result = await Formations.save(formationsDetails); //result awaits the user infos

    res.status(201).json({ message: 'Formation saved !' }); 
   } catch (err) { //catch errors
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteFormation = async (req, res, next) => {
    try{
        const deleteResponse = await Formations.delete(req.params.id); //we are deleting the formation that has that certain id
        res.status(200).json(deleteResponse);

    }
    catch (err) { //catch errors
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }

}
