// getting instances of different elements
const inputElement = document.querySelectorAll("input");
const saveButton = document.querySelector(".to-do-button");
const clearButton = document.querySelector(".clear-all");
const labels = document.querySelectorAll('label');
let savedText="";

// building function to check times and set bg-color for labels
let checkTime = ()=>{
    let currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    for(let i=0;i<labels.length;i++){
        if(currentTime.slice(-2) === labels[i].innerText.slice(-2)){
            if(parseInt(currentTime.substr(0,2)) > parseInt(labels[i].innerText.substr(0,2))){
                if(parseInt(currentTime.substr(0,2)) === 12){
                    inputElement[i].setAttribute("style", "background-color: #96d4cc;")
                }else{
                    inputElement[i].setAttribute("style", "background-color: #fdd1d2;")
                }
            }
            else if(parseInt(currentTime.substr(0,2)) === parseInt(labels[i].innerText.substr(0,2))){
                inputElement[i].setAttribute("style", "background-color: #fbede0;")
            }
            else{
                if(parseInt(labels[i].innerText.substr(0,2)) === 12){
                    inputElement[i].setAttribute("style", "background-color: #fdd1d2;")
                }
                else{
                    inputElement[i].setAttribute("style", "background-color: #96d4cc;")
                }
                
            }
        }
        else{
            
            if(currentTime.slice(-2)==="PM" &&  labels[i].innerText.slice(-2) === "AM"){
                inputElement[i].setAttribute("style", "background-color: #fdd1d2;")
            }
            
            else{
                    inputElement[i].setAttribute("style", "background-color: #96d4cc;")
            }
            
        }
        
    }
}

checkTime();

//function for updating displays
let updateDisplay = ()=>{
    if(sessionStorage.getItem('savedTasks') != null){
        let toDoItems =sessionStorage.getItem('savedTasks').split(',');
        for(let i=0;i<toDoItems.length;i++){
            inputElement[i].value = toDoItems[i];
        }
    }
    else{
        for(let i=0;i<inputElement.length;i++){
            inputElement[i].value = "";
        }
    }
}

//function for saving data
let saveData = ()=>{
    inputElement.forEach(element => {
        if(savedText === ""){
            savedText = element.value ;
        }
        else{
            savedText = savedText + "," + element.value;
        }
    });
    sessionStorage.setItem('savedTasks',savedText);
}

//defining on-click functions
saveButton.addEventListener('click',()=>{
    saveData();
    updateDisplay();
})

updateDisplay();

clearButton.addEventListener('click',()=>{
    savedText = "";
    sessionStorage.setItem('savedTasks',savedText);
    updateDisplay();
    location.reload();
})

