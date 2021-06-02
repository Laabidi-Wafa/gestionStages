const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

const formationsController = require("../Controllers/formations");

const auth = require("../middleware/auth");

router.get("/", auth, formationsController.fetchAll);

router.post(
  "/",
  auth,
  [
    body("titre").trim().isLength({ min: 5 }).not().isEmpty(),
    body("lieu").trim().isLength({ min: 5 }).not().isEmpty(),
    body("dateDeb").trim().not().isEmpty(),
    body("dateFin").trim().not().isEmpty(),
  ],
  formationsController.postFormation
);

router.delete("/:id", auth, formationsController.deleteFormation);

module.exports = router;
