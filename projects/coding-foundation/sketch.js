let number;
let toggleCount = 1;

function toggle(){
  toggleCount +=1 //use this toggleCount to control the two "pages"
  if(toggleCount%2 == 0){
    document.getElementById('bigContainer1').style.display = 'none'
    document.getElementById('bigContainer2').style.display = 'block'

  }else{
    document.getElementById('bigContainer2').style.display = 'none'
    document.getElementById('bigContainer1').style.display = 'block'
  }
}

function displayGoat(){
  let goatNum = document.getElementById('myRange').value
  document.getElementById('flex-goat').innerHTML = "" //clear all the child components in flex-goat everytime (different from the createCat function)
  for (var i = 0; i < goatNum; i++) {
    var ul = document.createElement('ul');
    ul.className += "goats";
    document.getElementById('flex-goat').appendChild(ul);
  }
}

function createCat(){
  catnumber = document.getElementById('inputNum').value //get input value

  for (var i = 0; i < catnumber; i++) {
    var ul = document.createElement('ul'); //create new cats
    ul.className += "flex-item";
    document.getElementById('flex').appendChild(ul);//add the cat to parent list
  }
}
