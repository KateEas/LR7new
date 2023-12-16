var canvas = document.getElementById('canvas');
var restart_button = document.getElementById('restart');
var context = canvas.getContext('2d');
var width = 300;
var height = 300;

// Размер ячейки
//При доработке пользователю можно  будет вводить свои значения
var cell_size = 100;
var cells_count = width/cell_size;
var field = [];
alert("Добро пожаловать в крестики-нолики!\nПервыми ходят крестики.")

// Переменная для хранения текущего игрока (1 - крестик, 2 - нолик)
var player = 1;
// Функция для отрисовки игрового поля
function draw_field() {
  // Очищаем canvas
  context.clearRect(0, 0, width, height);

  // Рисуем таблицу
  for (var i = 0; i < cells_count; i++) {
		for (j = 0; j < 3; j ++) {
		  context.strokeRect(0 + i * 100, 0 + j * 100, 100, 100);}
  }

  // Рисуем крестики и нолики
  for (var i = 0; i < cells_count; i++) {
    for (var j = 0; j < cells_count; j++) {
      var cell = field[i][j];
      switch (cell) {
        case 1:
          context.beginPath();
        context.moveTo(i * cell_size + 10, j * cell_size + 10);
        context.lineTo((i + 1) * cell_size - 10, (j + 1) * cell_size - 10);
        context.moveTo((i + 1) * cell_size - 10, j * cell_size + 10);
        context.lineTo(i * cell_size + 10, (j + 1) * cell_size - 10);
        context.stroke();
          break;
        case 2:
          context.beginPath();
          context.arc(i * cell_size + cell_size / 2, j * cell_size + cell_size / 2, cell_size / 2 - 10, 0, Math.PI * 2);
          context.stroke();
          break;
        default:

          break;
       
      }
    }
  }
}

// Функция для проверки победы
function check_win() {
  for (var i = 0; i < cells_count; i++) {
    var row = field[i];
    if (row[0] !== 0 && row[0] === row[1] && row[1] === row[2]) {
      return row[0];
    }
  }

  for (var i = 0; i < cells_count; i++) {
    if (field[0][i] !== 0 && field[0][i] === field[1][i] && field[1][i] === field[2][i]) {
      return field[0][i];
    }
  }

  if (field[0][0] !== 0 && field[0][0] === field[1][1] && field[1][1] === field[2][2]) {
    return field[0][0];
  }
  if (field[2][0] !== 0 && field[2][0] === field[1][1] && field[1][1] === field[0][2]) {
    return field[2][0];
  }

  // Ничья
  if (full_field()) {
    return -1;
  }

  // Игра продолжается
  return 0;
}

// Проверка заполненности поля
function full_field() {
  for (var i = 0; i < cells_count; i++) {
    for (var j = 0; j < cells_count; j++) {
      if (field[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

// Обработки клика на canvas
function cell_click(event) {
  // Координаты клика
  var x = event.pageX - canvas.offsetLeft;
  var y = event.pageY - canvas.offsetTop;
  // Номер ячейки
  var i = Math.floor(x / cell_size);
  var j = Math.floor(y / cell_size);
  if (field[i][j] !== 0) {
    return;
  }

  field[i][j] = player;

  // Переключаем игрока
  //Если значение равно 1, то меняем его на 2, а иначе на 1
  player = player === 1 ? 2 : 1; 

  // Проверяем победу
  var winner = check_win();
  if (winner !== 0) { 
    let message;
    if (winner === -1) {
      message = 'Ничья';
    } else {
      message = 'Игрок ' + winner + ' выиграл';
    }

    alert(message);

    // Обнуляем игровое поле и перерисовываем его
    field = [];
    for (var i = 0; i < cells_count; i++) {
      field.push([]);
      for (var j = 0; j < cells_count; j++) {
        field[i].push(0);
      }
    }
    draw_field();
  } else {
    // Перерисовываем игровое поле
    draw_field();
  }
}

// кнопка "Restart"
restart_button.addEventListener('click', function() {
  field = [];
  for (var i = 0; i < cells_count; i++) {
    field.push([]);
    for (var j = 0; j < cells_count; j++) {
      field[i].push(0);
    }
  }
  draw_field();
});

// Начало игры
for (var i = 0; i < cells_count; i++) {
  field.push([]);
  for (var j = 0; j < cells_count; j++) {
    field[i].push(0);
  }
}

// Отслеживание клика на canvas
canvas.addEventListener('click', cell_click);

// Первая отрисовка
draw_field();
