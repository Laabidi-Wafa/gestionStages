const db = require("../util/database");

module.exports = class Formations {
  constructor(titre, lieu, dateDeb, dateFin) {
    this.titre = titre;
    this.lieu = lieu;
    this.dateDeb = dateDeb;
    this.dateFin = dateFin;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM formations");
  }

  static save(formations) {
    return db.execute(
      "INSERT INTO formations (titre, lieu, dateDeb, dateFin) VALUES (?, ?, ?,?)",
      [
        formations.titre,
        formations.lieu,
        formations.dateDeb,
        formations.dateFin,
      ]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM formations WHERE id = ?", [id]);
  }
};
