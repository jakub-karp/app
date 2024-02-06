import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { useRef, useState } from 'react';

const TrackEdit = ({visibleEdit, loadingTracks, props}) => {
    const [editName, setEditName] = useState("");
    const msgs = useRef(null);
    const editTrack = () => {
        const name = editName.trim();
        if(name){
            fetch(`https://tnaiprojektapi20240205160915.azurewebsites.net/api/tracks/${props.id}`, {
                method: "PUT",
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
                    addMessagesEditERROR();
                });

                
                setEditName("");
                addMessagesEditOK();
                setTimeout(() => {
                    loadingTracks();
                    clearMessages();
                    visibleEdit(false);
                }, 2000);

        }
    }

    const addMessagesEditOK = () => {
        msgs.current.show([
            { severity: 'success', summary: 'Success', detail: 'Tor został edytowany poprawnie!', sticky: true, closable: false }
        ]);
    };
    const addMessagesEditERROR = () => {
        msgs.current.show([
            { severity: 'error', summary: 'Error', detail: 'Wystąpił błąd podczas edytowania!', sticky: true, closable: false }
        ]);
    };

    const clearMessages = () => {
        msgs.current.clear();
    };


  return (
    <div>
        <div className="flex flex-column gap-2">
            <label htmlFor="name">Nowa nazwa toru</label>
            <InputText id="name" value={editName} onChange={(e) => setEditName(e.target.value)}/>
            <Button className="flex align-items-center justify-content-center text-color bg-indigo-700 px-4 mt-3" label="Edytuj" icon="pi pi-pencil" onClick={() => editTrack()}/>
            <Messages ref={msgs} />
        </div>
    </div>
  )
}

export default TrackEdit
