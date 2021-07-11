
const game = 
{
  turn: 1,

  init: function()   
  {
    game.turn = 1;

    grid.cells = [
      ['b', '', 'b', 'b', 'b', '', '', ''],
      ['b', '', '', '', '', '', '', ''],
      ['b', '', '', '', '', 'b', '', ''],
      ['', '', '', '', '', 'b', '', ''],
      ['', '', '', '', '', 'b', '', ''],
      ['', '', '', '', '', 'b', '', ''],
      ['b', 'b', 'b', 'b', '', '', '', ''],
      ['', '', '', '', '', '', '', '']
    ];

    grid.create();
    grid.display();

    const cells = document.querySelectorAll( "div.cell" );

    for( let index = 0; index < cells.length ; index++ )
    {
      cells[index].addEventListener( "click", game.handleClickOnCell );
    }
  },

  handleClickOnCell : function( evt )
  {
    const clickedCell = evt.currentTarget;

    // J'accède au nom de la case grace à dataset
    const clickedCellName = clickedCell.dataset.cellName;
    game.sendMissile( clickedCellName );
  },
  
  newTurn: function() 
  {
    game.turn++;
    document.querySelector('h3').textContent = game.turn;
    game.checkGameOver();
  },

  sendMissileAt: function(rowIndex, columnIndex) 
  {
    const targetCell = grid.cells[rowIndex][columnIndex];

    const coords = grid.headers.rows[rowIndex] + "" + grid.headers.columns[columnIndex];

    let retBattleHit = false;
    if( targetCell === 'b' ) 
    {

      grid.cells[rowIndex][columnIndex] = 't';
      retBattleHit = true;

      stats.score += 30000;

      stats.addAction( coords, "Touché !" );
    } 
    else if( targetCell === 't' ) 
    { 
      console.log('bateau déjà touché à cette case :/');
      stats.addAction( coords, "Bateau déjà touché !" );
    } 
    else if( targetCell === 'p' ) 
    { 
      console.log('Missile déja envoyé sur cette case, sans toucher de bateau');
      stats.addAction( coords, "Missile déjà raté !" );
    } 
    else 
    {
      console.log('plouf');
      grid.cells[rowIndex][columnIndex] = 'p';
      stats.score -= 9000;

      stats.addAction( coords, "Raté !" );
    }

    grid.display();

    if( targetCell === 'b' ) 
    {
      stats.displayHits();
    }

    if( targetCell === 'b' || targetCell === '' ) 
    {
      game.newTurn();
    }

    return retBattleHit;
  },

  sendMissile: function(cellName) 
  {
    const [rowIndex, columnIndex] = grid.getIndexes(cellName);
    return game.sendMissileAt(rowIndex, columnIndex);
  },
  
  checkGameOver: function() 
  {
    let remainingBoatCell = 0;

    for( const row of grid.cells ) 
    {
      for( const cell of row )
      {
        if( cell === 'b' ) 
        {
          remainingBoatCell++;
        }
      }
    }

    if( remainingBoatCell === 0 ) 
    {
      clearInterval( app.timerID );

      const scoreObject = { 
        username : "pofpof", 
        score : stats.score 
      };

      stats.highScores.push( scoreObject );

      localStorage.setItem( "battleshipHighscores", JSON.stringify( stats.highScores ) );
      
      alert('Game Over - Score : '+ stats.score +' !');
      return true;
    } 
    else 
    {
      return false;
    }
  }
};