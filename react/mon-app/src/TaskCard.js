export default function TaskCard({task}){
    return(
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Créée le : {task.date_creation}</p>
            <p>Echeance : {task.date_echeance}</p>
            <p>{task.etat}</p>
            <p>Équipiers : {(task.equipiers || []).map(e => e.name).join(", ") || "Aucun"}</p>
        </div>
    )
}