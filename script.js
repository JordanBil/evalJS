class Utilisateur {
    constructor(nom, publication = [], groupes = []) {
        this.nom = nom;
        this.publication = publication; 
        this.groupes = groupes;
        this.motsInterdits = ["fck", "fcked"];
    }

    publier(contenu){
        for (const mot of this.motsInterdits) {
            if (contenu.includes(mot)) {
                throw new Error("Erreur : Contenu inapproprié détecté.");
            }
        }
        this.publication.push(new Publication(this.nom, contenu));
    }
}

class Publication {
    constructor(auteur, contenu, commentaires) {
        this.auteur = auteur;
        this.contenu = contenu;
        this.commentaires = commentaires || [];
        this.banWord = ["idiot","stupide"];
    }

    ajouterCommentaire (commentaire){
        for (const com of this.banWord) {
            if (commentaire.includes(com)) {
                throw new Error("Erreur : Contenu inapproprié détecté.");
            }
        }  
        this.commentaires.push(commentaire);     
        console.log(`Commentaire ajouté : "${commentaire}"`);
    }
}

class Commentaire {
    constructor(auteur, contenu) {
        this.auteur = auteur;
        this.contenu = contenu;
    }
}

class Groupe {
    constructor(nom, membres, estPrivé) {
        this.nom = nom;
        this.membres = membres || [];
        this.estPrivé = estPrivé;
    }

    ajouterMembres(utilisateur){
        this.membres.push(utilisateur); 
        utilisateur.groupes.push(this);
        console.log(`${utilisateur.nom} a été ajouté au groupe ${this.nom}`);
    }

    afficherContenu(utilisateur){
        if (this.estPrivé && !this.membres.includes(utilisateur)) {
            throw new Error("Erreur : Vous n'avez pas accès à ce groupe.");
        }
        this.membres.forEach(membre => {
            membre.publication.forEach(pub => {
                console.log(`${membre.nom} a publié: ${pub.contenu}`);
            });
        });
    }
}


const groupePublic = new Groupe("Public");
const groupePrive = new Groupe("Privé", [], true);


const alice = new Utilisateur("Alice");
const bob = new Utilisateur("Bob");


alice.publier("Salut tout le monde !");


bob.publier("Ceci est une publication privée.");

alice.publication = [new Publication(alice.nom, "Salut tout le monde !")];
bob.publication = [new Publication(bob.nom, "Ceci est une publication privée.")];

groupePublic.ajouterMembres(alice);
groupePrive.ajouterMembres(bob);

groupePublic.afficherContenu(alice); 

groupePrive.afficherContenu(bob); 

try {
    groupePrive.afficherContenu(alice); 
} catch (error) {
    console.error(error.message);
}

const comment1 = new Commentaire("Alice", "Super publication !");
bob.publication[0].ajouterCommentaire(comment1.contenu);

try {
    const comment2 = new Commentaire("Bob", "C'est stupide !");
    bob.publication[0].ajouterCommentaire(comment2.contenu); 
} catch (error) {
    console.error(error.message);
}