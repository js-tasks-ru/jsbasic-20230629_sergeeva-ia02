/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  if (name) {
    let nameArray = name.split('');
    let nameArray2 = name.split(' ');
    if ((nameArray.length > 3) && (nameArray2.length < 2)) {
      return true;
    } else { 
        return false;
    };
  } else { 
      return false;
  };
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
