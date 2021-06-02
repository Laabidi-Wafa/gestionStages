const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

const evaluationController = require("../Controllers/evaluations");

const auth = require("../middleware/auth");

router.get("/", auth, evaluationController.fetchAll);

router.post(
  "/",
  auth,
  [
    body("objectif").trim().isLength({ min: 3 }).not().isEmpty(),
    body("note").trim().isLength({ max: 2 }).not().isEmpty(),
    body("enligne").trim().not().isEmpty(),
    body("fonctionnalite").trim().not().isEmpty(),
  ],
  evaluationController.postEvaluation
);

router.delete("/:id", auth, evaluationController.deleteEvaluation);

module.exports = router;
