export default function FolderCard({folder}){
    return(
        <div>
            <h2>Titre : {folder.title}</h2>
            <p>Description : {folder.description}</p>
            <p>Couleur : {folder.color}</p>
            <p>Icon : {folder.icon}</p>
            <p>Type : {folder.type}</p>
        </div>
    )
}