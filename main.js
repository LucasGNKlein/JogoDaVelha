document.addEventListener('DOMContentLoaded', () => { //utilizamos o evento DOMContentLoaded para garantir que o código seja executado após o carregamento da página.
    const cells = document.querySelectorAll('.cell'); //selecionamos todas as células do tabuleiro usando querySelectorAll('.cell') e armazenamos em uma variável chamada cells.
    let currentPlayer = 'X'; //Definimos duas variáveis: currentPlayer (inicialmente 'X') representa o jogador atual ('X' ou 'O') e gameEnded (inicialmente false) indica se o jogo terminou.
    let gameEnded = false;

    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick); //Adicionamos um event listener para cada célula do tabuleiro utilizando forEach e addEventListener. O evento utilizado é o click, e o manipulador de eventos é a função handleCellClick.
    });

    function handleCellClick() { //A função handleCellClick é chamada sempre que uma célula é clicada. Primeiro, ela verifica se o jogo já terminou (gameEnded). Se sim, a função retorna e não faz nada.
      if (gameEnded) return; //Em seguida, a função verifica se a célula já possui algum conteúdo (seu textContent). Se a célula não estiver vazia, a função retorna e não faz nada
      if (this.textContent !== '') return; //Caso a célula esteja vazia, o conteúdo da célula é atualizado com o símbolo do jogador atual (currentPlayer) e a cor de fundo é alterada de acordo com o jogador.

      this.textContent = currentPlayer;
      this.style.backgroundColor = currentPlayer === 'X' ? 'lightblue' : 'lightcoral';

      if (checkWin()) { //Em seguida, chamamos a função checkWin para verificar se o jogador atual venceu o jogo. Essa função percorre todas as combinações vencedoras possíveis e verifica se as células correspondentes contêm o símbolo do jogador atual. Se uma combinação vencedora for encontrada, a função retorna true.
        gameEnded = true;
        alert('O jogador ' + currentPlayer + ' venceu!');
        return; //Se checkWin retornar true, significa que temos um vencedor. Nesse caso, definimos gameEnded como true, exibimos um alerta com o jogador vencedor e retornamos da função.
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //Caso contrário, se não houver um vencedor, atualizamos currentPlayer para o próximo jogador. Se o currentPlayer for 'X', alteramos para 'O', e vice-versa.
    }

    function checkWin() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer) {
          return true;
        }
      }

      return false;
    }
  });