//if user adds a note , add it to the localstorage
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {

    let addtext = document.getElementById("addText");
    let addtitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : addtitle.value,
        text : addtext.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtext.value = '';
    addtitle.value = '';
    console.log(notesObj);

    showNotes();

})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card"style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" class="btn btn-primary" onclick=deleteNote(this.id)>Delete Note</button>
            </div>
        </div>`;
    });

    let noteselm = document.getElementById("notes");
    if (notesObj.length !=0){
        noteselm.innerHTML = html;
    }else{
        noteselm.innerHTML =`No notes Presents`;
    }

}

function deleteNote(index){
    console.log("i am deleting",index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    console.log('input event is fired!',inputVal);

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    });

});
