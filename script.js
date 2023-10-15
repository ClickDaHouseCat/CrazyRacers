document.addEventListener('DOMContentLoaded', function () {
  const blocks = document.querySelectorAll('.ch');
  const container = document.querySelector('.image-container');
  // Добавлены элементы для отображения информации о победителе
  const winnerContainer = document.getElementById('winner-container');
  const winnerMessage = document.getElementById('winner-message');
  const winnerName = document.getElementById('winner-name');
  const winnerImage = document.getElementById('winner-image');
  const startButton = document.getElementById('startButton');
  let winnersStats = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
  };
  let speeds = Array.from({ length: blocks.length }, () => Math.random() * 100 + 50);

  let isGameRunning = false; // Флаг, указывающий, идет ли игра

  // Добавляем обработчик события для кнопки старта

  startButton.addEventListener('click', function () {
    if (!isGameRunning) {
      isGameRunning = true;
      moveBlocksRight();
    }
  });

  function moveBlocksRight() {

    if (!isGameRunning) {
      return; // Если игра не идет, выходим из функции
    }

    let winnerBlock = null; // Блок, который первым достиг правого края
    let winnerTime = Infinity; // Время, когда блок достиг правого края первым

    blocks.forEach(function (block, index) {
      let currentLeft = parseInt(window.getComputedStyle(block).left);
      let speed = speeds[index];

      // Изменяем скорость в процессе на случайное значение от -10 до 10
      speed += Math.random() * 20 - 10;

      // Проверяем, достиг ли блок правого края родителя
      if (currentLeft + speed + block.clientWidth >= container.clientWidth && currentLeft < container.clientWidth) {
        if (currentLeft < winnerTime) {
          winnerTime = currentLeft;
          winnerBlock = block;
        }
      }

      block.style.left = currentLeft + speed + 'px';
      speeds[index] = speed;
    });

    if (winnerBlock !== null) {
      // Отображаем блок с информацией о победителе
      winnerMessage.innerHTML = `Победил ${winnerBlock.style.background}`;
      winnerName.textContent = `Игрок ${winnerBlock.dataset.player}`;
      winnerImage.src = `./assets/gif/${winnerBlock.dataset.player}.gif`;
      winnerContainer.style.display = 'block';
      winnersStats[winnerBlock.dataset.player]++;

      displayWinnersStats();

      // После завершения игры сбрасываем флаг
      isGameRunning = false;
      return;
    }

    setTimeout(moveBlocksRight, 100);
  }

  moveBlocksRight();

  document.addEventListener('DOMContentLoaded', function () {
    const blocks = document.querySelectorAll('.ch');
    const container = document.querySelector('.image-container');
    const winnerContainer = document.getElementById('winner-container');
    const winnerMessage = document.getElementById('winner-message');
    const winnerName = document.getElementById('winner-name');
    const winnerImage = document.getElementById('winner-image');
    const betForm = document.getElementById('bet-form');
    const userBalanceDisplay = document.getElementById('user-balance');

    let userBalance = 10000;
    userBalanceDisplay.innerHTML = 'Баланс игрока:' + userBalance; // Отображаем начальный баланс пользователя

    betForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const selectedPlayer = document.querySelector('input[name="player"]:checked');
      const betAmount = parseInt(document.getElementById('bet-amount').value);

      if (!selectedPlayer || isNaN(betAmount) || betAmount <= 0 || betAmount > userBalance) {
        alert('Пожалуйста, введите корректные значения для ставки.');
        return;
      }

      // Уменьшаем баланс пользователя на сумму ставки
      userBalance -= betAmount;
      userBalanceDisplay.textContent = userBalance;

      moveBlocksRight(selectedPlayer.value, betAmount);
    });

    function moveBlocksRight(selectedPlayer, betAmount) {
      let winnerBlock = null;
      let winnerTime = Infinity;

      blocks.forEach(function (block, index) {
        let currentLeft = parseInt(window.getComputedStyle(block).left);
        let speed = Math.random() * 20 - 10;

        if (currentLeft + speed + block.clientWidth >= container.clientWidth && currentLeft < container.clientWidth) {
          if (currentLeft < winnerTime) {
            winnerTime = currentLeft;
            winnerBlock = block;
          }
        }

        block.style.left = currentLeft + speed + 'px';
      });

      if (winnerBlock !== null) {
        // Отображаем блок с информацией о победителе
        winnerMessage.innerHTML = `Победил ${winnerBlock.style.background}`;
        winnerName.textContent = `Игрок ${winnerBlock.dataset.player}`;
        winnerImage.src = `./assets/gif/${winnerBlock.dataset.player}.gif`;
        winnerContainer.style.display = 'block';

        // Увеличиваем баланс пользователя на выигрыш (если он есть)
        if (selectedPlayer === winnerBlock.dataset.player) {
          const winnings = betAmount * 3; // За победу получаем в 3 раза больше ставки
          userBalance += winnings;
          alert(`Вы выиграли! Ваш выигрыш: ${winnings}`);
        }

        // Обновляем отображение баланса пользователя
        userBalanceDisplay.textContent = userBalance;
        return;
      }

      setTimeout(() => moveBlocksRight(selectedPlayer, betAmount), 100);
    }
  });

  function displayWinnersStats() {
    // Отображаем статистику на странице
    for (let player in winnersStats) {
      const statElement = document.getElementById(`player-${player}-stats`);
      if (statElement) {
        statElement.textContent = `Игрок ${player}: ${winnersStats[player]} побед`;
      }
    }
  }

});