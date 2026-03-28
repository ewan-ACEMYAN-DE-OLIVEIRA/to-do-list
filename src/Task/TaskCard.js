import { useState } from "react"

export default function TaskCard({ task, relations, folders, onUpdateTask, onAddRelation }) {
  const [modeComplet, setModeComplet] = useState(false)
  const [modeEdition, setModeEdition] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [dateEcheance, setDateEcheance] = useState(task.date_echeance)
  const [dossierChoisi, setDossierChoisi] = useState("")
  const [showAddDossier, setShowAddDossier] = useState(false)

  const dossiersDeLaTache = (relations || [])
    .filter(r => r.tache === task.id)
    .map(r => (folders || []).find(f => f.id === r.dossier))
    .filter(Boolean)

  const dossierAffiches = modeComplet
    ? dossiersDeLaTache
    : dossiersDeLaTache.slice(0, 2)

  const handleSave = () => {
    onUpdateTask({ ...task, title, description, date_echeance: dateEcheance })
    setModeEdition(false)
  }

  const handleAddDossier = () => {
    if (!dossierChoisi) return
    onAddRelation({ tache: task.id, dossier: parseInt(dossierChoisi) })
    setShowAddDossier(false)
    setDossierChoisi("")
  }

  return (
    <div>

      {modeEdition ? (
        <div>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <input type="date" value={dateEcheance} onChange={e => setDateEcheance(e.target.value)} />
        </div>
      ) : (
        <div>
          <h2>{task.title}</h2>
          <p>Échéance : {task.date_echeance}</p>
        </div>
      )}

      {dossierAffiches.map(f => (
        <span key={f.id}> {f.title} </span>
      ))}
      {dossiersDeLaTache.length > 2 && !modeComplet && (
        <span>+{dossiersDeLaTache.length - 2} dossier(s)</span>
      )}

      {modeComplet && (
        <div>

          {modeEdition ? (
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
          ) : (
            <p>Description :{task.description || "Aucune description"}</p>
          )}

          <p>Créée le : {task.date_creation}</p>
          <p>Etat : {task.etat}</p>
          <p>Équipiers : {(task.equipiers || []).map(e => e.name).join(", ") || "Aucun"}</p>

          <div>
            {modeEdition ? (
              <>
                <button onClick={handleSave}>Sauvegarder</button>
                <button onClick={() => setModeEdition(false)}>Annuler</button>
              </>
            ) : (
              <button onClick={() => setModeEdition(true)}>Modifier</button>
            )}

            <button onClick={() => setShowAddDossier(!showAddDossier)}>Ajouter un dossier</button>
            {showAddDossier && (
              <div>
                <select onChange={e => setDossierChoisi(e.target.value)} value={dossierChoisi}>
                  <option value="">Choisir un dossier</option>
                  {(folders || [])
                    .filter(f => !dossiersDeLaTache.find(d => d.id === f.id)) // exclut les dossiers déjà liés
                    .map(f => (
                      <option key={f.id} value={f.id}>{f.title}</option>
                    ))
                  }
                </select>
                <button onClick={handleAddDossier}>Confirmer</button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setModeComplet(!modeComplet)}
        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}
      >
        {modeComplet ? "▲" : "▼"}
      </button>
    </div>
  )
}