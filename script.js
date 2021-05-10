 
var tabNumeros = ["770000001","770000002", "770000003", "770000004","770000005"];
var tabSoldes = [5000000, 1000000, 20000,3000000, 5000000];
var tabLangues = ["Wo","Fr","En"];
var tabCodes = ["0001","0002","0003","0004","0005"];
var tabNumerosTranfert = [];
var numCourant;


 function menu() {
   var textMenu = ""+
    "1 : Solde du compte\n"+
    "2 : Transfert d'argent\n"+
    "3 : Paiement facture\n"+
    "4 : Option";
    var rep = window.prompt(textMenu);
    return rep;

 }




    function etapeSuivant() {
        var textRep = "Voulez vous continuez ?\n"+
        "1 : OUI\n"+
        "2 : NON";

        var rep = window.prompt(textRep);
        if(rep == "1"){
            main();
        }else{
            alert("Au revoir!")
        }
    }

    function afficheSolde(num) {
        var indice = tabNumeros.indexOf(num);
       // console.log(num);
        if(indice != -1){
            var code = window.prompt("Donnez votre code: ");
            if(code==tabCodes[indice]){
                let msg = "Votre solde est de : "+tabSoldes[indice];
                alert(msg);
                etapeSuivant();              
            }
        }else{
              let msg = "Votre numéro  n'existe pas!";
              alert(msg);
              etapeSuivant();
        }
    }

    function tranfert(num){
        var indice = tabNumeros.indexOf(num);
        var numDestinataire = window.prompt("Entrer le numéro du destinataire");
        if(numDestinataire.length > 9 || numDestinataire.length < 9){
             alert("Ce numéro n'est pas valide");
             etapeSuivant();
        }else{

            var debit = window.prompt("Entrer le montant de transfert");
            if(indice != -1){
                var newDebit = parseInt(debit);
                var solde = tabSoldes[indice];

                if(newDebit > solde ){
                    alert("Votre solde est insuffisant");
                    etapeSuivant();
                }else{
    
                    var newSolde = solde - newDebit;
                    tabNumeros.splice(indice,1, newSolde);
                    tabNumerosTranfert.push(numDestinataire);
                     var text = "Vous avez transféré "+debit+" au "+numDestinataire+"\n"+
                                "Votre nouveau solde est de : "+newSolde;
                    alert(text);
                    etapeSuivant();    
                }
    
                
            }else{
    
                let msg = "Votre numéro  n'existe pas!";
                alert(msg);
                etapeSuivant();
            }
    
        }
       
    }


 function main(){
     var rep = menu();
     var numCourant = document.getElementById("num").value;
     switch(rep){
        case "1":
            afficheSolde(numCourant);
            break;
        case "2":
            tranfert(numCourant);
            break;
     }
 }



