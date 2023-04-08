let allCharactersHtml = document.getElementById("all-characters");
let num = 0;
async function allCharacters(offset){
    let rawRandonChar = await fetch(`marvelNames.json`);
    let charNameData = await rawRandonChar.json()
    const charNames = Object.entries(charNameData);
    for(i=offset;i<offset+100;i++){
        allCharactersHtml.innerHTML += `<a href="/character-info?query=${charNames[i][1].id}" id="characters" >
        <img src="${charNames[i][1].thumbnail}" alt="" class="allCharacters-img">
        <h4 class="margin-bottom">${charNames[i][1].name}</h4></a>`
    }
}
allCharacters(0);

const back = document.getElementById("back")
const next = document.getElementById("next")
if(num === 0){
    back.style.visibility = "hidden"
}

function nextpage(){ 
    num += 100  
    allCharactersHtml.innerHTML = ''
    allCharacters(num);
    back.style.visibility = "visible"
}
function backpage(){ 
    num -= 100
    
    allCharactersHtml.innerHTML = ''
    allCharacters(num);
    back.style.visibility = "visible"
    if(num === 0){
        back.style.visibility = "hidden"
    }  
}




 