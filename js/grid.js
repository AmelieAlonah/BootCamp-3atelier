
const grid = 
{

  // La grille
  cells: [
    ['', 'b', 'b', 'b', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', 'b', '', ''],
    ['', '', '', '', '', 'b', '', ''],
    ['', '', '', '', '', 'b', '', ''],
    ['', '', '', '', '', 'b', '', ''],
    ['b', 'b', 'b', 'b', 'b', '', '', ''],
    ['', '', '', '', '', '', '', '']
  ],

  headers: {
    rows: [1, 2, 3, 4, 5, 6, 7, 8],
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  },

  init: function() 
  {

  },

  display: function() 
  {
    console.log('  ' + grid.headers.columns.join(' '));

    for( let rowIndex = 0; rowIndex < 8; rowIndex++ ) 
    {
      let stringLine = grid.headers.rows[rowIndex];
      stringLine += ' ';

      for( let columnIndex = 0; columnIndex < 8; columnIndex++ ) 
      {
        const currentChar = grid.cells[rowIndex][columnIndex];

        if( currentChar === '' ) 
        {
          stringLine += '~';
        } 
        else 
        {
          stringLine += currentChar;

          let currentCell = document.querySelector('#cell' + rowIndex + columnIndex);

          if( currentChar === 't' ) 
          {
            currentCell.classList.add('hit');
          } 
          else if( currentChar === 'p' ) 
          {
            currentCell.classList.add('splash');
          }
        }

        stringLine += ' ';
      }

      console.info(stringLine);
    }
  },

  getIndexes: function(cell) 
  {
    const letter = cell.substring(0, 1);
    let rowIndex = cell.substring(1, 2);

    console.log(letter);
    console.log(rowIndex);

    rowIndex = parseInt(rowIndex);
    rowIndex = rowIndex - 1;

    let columnIndex;

    for( const currentIndex in grid.headers.columns ) 
    {
      const currentLetter = grid.headers.columns[currentIndex];
      if( currentLetter === letter )
      {
        columnIndex = currentIndex;
      }
    }

    return [rowIndex, columnIndex];
  },

  addCellNames: function() 
  {
    // On récupère toutes les lignes d'abord
    const rowElements = document.querySelectorAll('.row');

    // On parcourt toutes les lignes
    for( let rowIndex = 0; rowIndex < rowElements.length; rowIndex++ ) 
    {
      // On récupère l'élément "row" courant
      const rowElement = rowElements[rowIndex];

      // On récupère toutes les cellules de la ligne
      const cellElements = rowElement.querySelectorAll('div.cell');

      // On parcourt tous les éléments trouvés
      for( let columnIndex = 0; columnIndex < cellElements.length; columnIndex++ ) 
      {
        // On fait l'inverse de
        // let columnIndex = letterIndex.codePointAt(0) - 65;
        let letter = String.fromCodePoint(columnIndex + 65); // ouai, c'est chaud là

        // On récupère la cellule courante
        let cellElement = cellElements[columnIndex];

        // console.log(' => ' + letter + rowIndex);

        // On peut désormais ajouter le dataset sur la cellule
        cellElement.dataset.cellName = letter + rowIndex;
      }
    }
  },

  // Fonction permettant de vérifier si la case demandée par l'utilisateur est correcte/existe
  checkCellName: function(cellName) 
  {
    const cellElement = document.querySelector('.cell[data-cell-name="' + cellName + '"]');

    if( cellElement !== null ) 
    {
      return true;
    } 
    else 
    {
      return false;
    }
  },

  create: function() 
  {
    const gridElement = document.querySelector('#grid');

    const headerRow = document.createElement('section');
    headerRow.classList.add('row');

    const firstColumn = document.createElement('header');
    firstColumn.classList.add('cell');

    headerRow.appendChild(firstColumn);

    // Les 8 colonnes
    for( let i = 0; i < 8; i++ ) 
    {
      const currentColumn = document.createElement('header');
      currentColumn.classList.add('cell');
      currentColumn.textContent = grid.headers.columns[i];

      headerRow.appendChild(currentColumn);
    }

    //ajouter cette ligne d'entête à la grille
    gridElement.appendChild(headerRow);

    //pour chaque ligne
    for( let rowIndex = 0; rowIndex < 8; rowIndex++ ) 
    {
      const currentRow = document.createElement('section');
      currentRow.classList.add('row');

      const currentFirstColumn = document.createElement('header');
      currentFirstColumn.classList.add('cell');
      currentFirstColumn.textContent = grid.headers.rows[rowIndex];
      
      currentRow.appendChild(currentFirstColumn);

      // Créer 8 colonnes <div class="cell" id="cell00"></div>
      for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
        const currentColumn = document.createElement('div');
        currentColumn.classList.add('cell');
        currentColumn.id = 'cell' + rowIndex + columnIndex;

        currentRow.appendChild(currentColumn);
      }

      // ajouter cette ligne à la grille
      gridElement.appendChild(currentRow);
    }

    // On ajoute les data-cell-name une fois la grille créée
    grid.addCellNames();
  }
};
