import { useState } from "react";
import ETATS from '../enums.js';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date_echeance, setDateEcheance] = useState("")
  const [etat, setEtat] = useState("En cours")
  const [equipiers, setEquipiers] = useState("")

  const handleSubmit = () => {
    const newTask = {
      id: Date.now(), 
      title,
      description,
      date_creation: new Date().toISOString().split("T")[0],
      date_echeance,
      etat,
      equipiers: equipiers.split(",").map(e => ({ name: e.trim() })).filter(e => e.name)
    }
    onAddTask(newTask)
  }

  return (
    <div>
      <input placeholder="Titre" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input type="date" onChange={e => setDateEcheance(e.target.value)} />
      <select onChange={e => setEtat(e.target.value)}>
      {Object.values(ETATS).map(etat => (
          <option key={etat} value={etat}>{etat}</option>
      ))}   
    </select>
      <input placeholder="Équipiers" onChange={e => setEquipiers(e.target.value)} />            {/*à séparer par des virgules*/}

      <button onClick={handleSubmit}>Créer la tâche</button>
    </div>
  )
}