const start = document.getElementById('startRaceBtn')
start.addEventListener('click',startGame )

function startGame() {
    var road1 = document.queryCommandIndeterm("road1");
    var characters = document.querySelectorAll(".character");

    var speed = 5; // Установите вашу начальную скорость
    var interval = 20; // Интервал в миллисекундах

    var moveCharacters = function () {
      characters.style.transform = "translateX(" + speed + "px)";

      // Проверка на достижение края дороги
      if (characters.offsetLeft >= road1.offsetWidth) {
        // Если персонаж достиг края родительского блока, завершаем игру
        alert("Игра завершена");
        clearInterval(gameInterval);
      }
    };

    var gameInterval = setInterval(moveCharacters, interval);
  }

