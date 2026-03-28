import { useState } from "react";

export default function FolderForm({ onAddFolder }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [color, setColor] = useState("")
  const [icon, setIcon] = useState("")

  const handleSubmit = () => {
    const newFolder = {
      id: Date.now(), 
      title,
      description,
      color,
      icon
    }
    onAddFolder(newFolder)
  }

  return (
    <div>
      <input placeholder="Titre" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input placeholder="Couleur" onChange={e => setColor(e.target.value)} />
      <input placeholder="Icône" onChange={e => setIcon(e.target.value)} />
      <button onClick={handleSubmit}>Créer le dossier</button>
    </div>
  )
}