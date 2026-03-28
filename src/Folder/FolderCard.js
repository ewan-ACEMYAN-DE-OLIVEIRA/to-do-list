import { useState } from "react"
import TaskCard from "../Task/TaskCard"

export default function FolderCard({ folder, tasks, folders, relations, onUpdateFolder, onDeleteFolder, onUpdateTask, onAddRelation}) {
  const [showTasks, setShowTasks] = useState(false)
  const [modeEdition, setModeEdition] = useState(false)
  const [title, setTitle] = useState(folder.title)
  const [description, setDescription] = useState(folder.description)
  const [color, setColor] = useState(folder.color)
  const [icon, setIcon] = useState(folder.icon)

  const tachesDuDossier = relations
    .filter(r => r.dossier === folder.id)
    .map(r => tasks.find(t => t.id === r.tache))
    .filter(Boolean)

  const handleSave = () => {
    onUpdateFolder({ ...folder, title, description, color, icon })
    setModeEdition(false)
  }

  return (
    <div>
      {modeEdition ? (
        <div>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <input value={description} onChange={e => setDescription(e.target.value)} />
          <input value={color} onChange={e => setColor(e.target.value)} />
          <input value={icon} onChange={e => setIcon(e.target.value)} />
          <button onClick={handleSave}>Sauvegarder</button>
          <button onClick={() => setModeEdition(false)}>Annuler</button>
        </div>
      ) : (
        <div>
          <h3 style={{ color: folder.color }}>{folder.title}</h3>          <p>{folder.description}</p>
          <button onClick={() => setModeEdition(true)}>Modifier</button>
          <button onClick={() => onDeleteFolder(folder.id)}>Supprimer</button>
        </div>
      )}

      <button onClick={() => setShowTasks(!showTasks)}>
        {showTasks ? "Masquer les tâches" : `Voir les tâches (${tachesDuDossier.length})`}
      </button>

      {showTasks && (
        <div>
          {tachesDuDossier.length === 0
            ? <p>Aucune tâche dans ce dossier</p>
            : tachesDuDossier.map(task => (
                <TaskCard key={task.id} task={task} relations={relations} folders={folders} onUpdateTask={onUpdateTask} onAddRelation={onAddRelation} />
              ))
          }
        </div>
      )}
    </div>
  )
}