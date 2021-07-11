
const app = 
{
  themes : [ 'f0f', 'black-and-white', 'terminal', 'dark' ],

  cookies : {},

  timerID : null,

  init: function() 
  {    
    app.loadCookies()
    app.switchTheme( app.cookies.battleshipTheme );

    const formElement = document.querySelector('#attackForm');
    formElement.addEventListener( 'submit', app.handleSubmitAttackForm );
    document.querySelector('#stats').addEventListener( 'click', app.handleStatsClick );
    document.querySelector('#toggle-actions').addEventListener( 'click', app.handleActionsToggle );

    const themeSelect = document.querySelector( "#selectTheme" );
    themeSelect.addEventListener( "change", app.handleThemeSelect );
    app.timerID = setInterval( app.handleInterval, 1000 );

    const themesToJSON = JSON.stringify( app.themes );
    const themesFromJSON = JSON.parse( themesToJSON );

    stats.highScores = JSON.parse( localStorage.getItem( "battleshipHighscores" ) );

    if( stats.highScores == null )
      stats.highScores = [];

    app.handleNewGame();
  },

  // Fonction qui sera appellée toutes les secondes (grace a setInterval)
  handleInterval: function()
  {
    stats.score -= 1000;
  },

  // Fonction qui va lire les cookies dispo et les stocker dans un tableau
  loadCookies : function()
  {
    const cookiesString = document.cookie;

    let cookiesCut = cookiesString.split( ";" );

    // for( const cookie of cookiesCut )
    // {
    //   const splitCookie = cookie.split( "=" );
    //   app.cookies[ splitCookie[0].trim() ] = splitCookie[1].trim();
    // }
  },

  // La fonction "handler" qui sera exécutée à la soumission du formulaire
  handleSubmitAttackForm: function(evt) 
  {
    console.log('form submitted');
    evt.preventDefault();

    const formElement = evt.currentTarget;
    const inputElement = formElement.querySelector('input');
    const inputValue = inputElement.value; 

    if (grid.checkCellName(inputValue)) {
      game.sendMissile(inputValue);
    } else {
      alert('Case incorrecte');
    }
    inputElement.value = '';
  },

  handleStatsClick: function(evt) 
  {
    stats.displayStats();
  },

  handleActionsToggle: function(evt) 
  {
    // On récupère la div actions
    const actionsHistoryElement = document.querySelector('#actions');

    if (actionsHistoryElement.style.display === 'none' || actionsHistoryElement.style.display === '') {

      actionsHistoryElement.style.display = 'block';
    } else {
      console.log(actionsHistoryElement.style.display);
      actionsHistoryElement.style.display = 'none';
    }
  },

  handleNewGame: function() 
  {
    game.init();
  },

  handleThemeSelect: function( evt )
  {
    const selectElement = evt.currentTarget;
    const newTheme = selectElement.value;
    app.switchTheme( newTheme );

    document.cookie = "battleshipTheme=" + newTheme;    
  },

  // Cette fonction va s'occuper UNIQUEMENT de mettre le theme passé en paramètre comme classe de body
  switchTheme: function( newTheme )
  {
    const bodyElement = document.querySelector( 'body' );
    for( const theme of app.themes )
    {
      bodyElement.classList.remove( theme );
    }

    bodyElement.classList.add( newTheme );
  }
};

// On lance la fonction app.init une fois la page chargée
document.addEventListener('DOMContentLoaded', app.init);
