function rating(index) {
  return `<div class="rating-area">
  <input type="radio" id="star-5_${index}" name="rating_${index}" value="5">
  <label for="star-5" title="Оценка «5»"></label>
  <input type="radio" id="star-4_${index}" name="rating_${index}" value="4">
  <label for="star-4" title="Оценка «4»"></label>
  <input type="radio" id="star-3_${index}" name="rating_${index}" value="3">
  <label for="star-3" title="Оценка «3»"></label>
  <input type="radio" id="star-2_${index}" name="rating_${index}" value="2">
  <label for="star-2" title="Оценка «2»"></label>
  <input type="radio" id="star-1_${index}" name="rating_${index}" value="1">
  <label for="star-1" title="Оценка «1»"></label>
</div>`;
}

function initStorafe(selector) {
  //сохранение в LocalStorage
  function save(data) {
    localStorage.setItem(selector, JSON.stringify(data));
  }

  // изменение данных из LocalStorage
  function onChange(event) {
    let element = event.target;
    let name = element.name;
    let value = element.value;
    data[name] = value;
    save(data);
  }

  // сохраняем в массив все input[type=radio]
  let elements = document.querySelectorAll(selector);

  // берем из LocalStorage
  let data = LocalStorage.getItem(selector);
  if (data) {
    // если в LocalStorage что-то есть, то можем распарсить
    data = JSON.parse(data);
  } else {
    //иначе парсить нельзя, будет ошибка
    // присвоим дефолтное значение и сохраним
    save((data = {}));
  }

  for (let element of elements) {
    let name = element.name;
    let value = element.value;
    if (data[name] === value) {
      // если текущий элемент отмечен в LocalStorage
      // то отметим и на странице
      element.checked = true;
    }
    // навесим созданный вне цикла хэндлер на событие
    element.addEventListener("click", onChange);
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  let heroes = JSON.parse(heroesJson);
  console.log(heroes);

  let heroesContent = "";
  let index = 0;
  for (let hero of heroes) {
    heroesContent += `<div class="superhero">
    <h2>${hero.name}</h2>
    <p><span>Вселенная:</span> ${hero.universe}</p>
    <p><span>Альтер эго:</span> ${hero.alterego}</p>
    <p><span>Род деятельности:</span> ${hero.business}</p>
    <p><span>Друзья:</span> ${hero.friends}</p>
    <p><span>Суперсилы:</span> ${hero.superpowers}</p>
    <p><span>История героя:</span> ${hero.details}</p>
    <div class="image">${hero.image}</div>
    <p>${rating(hero)}</p>
    </div>`;
    index++;
  }
  document.querySelector(".heroes-info").innerHTML = heroesContent;
  // index = 0;
});

// function sendRating() {
//   let ratingArea = document.querySelector(".rating-area");
//   if (ratingArea.value == checked) {
//     localStorage.setItem("Rating", ratingArea.value);
//   }
// }
