//This is client side javascript goal is to fetch the forecast information
//fetch is browser based API
console.log('Checking from static js');
fetch('http://puzzle.mead.io/puzzle').then(response => {
  response.json().then(data => {
    console.log(data);
  });
});

// const formLocation = document.querySelector('.location');
const formLocation = document.querySelector('form');
const inputLocation = document.querySelector('#location');
const message1 = document.querySelector('#msg1');
const message2 = document.querySelector('#msg2');
console.log(formLocation);

formLocation.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('Testing');
  console.log(inputLocation.value);
  if (!inputLocation.value) {
    console.log('Enter location in the given field.');
    return;
  }
  fetch(`/weather?address=${inputLocation.value}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
        message1.textContent = '';
        message2.textContent = '';
        message1.textContent = `${data.error}`;
      } else {
        console.log(data);
        message1.textContent = `${data.forecastData}`;
        message2.textContent = `${data.data}`;
      }
    });
  });
});
