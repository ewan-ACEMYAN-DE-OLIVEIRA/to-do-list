import './App.css';
import TaskCard from './TaskCard.js';
import FolderCard from './FolderCard.js';
import { useState } from 'react';
import TaskForm from './TaskForm';
import ETATS, {ETAT_TERMINE} from './enums.js';

function App() {
  const [tasks, setTasks] = useState([])
  const [folder, setFolder] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [filtre, setFiltre] = useState("Tous")
  const [vue, setVue] = useState("tasks")
  const [nb, setNb] = useState("tasks")

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result)
      console.log(data)
      setTasks(data.tasks)
      setFolder(data.folder)
    }
    reader.readAsText(file)
  }

  const tachesFiltrees = filtre === "Tous"
    ? tasks.filter(task => !ETAT_TERMINE.includes(task.etat))
    : tasks.filter(task => task.etat === filtre)



  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask])
    setShowForm(false)
  }

  return (
    <div>
      <h1>Ma To-Do List</h1>

      <input
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: "none" }}
        id="json-input"
      />
      <label htmlFor="json-input">
        <button onClick={() => document.getElementById("json-input").click()}>
          Importer un fichier JSON
        </button>
      </label>

      <button onClick={() => setVue(vue === "tasks" ? "folder" : "tasks")}>
        {vue === "tasks" ? "Dossiers" : "Tâches"}
      </button>


      {vue === "tasks" && (
        <div>
          <button onClick={() => setShowForm(!showForm)}>+ Nouvelle tâche</button>
          {showForm && <TaskForm onAddTask={handleAddTask} />}

          <div>
            <button onClick={() => setFiltre("Tous")}>Tous</button>
            {Object.values(ETATS).map(etat => (
              <button key={etat} onClick={() => setFiltre(etat)}>{etat}</button>
            ))}
          </div>

          {tachesFiltrees.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {vue === "folder" && (
        <div>
          <h2>Dossiers</h2>
          {console.log("folders:", folder)}
          {folder.map(folder => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App;
