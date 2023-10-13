
document.addEventListener('DOMContentLoaded', function () {
    const blocks = document.querySelectorAll('.ch');
    const container = document.querySelector('.image-container');
    // Добавлены элементы для отображения информации о победителе
    const winnerContainer = document.getElementById('winner-container');
    const winnerMessage = document.getElementById('winner-message');
    const winnerName = document.getElementById('winner-name');
    const winnerImage = document.getElementById('winner-image');

    let speeds = Array.from({ length: blocks.length }, () => Math.random() * 100 + 50);

    function moveBlocksRight() {
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
        return; // Прекращаем движение
      }

      setTimeout(moveBlocksRight, 100);
    }

    moveBlocksRight();
  });
