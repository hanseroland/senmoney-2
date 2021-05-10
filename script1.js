var tabNumeros = ["770000001", "770000002", "770000003", "770000004", "770000005"];
var tabSoldes = [5000000, 1000000, 20000, 3000000, 5000000];
var tabLangues = ["Fr", "En", "Wo"];
var tabFiles = ["donnees_fr.txt", "donnees_en.txt", "donnees_wo.txt"];
var tabCodes = ["0001", "0002", "0003", "0004", "0005"];
var tabNumerosTranfert = [];
var numCourant;
var objLangue = {};


$(document).ready(function() {
   
   async  function getLangues (lg){
      var indice = tabLangues.indexOf(lg);
      var resGetLangues
       await $.get(tabFiles[indice], function( data ) {
         resGetLangues = data.split(";")
         console.log(resGetLangues);
      });
      for(let i = 0; i < resGetLangues.length;i++){
          objLangue['Element' + i] = resGetLangues[i];
      }
      console.log(objLangue.Element0);
      return resGetLangues;     
    }

   async function menu (lg) {

        renderText = await getLangues(lg);
        var rep = window.prompt(renderText[0])
        return rep;
        
    }


    function fonctionIndisponible() {
        alert(objLangue.Element1);
        etapeSuivant();
    }


    function etapeSuivant() {
        var rep = window.prompt(objLangue.Element2);
        if (rep == "1") {
            main();
        } else {
            alert(objLangue.Element3)
        }
    }

    function afficheSolde(num) {
        var indice = tabNumeros.indexOf(num);
        // console.log(num);
        if (indice != -1) {
            var code = window.prompt(objLangue.Element4);
            if (code == tabCodes[indice]) {
                let msg = objLangue.Element5 + " " + tabSoldes[indice];
                alert(msg);
                etapeSuivant();
            }
        } else {
            let msg = objLangue.Element6;
            alert(msg);
            etapeSuivant();
        }
    }

    function tranfert(num) {
        var indice = tabNumeros.indexOf(num);
        var numDestinataire = window.prompt(objLangue.Element7);
        if (numDestinataire.length > 9 || numDestinataire.length < 9) {
            alert(objLangue.Element8);
            etapeSuivant();
        } else {

            var debit = window.prompt(objLangue.Element9);
            if (indice != -1) {
                var newDebit = parseInt(debit);
                var solde = tabSoldes[indice];

                if (newDebit > solde) {
                    alert(objLangue.Element10);
                    etapeSuivant();
                } else {

                    var newSolde = solde - newDebit;
                    tabNumeros.splice(indice, 1, newSolde);
                    tabNumerosTranfert.push(numDestinataire);
                    var text = objLangue.Element11 +" " + debit + " " +objLangue.Element12 + " " + numDestinataire + "\n" +
                    objLangue.Element13 + " " + newSolde;
                    alert(text);
                    etapeSuivant();
                }


            } else {

                let msg = objLangue.Element14;
                alert(msg);
                etapeSuivant();
            }

        }

    }


  async  function main() {
        //var lg = $("lang").val();
        var lg = $("#lang").val();
        var rep = await menu(lg); 
        var numCourant = $("#num").val();
        if(rep != null){
            console.log(rep)
            switch (rep) {
                case "1":
                    afficheSolde(numCourant);
                    break;
                case "2":
                    tranfert(numCourant);
                    break;
                case "3":
                    fonctionIndisponible();
                    break;
                case "4":
                    fonctionIndisponible();
                    break;
            }
        }
       
    }

    $("#btn").click(function() {
        main();
    });

});