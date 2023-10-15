document.addEventListener('DOMContentLoaded', function () {
  const blocks = document.querySelectorAll('.ch');
  const container = document.querySelector('.image-container');
  const winnerContainer = document.getElementById('winner-container');
  const winnerMessage = document.getElementById('winner-message');
  const winnerName = document.getElementById('winner-name');
  const winnerImage = document.getElementById('winner-image');
  const startButton = document.getElementById('startButton');
  const betForm = document.getElementById('bet-form');
  const userBalanceDisplay = document.getElementById('user-balance');
  let winnerBlock = null;
  let winnerTime = Infinity;
  let speeds = Array.from({ length: blocks.length }, () => Math.random() * 100 + 50);
  let userBalance = 10000;
  let winnersStats = { 1: 0, 2: 0, 3: 0, 4: 0 };
  let isResetting = false;

  startButton.addEventListener('click', function () {
    if (!isResetting) {
      isResetting = true;
      startButton.disabled = true; // Блокируем кнопку во время сброса
      resetBlocks();
      moveBlocksRight();
    }
  });

  // Однократное добавление обработчика submit
  betForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const selectedPlayer = document.getElementById('selected-runner').value;
    const betAmount = parseInt(document.getElementById('bet-amount').value);

    if (!selectedPlayer || isNaN(betAmount) || betAmount <= 0 || betAmount > userBalance) {
      alert('Пожалуйста, введите корректные значения для ставки.');
      return;
    }

    // Меняем баланс выиграл/проиграл
    if (selectedPlayer == winnerBlock.dataset.player) {
      const winnings = betAmount * 3;
      userBalance += winnings;
      alert(`Вы выиграли! Ваш выигрыш: ${winnings}`);
    } else {
      userBalance -= betAmount;
    }

    // Обновляем отображение баланса пользователя
    userBalanceDisplay.innerHTML = 'Баланс игрока: ' + userBalance;
  });

  function moveBlocksRight() {
    userBalanceDisplay.textContent = 'Баланс игрока: ' + userBalance;

    blocks.forEach(function (block, index) {
      let currentLeft = parseInt(window.getComputedStyle(block).left);
      let speed = speeds[index];

      speed += Math.random() * 20 - 10;

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
      winnerMessage.textContent = `Победил ${winnerBlock.style.background}`;
      winnerName.textContent = `Игрок ${winnerBlock.dataset.player}`;
      winnerImage.src = `./assets/gif/${winnerBlock.dataset.player}.gif`;
      winnerContainer.style.display = 'block';
      winnersStats[winnerBlock.dataset.player]++;

      displayWinnersStats();

      // Завершаем игру и сбрасываем блоки
      resetBlocks();
      isResetting = false;
      startButton.disabled = false; // Разблокируем кнопку после сброса

      return;
    }

    if (isResetting) {
      // Передвигаем блоки только при сбросе
      setTimeout(moveBlocksRight, 100);
    }
  }

  function resetBlocks() {
    blocks.forEach(function (block, index) {
      block.style.left = '0';
      speeds[index] = Math.random() * 100 + 50; // Возвращаем случайные скорости
    });

    winnerBlock = null;
    winnerTime = Infinity;
  }

  function displayWinnersStats() {
    for (let player in winnersStats) {
      const statElement = document.getElementById(`player-${player}-stats`);
      if (statElement) {
        statElement.textContent = `Игрок ${player}: ${winnersStats[player]} побед`;
      }
    }
  }
});
