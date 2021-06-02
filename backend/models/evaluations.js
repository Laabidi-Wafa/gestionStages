const db = require("../util/database");

module.exports = class Evaluations {
  constructor(objectif, note, enligne, fonctionnalite) {
    this.objectif = objectif;
    this.note = note;
    this.enligne = enligne;
    this.fonctionnalite = fonctionnalite;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM evaluations");
  }

  static save(evaluations) {
    return db.execute(
      "INSERT INTO evaluations (objectif, note, enligne, fonctionnalite) VALUES (?, ?, ?,?)",
      [
        evaluations.objectif,
        evaluations.note,
        evaluations.enligne,
        evaluations.fonctionnalite,
      ]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM evaluations WHERE id = ?", [id]);
  }
};
