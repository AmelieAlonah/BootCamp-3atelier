
const stats = 
{
  // On créé une variable qui va stocker le score du joueur
  // au fur et a mesure de la partie
  score : 0,

  highScores : [],

  displayHits: function() 
  {
    const hitElements = document.querySelectorAll('.hit');

    let hits = [];
    for( const currentElement of hitElements ) 
    {
      hits.push(currentElement.dataset.cellName);
    }
    console.log('Les cases touchées sont ' + hits.join(', '));
  },

  addAction: function( coord, result ) 
  {
    let actionsList = document.querySelector( "#actions" );
    let action = document.createElement("div");
    
    action.textContent = "Tour " + game.turn + " - Tir en " + coord + " : " + result;

    action.style.textAlign = "left";
    action.style.backgroundColor = "#222222";
    action.style.padding = "5px";

    actionsList.prepend( action );
  },

  displayStats: function() 
  {
    const shotsFired = game.turn - 1;

    // On va récupérer TOUTES les cases avec la classe .hit
    const hits = document.querySelectorAll( ".hit" );
    const hitsCount = hits.length;
    const hitsPercent = hitsCount / shotsFired * 100;

    const splash = document.querySelectorAll( ".splash" );
    const splashCount = splash.length;
    const splashPercent = splashCount / shotsFired * 100;

    let message = "Tirs totaux : " + shotsFired + "\n";
    message += "Tirs réussis : " + hitsCount + " ( " + hitsPercent.toFixed(2) + "%)\n";
    message += "Tirs manqués : " + splashCount + " ( " + splashPercent.toFixed(2) + "% )\n";

    alert( message );
  }
};