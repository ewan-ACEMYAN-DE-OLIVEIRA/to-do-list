export default class Task {
  constructor(id, title, description, date_creation, date_echeance, etat, equipiers) {
    this.id = id
    this.title = title
    this.description = description
    this.date_creation = date_creation
    this.date_echeance = date_echeance
    this.etat = etat
    this.equipiers = equipiers
  }
}