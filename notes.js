const notes_ = (function(){

    const notes_id = document.querySelector("#notes");
    const create_note_btn = document.querySelector("#create-note-btn");
    const note_input = document.querySelector("#note-input");


    displayNotes();


    function displayNotes(){
        //get notes from localStorage
        let savedNotes = localStorage.getItem("saved_notes");

        if(savedNotes == null || savedNotes == undefined){
            notes_id.innerHTML = "No notes at the moment";
        }else{
            //there are notes..
            savedNotes = JSON.parse(savedNotes);
            
            ulElement = "<div>";
           
            for(let i = 0; i < savedNotes.length; i++){
                ulElement += `
                        <div class='notes-input-group'>
                        <input type='text' value='${savedNotes[i]['note_title']}' id='note_id_${savedNotes[i]['time_created']}' class='note-inputs' readonly>
                        <a id='edit_note_${savedNotes[i]['time_created']}' onclick="notes_.editNote('${savedNotes[i]['time_created']}')"><strong>Edit</strong></a>
                        </div>
                        `                        

            }

            ulElement += "</div>";

            notes_id.innerHTML = ulElement;





        }

    }

   
    function saveNote(note){
        //get notes
        let saved_notes = localStorage.getItem("saved_notes");

        //create date
        let date = new Date();
        let time_saved = date.getTime();

        let note_object = {
            note_title : note,
            time_created: time_saved
        }

        if(saved_notes == null || saved_notes == undefined){
            saved_notes_array = [];

            saved_notes_array.push(note_object);

            //save
            saved_notes_array = JSON.stringify(saved_notes_array);

            localStorage.setItem("saved_notes", saved_notes_array);

            location.reload();

        }else{
            saved_notes = JSON.parse(saved_notes);

            saved_notes.push(note_object);

            saved_notes_array = JSON.stringify(saved_notes);

            localStorage.setItem("saved_notes", saved_notes_array);

            location.reload();


        }

    }

    function createNewNote(){
        if(note_input.value.trim().length > 0){
            new_note_input = note_input.value.trim();

            saveNote(new_note_input);
        }
    }




    create_note_btn.onclick = createNewNote;

    function editNoteFunction(time_created){
        
        document.querySelector(`#note_id_${time_created}`).removeAttribute("readonly");
        document.querySelector(`#edit_note_${time_created}`).innerText = "Save"; 
        

        document.querySelector(`#edit_note_${time_created}`).setAttribute("onclick", `notes_.saveEditedNote('${time_created}')`)


    }


    function saveEditedNoteFunction(time_created){

        let new_note_title = document.querySelector(`#note_id_${time_created}`).value.trim();

        if(new_note_title.length != 0){
            //save the new note title

            //get data from localStorage
            let stored_notes = localStorage.getItem("saved_notes");

            stored_notes = JSON.parse(stored_notes);

            for(let i = 0; i < stored_notes.length; i++){
                if(stored_notes[i]['time_created'] == time_created){
                    //we have a match
                    stored_notes[i]['note_title'] = new_note_title;

                    //save to localStorage..
                    stored_notes = JSON.stringify(stored_notes);

                    localStorage.setItem("saved_notes", stored_notes);
                    break;
                }
            }

            location.reload();


        }


    }



    return {
        editNote : editNoteFunction,

        deleteNote: function(){

        },

        saveEditedNote : saveEditedNoteFunction
    }






}());
