import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import TrackAdd from './TrackAdd';
import { useRef } from 'react';
import TrackEdit from './TrackEdit';

const TracksList = () => {
    const [tracks, setTracks] = useState([]);
    const [visibleAdd, setVisableAdd] = useState(false);
    const [visibleEdit, setVisableEdit] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const msgs = useRef(null);
    useEffect(() => {
        LoadingTracks();
    },[]);

    const LoadingTracks = () =>{
        fetch("https://tnaiprojektapi20240205160915.azurewebsites.net/api/tracks", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
        setTracks(data);
        console.log(data);
        })
        .catch((error) => console.log(error));
    }

    const deleteTrack = (id) => {
        fetch(`https://tnaiprojektapi20240205160915.azurewebsites.net/api/tracks/${id}`, { method: "DELETE", headers: {
            'Content-Type': 'application/json', },})
        .then(response => {
            if (response.ok) {
              console.log(`Element o ID ${id} został usunięty.`);
              addMessagesDelOK();
            } else {
              console.error(`Błąd podczas usuwania elementu o ID ${id}.`);
              addMessagesDelERROR();
            }
          })

        setTimeout(() => {
            clearMessages();
            LoadingTracks();
        }, 3000);
    }

    const addMessagesDelOK = () => {
        msgs.current.show([
            { severity: 'success', summary: 'Success', detail: 'Tor został usuniety poprawnie!', sticky: true, closable: false }
        ]);
    };
    const addMessagesDelERROR = () => {
        msgs.current.show([
            { severity: 'error', summary: 'Error', detail: 'Wystąpił błąd podczas usuwania!', sticky: true, closable: false }
        ]);
    };

    const clearMessages = () => {
        msgs.current.clear();
    };

    const handleEditClick = (track) => {
        setVisableEdit(true);
        setSelectedTrack(track);
      };

  return (
    <div>
        <div className='flex justify-content-center flex-wrap'>
        {tracks.map((item) => (
            <div className='flex flex-column align-items-center justify-content-center text-color bg-indigo-700 font-bold m-2 border-round' style={{ minWidth: '200px', minHeight: '100px' }} key={item.id}>
                <h2>{item.name}</h2>
                <div className='flex mb-2'>
                    <Button className="mx-2 text-color" icon="pi pi-pencil" rounded text aria-label="Edytuj" onClick={() => handleEditClick(item)}/>
                    <Button className="mx-2 text-color" icon="pi pi-times" rounded text aria-label="Usuń" onClick={() => deleteTrack(item.id)} />
                    <Dialog header={`Edytuj: ${selectedTrack ? `${selectedTrack.name}` : ''}`} visible={visibleEdit} style={{width: '50vw'}} onHide={() => {setVisableEdit(false); setSelectedTrack(null);}}>
                        <TrackEdit visibleEdit={setVisableEdit} loadingTracks={LoadingTracks} props={selectedTrack}/>
                    </Dialog>
                </div>
            </div>
        ))}
        </div>
        <div className='flex justify-content-end flex-wrap mt-4'>
            <Button className="flex align-items-center justify-content-center text-color bg-indigo-700 px-4" label="Dodaj" icon="pi pi-plus" onClick={() => setVisableAdd(true)}/>
            <Dialog header="Dodaj nowy tor" visible={visibleAdd} style={{width: '50vw'}} onHide={() => setVisableAdd(false)}>
                <TrackAdd visibleAdd={setVisableAdd} loadingTracks={LoadingTracks}/>
            </Dialog>
        </div>
        <Messages ref={msgs} />
    </div>
    
    
  )
}

export default TracksList
