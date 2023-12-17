import { createApi } from "unsplash-js";
import state from "./state";

var main = document.getElementById("main")
var title = document.getElementById("title")
var container = document.getElementsByClassName("container")[0]

var PHOTOS = []     // array to store the images returned by the api 

const unsplash = createApi({
  accessKey :"JPrjXtrdy9FkCtFCG7W88zNDb-N1o19aXlRuvnrFgSo",
})


// =============================================== Function to Update the images on page based on user choice ================================
function updateGallery(artType)
{
  unsplash.search.getPhotos({
    query:artType,
    page:1,
    perPage:20,
    orientation:'portrait',
  }).then((result)=>{
    
    if(result.type==='success')
    {
      PHOTOS = result.response.results;
      console.log(PHOTOS)

      // make the title to the selected art
      title.innerText = artType

      // delete all available photos
      container.innerHTML = ''

      PHOTOS.map((image)=>{
        container.innerHTML = container.innerHTML+ createPhoto(image)
      })

      // attach event listner for click event on all like buttons
      var likeButtons = document.querySelectorAll(".like")
      console.log(likeButtons)
      likeButtons.forEach(button=>{
        button.addEventListener('click',()=>{
          updateFavorites(button.getAttribute('image_id'))
        })
      })

    }
  })
}

// ================================================== Function to create Card of Photo ======================================================
function createPhoto(image)
{
  // image : this is the image object having all the details of the image

  // check if this image is already favorite and accordingly show the like button
  var isFav = state.favs.some(function (photo) {
    return photo.id === image.id;
  });

  var like_button =''

  if(isFav)
  {
    like_button = '<i class="fa-solid fa-heart"></i>'
  }
  else
  {
    like_button = '<i class="fa-regular fa-heart"></i>'
  }

 var html_code = `
  <div class="photo-card" id='${image.id}'>
    <img src="${image.urls.small}" alt="">
    <p>${image.alt_description}</p>
    <div class="actions">
      <button class="like" image_id=${image.id} id="like_${image.id}">${like_button}</button>
    </div>
  </div>
  `
  return html_code;
}

function updateFavorites(image_id)
{

  // find out the image from the PHOTOS array which should be added to favorites
  var image = PHOTOS.find(function (photo) {
    return photo.id === image_id;
  });

  if(image == undefined)
  {
    image = state.favs.find(function (photo) {
      return photo.id === image_id;
    });
  }

  console.log(image)
  state.favs = image     
  console.log(state.favs)
  document.getElementById("count").innerText = state.favs.length
}

function showFavorites()
{
  title.innerText = 'Your Favorites...'
  container.innerHTML = ''
  state.favs.map((image)=>{
    container.innerHTML = container.innerHTML+ createPhoto(image)
  })

  // attach event listner for click event on all like buttons
  var likeButtons = document.querySelectorAll(".like")
  console.log(likeButtons)
  likeButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      updateFavorites(button.getAttribute('image_id'))
    })
  })
}

updateGallery('Classic Art')
document.getElementById("count").innerText = state.favs.length

// ======================================================= Update the gallery on click of buttons in navigation bar ==============================
document.getElementById("Classic").addEventListener('click',()=>{updateGallery('Classic Art')})
document.getElementById("Modern").addEventListener('click',()=>{updateGallery('Modern Art')})
document.getElementById("Sculptures").addEventListener('click',()=>{updateGallery('Sculptures')})
document.getElementById("Cubism").addEventListener('click',()=>{updateGallery('Cubism')})
document.getElementById("Abstract").addEventListener('click',()=>{updateGallery('Abstract Art')})
document.getElementById("Favorites").addEventListener('click',()=>{showFavorites()})
