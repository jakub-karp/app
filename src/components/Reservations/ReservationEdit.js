import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { useRef, useState, useEffect } from 'react';

const ReservationEdit = ({visibleEdit, loadingReservations, props}) => {
    const [newStart, setNewStart] = useState(null);
    const [newEnd, setNewEnd] = useState(null);
    const [newPrice, setNewPrice] = useState(0);
    const [newClientId, setNewClientId] = useState(null);
    const [newTrackId, setNewTrackId] = useState(null);
    const [clients, setClients] = useState([]);
    const clientsoption = clients.map((item, index) => ({
        name: `${item.name} ${item.surname}`,
        code: item.id,
    }))
    const [selectedClient, setSelectedClient] = useState(null);
    const [tracks, setTracks] = useState([]);
    const trackssoption = tracks.map((item, index) => ({
        name: item.name,
        code: item.id,
    }))
    const [selectedTrack, setSelectedTrack] = useState(null);
    const msgs = useRef(null);

    const editReservation = () => {
        const start = newStart.getTime();
        const end = newEnd.getTime();
        const price = newPrice;
        const clientId = newClientId;
        const trackId = newTrackId;
        if(start && end && price && clientId && trackId){
            fetch(`https://tnaiprojektapi20240205160915.azurewebsites.net/api/reservations/${props.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    start,
                    end,
                    price,
                    clientId,
                    trackId,
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
    
                
                setNewStart(null);
                setNewEnd(null);
                setNewPrice(0);
                setNewClientId(null);
                setNewTrackId(null);
                addMessagesEditOK();
                setTimeout(() => {
                    loadingReservations();
                    clearMessages();
                    visibleEdit(false);
                }, 2000);
    
        }
      }
      useEffect(() => {
        LoadingClients();
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

        const LoadingClients = () =>{
            fetch("https://tnaiprojektapi20240205160915.azurewebsites.net/api/clients", { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
            setClients(data);
            console.log(data);
            })
            .catch((error) => console.log(error));
        }
    
      const addMessagesEditOK = () => {
        msgs.current.show([
            { severity: 'success', summary: 'Success', detail: 'Rezerwacja została edytowana poprawnie!', sticky: true, closable: false }
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

    const handleAddChangeClient = (client) =>{
        setNewClientId(client.code);
        setSelectedClient(client);
      }

      const handleAddChangeTrack = (track) =>{
        setNewTrackId(track.code);
        setSelectedTrack(track);
      }

  return (
    <div className="flex flex-column gap-2">
      <label htmlFor="start">Wybierz date i godzinę początku rezerwacji</label>
      <Calendar id="start" className="" value={newStart} onChange={(e) => setNewStart(e.target.value)} showTime hourFormat="24"/>
      <label htmlFor="end">Wybierz date i godzinę końca rezerwacji</label>
      <Calendar id="end" className="" value={newEnd} onChange={(e) => setNewEnd(e.target.value)} showTime hourFormat="24"/>
      <label htmlFor="price">Koszt rezerwacji</label>
      <InputText keyfilter="num" id="price" className="" value={newPrice} onChange={(e) => setNewPrice(e.target.value)}/>
      <label htmlFor="client">Wybierz klienta</label>
      <Dropdown id="client" value={selectedClient} onChange={(e) => handleAddChangeClient(e.value)} options={clientsoption} optionLabel="name" 
                placeholder="Wybierz tor" className="" />
        <label htmlFor="track">Koszt rezerwacji</label>
        <Dropdown id="track" value={selectedTrack} onChange={(e) => handleAddChangeTrack(e.value)} options={trackssoption} optionLabel="name" 
                placeholder="Wybierz tor" className="" />
      <Button className="flex align-items-center justify-content-center text-color bg-indigo-700 px-4 mt-3" label="Edytuj" icon="pi pi-pencil" onClick={() => editReservation()}/>
      <Messages ref={msgs} />
    </div>
  )
}

export default ReservationEdit
