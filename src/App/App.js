import './App.css';
import TaskCard from '../Task/TaskCard.js';
import FolderCard from '../Folder/FolderCard.js';
import { useState } from 'react';
import TaskForm from '../Task/TaskForm.js';
import FolderForm from '../Folder/FolderForm.js';
import ETATS, {ETAT_TERMINE} from '../enums.js';
import Modal from '../modal.js'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [tasks, setTasks] = useState([])
  const [folder, setFolder] = useState([])
  const nbTotal = tasks.length
  const nbTotalFolder = folder.length
  const [filtre, setFiltre] = useState("Actives")
  const [filtreDossier, setFiltreDossier] = useState("Tous")
  const [vue, setVue] = useState("tasks")
  const [relations, setRelations] = useState([])
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showFolderModal, setShowFolderModal] = useState(false)

 

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()

    reader.onload = (event) => {
      const data = JSON.parse(event.target.result)
      setTasks(data.taches || [])
      setFolder(data.dossiers || [])
      setRelations(data.relations || [])
      setIsLoaded(true)
    }
    reader.readAsText(file)
  }

const tachesFiltrees = (() => {
  let resultat

  if (filtre === "Tous") {
    resultat = tasks
  } else if (filtre === "Actives") {
    resultat = tasks.filter(task => !ETAT_TERMINE.includes(task.etat))
  } else {
    resultat = tasks.filter(task => task.etat === filtre)
  }

  if (filtreDossier !== "Tous") {
    const tachesDuDossier = relations
      .filter(r => r.dossier === parseInt(filtreDossier))
      .map(r => r.tache)
    resultat = resultat.filter(task => tachesDuDossier.includes(task.id))
  }

 resultat = resultat.sort((a, b) => new Date(b.date_echeance) - new Date(a.date_echeance))
 return resultat
})()

const nbNonTerminees = tasks.filter(task => !ETAT_TERMINE.includes(task.etat)).length

const handleAddTask = (newTask) => {
  setTasks([...tasks, newTask])
  setShowTaskModal(false)
}

const handleAddFolder = (newFolder) => {
  setFolder([...folder, newFolder])
  setShowFolderModal(false)
}

const handleUpdateFolder = (updatedFolder) => {
  setFolder(folder.map(f => f.id === updatedFolder.id ? updatedFolder : f))
}

const handleDeleteFolder = (folderId) => {
  setFolder(folder.filter(f => f.id !== folderId))
  setRelations(relations.filter(r => r.dossier !== folderId)) // supprime aussi les relations
}

const handleAddRelation = (newRelation) => {
  setRelations([...relations, newRelation])
}

const handleUpdateTask = (updatedTask) => {
  setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
}

  return (
  <div className='app'>

    {!isLoaded && (
      <div className="accueil">
        <h1>Ma To-Do List</h1>
        <input type="file" accept=".json" onChange={handleImport} style={{ display: "none" }} id="json-input" />
        <label htmlFor="json-input">
          <button className="import-btn" onClick={() => document.getElementById("json-input").click()}>
            Charger un fichier JSON
          </button>
        </label>
      </div>
    )}

    {isLoaded && (
      <div>
        <div className="header">
          <h1>Ma To-Do List</h1>
          {vue === "tasks" && (
            <button onClick={() => setShowTaskModal(true)}>+ Nouvelle tâche</button>
          )}
          {vue === "folder" && (
            <button onClick={() => setShowFolderModal(true)}>+ Nouveau dossier</button>
          )}
        </div>

        <div className="nav">
          <button className={vue === "tasks" ? "actif" : ""} onClick={() => setVue("tasks")}>Tâches</button>
          <button className={vue === "folder" ? "actif" : ""} onClick={() => setVue("folder")}>Dossiers</button>
        </div>

        {vue === "tasks" && (
          <div>
            <Modal isOpen={showTaskModal} onClose={() => setShowTaskModal(false)}>
              <h3>Nouvelle tâche</h3>
              <TaskForm onAddTask={handleAddTask} />
            </Modal>
            <h2>Filtres</h2>
            <div className='button-group'>
              <button className={filtre === "Actives" ? "actif" : ""} onClick={() => setFiltre("Actives")}>Actives</button>
              <button className={filtre === "Tous" ? "actif" : ""} onClick={() => setFiltre("Tous")}>Tous</button>
              {Object.values(ETATS).map(etat => (
                <button
                  key={etat}
                  className={filtre === etat ? "actif" : ""}
                  onClick={() => setFiltre(etat)}
                >{etat}</button>
              ))}
            <select onChange={e => setFiltreDossier(e.target.value)} value={filtreDossier}>
              <option value="Tous">Tous les dossiers</option>
              {folder.map(f => (
                <option key={f.id} value={f.id}>{f.title}</option>
              ))}
            </select>
            </div>

            
            <h2>Tâches</h2>
            <p>Total : {nbTotal} | Non terminées : {nbNonTerminees}</p>
            {tachesFiltrees.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                relations={relations}
                folders={folder}
                onAddRelation={handleAddRelation}
                onUpdateTask={handleUpdateTask}
              />
            ))}
          </div>
        )}

        {vue === "folder" && (
          <div>
            <Modal isOpen={showFolderModal} onClose={() => setShowFolderModal(false)}>
              <h2>Nouveau dossier</h2>
              <FolderForm onAddFolder={handleAddFolder} />
            </Modal>
            <h2>Dossiers</h2>
            <p>Total : {nbTotalFolder}</p>
            {folder.map(f => (
              <FolderCard key={f.id} folder={f} tasks={tasks} folders={folder} relations={relations}
                onUpdateFolder={handleUpdateFolder} onDeleteFolder={handleDeleteFolder}
                onUpdateTask={handleUpdateTask} onAddRelation={handleAddRelation}      />
            ))}
          </div>
        )}
      </div>
    )}
  </div>
)}

export default App;