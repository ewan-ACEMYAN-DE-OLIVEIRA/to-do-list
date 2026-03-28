# To Do List en REACT

## Fonctionnalités Implémentées :

- Lorsque j'arrive sur l'application, je charge par défaut le backup (fichier JSON).

- Par défaut, je suis en mode Tache et je vois toutes les Taches non terminées ("filtre actif par défaut" = tache.etat ne se trouve pas dans ETAT_TERMINE). Je vois les Taches en cours, avec les 2 premières catégories (mode simple), triées par date d'échéance décroissante.

- Je peux basculer sur la vue des Dossiers à l'aide d'un bouton de mon choix ; je gère ensuite les dossiers avec les méthodes CRUD standards.

- Juste au-dessus de la liste des Taches, si je suis en mode Tache (condition utile uniquement si option / par défaut sinon), j'ai accès aux élément de Tri / Filtre. Je peux trier par Date création, Date échéance, Nom. Je peux aussi filtrer par Dossiers (0, 1 ou n), Etats (0, 1 ou n), ou En cours (le "filtre actif par défaut") ; chaque action sur un élément du filtre en change son statut.

- En haut de la page (Header), je vois le Nb total de Taches (sans filtre), et le Nb non finis (cf "filtre par défaut"). Je vois également le nombre de dossier.

- J'ai un bouton "+" qui permet d'afficher dans une popup (composant Modal), le formulaire de création de Tache (Task).Je peux ajouter un Dossier (Folder).

- Chaque Tache affiche le titre, la date d'échéance ainsi que les 2 premiers dossier ("mode Simple"). Un triangle permet de basculer en "mode Complet", ce qui affiche tous les dossiers et la description.

- En mode Complet, je peux également ajouter un dossier ou basculer en mode édition afin de modifier les champs utiles (titre, description et date échéance)

- Un dossier a son titre dans la couleur de son attribut couleur


## Installation

```bash
git clone <repo-url>
cd mpn-app
npm install
npm start
