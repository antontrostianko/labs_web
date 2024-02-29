var carData = []; // Массив для хранения данных об автомобилях

var formTemplate = Handlebars.compile(
  document.getElementById("form-template").innerHTML
);
var infoTemplate = Handlebars.compile(
  document.getElementById("info-template").innerHTML
);

document.getElementById("container").innerHTML = formTemplate();

var carForm = document.getElementById("car-form");

carForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var formData = new FormData(this);

  var car = {
    id: formData.get("id"),
    series: formData.get("series"),
    date: formData.get("date"),
    purpose: formData.get("purpose"),
    address: formData.get("address"),
  };

  carData.push(car); // Добавляем данные об автомобиле в массив

  this.reset(); // Очищаем форму после отправки
});

// Функция для отображения всех данных
function showAllData() {
  var allData = carData
    .map(function (car) {
      return infoTemplate(car);
    })
    .join("");

  document.getElementById("container").innerHTML = allData;
}

// Функция для отображения данных об автомобиле с определенным ID
function showDataById(id) {
  var car = carData.find(function (car) {
    return car.id === id;
  });

  if (car) {
    document.getElementById("container").innerHTML = infoTemplate(car);
  } else {
    alert("Автомобиль с таким ID не найден.");
  }
}

// Функция для удаления данных об автомобиле с определенным ID
function deleteDataById(id) {
  carData = carData.filter(function (car) {
    return car.id !== id;
  });
}

// Функция для возвращения к форме ввода данных
function returnToForm() {
  document.getElementById("container").innerHTML = formTemplate();
}

// Добавляем обработчики событий для кнопок
document.getElementById("clear-btn").addEventListener("click", function () {
  carForm.reset();
});

document.getElementById("delete-btn").addEventListener("click", function () {
  var id = prompt("Введите ID автомобиля, который вы хотите удалить:");
  deleteDataById(id);
});

document.getElementById("show-all-btn").addEventListener("click", showAllData);

document.getElementById("show-id-btn").addEventListener("click", function () {
  var id = prompt("Введите ID автомобиля, который вы хотите отобразить:");
  showDataById(id);
});

document.getElementById("return-btn").addEventListener("click", returnToForm);
