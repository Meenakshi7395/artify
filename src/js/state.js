let FAVS = getFavoritesFromLoaclStorage()

function saveFavoritesToLocalStorage()
{
    var favsJson = JSON.stringify(FAVS);
    localStorage.setItem("favs", favsJson);
}

function getFavoritesFromLoaclStorage()
{
    // Get the JSON string from localStorage for favs
    var favsJson = localStorage.getItem("favs");
    //console.log(favsJson)

    // when favs was not available in localStorage
    if (favsJson === null) {
        return [];
    }

    var array = JSON.parse(favsJson);
    return array;
}

class State
{
    get favs()
    {
        return FAVS;
    }

    set favs(image)
    {
        // image => object of the image 

        var isFav = false;      // assuming the current image is not favorite

        FAVS.forEach((img,i)=>{
            if(img.id===image.id)
            {   
                isFav = true;
                FAVS.splice(i,1)            // remove this image from the fav array
                document.getElementById(`like_${image.id}`).innerHTML = `<i class="fa-regular fa-heart"></i>`
            }
        })

        if(isFav==false)
        {
            FAVS.push(image)                // add this image in fav array
            document.getElementById(`like_${image.id}`).innerHTML = `<i class="fa-solid fa-heart"></i>`
        }

        saveFavoritesToLocalStorage()
    }

}


export default new State()