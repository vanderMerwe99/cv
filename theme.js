//Script for changing website theme
const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
  };
  
  const theme = localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
        localStorage.setItem('theme', tmp),
        tmp);
  const bodyClass = document.body.classList;
  bodyClass.add(theme);
  
  function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
  
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
  }
  
  document.getElementById('themeButton').onclick = toggleTheme;
//Script for retrieving NASA APOD
//An asynchronous function to fetch data from the API.
async function sendApiRequest(){
  let API_KEY = "cXFz6W3N4sbNh5UVDHdIihxLcwhslR8rDgDKfh4y"
  let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
  console.log(response)
  let data = await response.json()
  console.log(data)
  useApiData(data)
}
//function that does something with the data received from the API.
function useApiData(data){
  document.querySelector("#date").innerHTML = data.date
  document.querySelector("#title").innerHTML = data.title
  document.getElementById('picture').src = data.url
  document.querySelector("#explanation").innerHTML = data.explanation
}
sendApiRequest();
//Script for retrieving Marvel Comics info.
async function getComics() {
  var PUB_KEY = "aeebbb13da614eb113df62b666ecfdb4";
  var PRIV_KEY = "17733b3aef9fbe961d412a66f19831dbe0145027";
  var timeStamp = Math.floor(Date.now() / 1000);
  console.log(timeStamp);
  var hash = "55a45259dd34bf6029ef97eabadc5933";
  console.log(hash);
  var lowerHash = hash.toLowerCase();
  let response = await fetch(`http://gateway.marvel.com/v1/public/comics?limit=100&ts=1001&apikey=aeebbb13da614eb113df62b666ecfdb4&hash=55a45259dd34bf6029ef97eabadc5933`);
  console.log(response);
  let objects = await response.json()
  console.log(objects)
  useMarvelData(objects);
}
/*GET A RANDOM COMIC'S INFO*/
function useMarvelData(objects){
  var randomnumber=Math.floor(Math.random()*101);
  document.querySelector("#comicDate").innerHTML = `Release Date: `+objects.data.results[randomnumber].dates[0].date
  document.querySelector("#comicTitle").innerHTML = `Title: `+objects.data.results[randomnumber].title
  //document.getElementById('picture').src = objects.data.results.images.path
  if(objects.data.results[randomnumber].images.length < 1){
    var halfPath = objects.data.results[randomnumber].thumbnail.path
    var extension = objects.data.results[randomnumber].thumbnail.extension
  }else{
    var halfPath = objects.data.results[randomnumber].images[0].path
    var extension = objects.data.results[randomnumber].images[0].extension
  }
  if(objects.data.results[randomnumber].description == null){
    document.querySelector("#comicExplanation").innerHTML = `Abstract: `+"<br />"+`Description is unavailable for this comic.`
  }else{
    document.querySelector("#comicExplanation").innerHTML = `Abstract: `+"<br />"+objects.data.results[randomnumber].description
  }
  var size = "/detail.";
  setImg(halfPath, size, extension);
}
async function setImg(halfPath, size, extension){
  var fullPath = halfPath+size+extension;
  document.getElementById('comicPicture').src = fullPath
  console.log(fullPath);
}
getComics();
async function getAdvice(){
  let response = await fetch(`https://api.adviceslip.com/advice`);
  //console.log(response)
  let data = await response.json()
  //console.log(data)
  setAdvice(data)
}
function setAdvice(data){
  document.querySelector("#advice").innerHTML = data.slip.advice
}
getAdvice();