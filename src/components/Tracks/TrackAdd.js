import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { useRef } from 'react';


const TrackAdd = ({visibleAdd, loadingClients}) => {
    const [newName, setNewName] = useState("");
    const msgs = useRef(null);

    const addTrack = () => {
        const name = newName.trim();
        if(name){
            fetch("https://tnaiprojektapi20240205160915.azurewebsites.net/api/tracks", {
                method: "POST",
                body: JSON.stringify({
                name,
                }),
                headers: {
                "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then(response => response.json())
                .catch(error => {
                    console.log(error);
                    addMessagesERROR();
                });

                
                setNewName("");
                addMessagesOK();
                setTimeout(() => {
                    loadingClients();
                    clearMessages();
                    visibleAdd(false);
                }, 2000);

        }
    }

    const addMessagesOK = () => {
        msgs.current.show([
            { severity: 'success', summary: 'Success', detail: 'Tor został dodany poprawnie!', sticky: true, closable: false }
        ]);
    };
    const addMessagesERROR = () => {
        msgs.current.show([
            { severity: 'error', summary: 'Error', detail: 'Wystąpił błąd podczas dodawania do bazy danych!', sticky: true, closable: false }
        ]);
    };

    const clearMessages = () => {
        msgs.current.clear();
    };

    
  return (
    <div className="flex flex-column gap-2">
        <label htmlFor="name">Nazwa toru</label>
        <InputText id="name" value={newName} onChange={(e) => setNewName(e.target.value)}/>
        <Button className="flex align-items-center justify-content-center text-color bg-indigo-700 px-4 mt-3" label="Dodaj" icon="pi pi-plus" onClick={() => addTrack()}/>
        <Messages ref={msgs} />
    </div>
  )
}


export default TrackAdd
