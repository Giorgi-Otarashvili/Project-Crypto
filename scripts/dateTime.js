const dateNow = new Date(); // ეს ბრძანება წამოიღებს ინფორმაციას ამჟამინდელ თარიღზე.

let result = document.createElement('p');

let oldDate = localStorage.getItem('date');

// result.innerHTML = dateNow;
console.log(new Date(oldDate));
result.innerHTML = new Date(1995, 11, 17, 3, 24, 0);

localStorage.setItem('date', new Date(1995, 11, 17, 3, 24, 0));

document.body.appendChild(result);

