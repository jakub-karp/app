import React, { useState , useEffect, useRef } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import ReservationAdd from './ReservationAdd';
import ReservationEdit from './ReservationEdit';


const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const currenttimestamp = Date.now();
    const [visibleAdd, setVisableAdd] = useState(false);
    const [visibleEdit, setVisableEdit] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const msgs = useRef(null);

    const optionsDate = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };

      const optionsTime = {
        hour: 'numeric',
        minute: 'numeric',
      };

    useEffect(() => {
        LoadingReservations();
    },[]);
  
    const LoadingReservations = () =>{
      fetch("https://tnaiprojektapi20240205160915.azurewebsites.net/api/reservations", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
      setReservations(data);
      })
      .catch((error) => console.log(error));
    }

    const formatDate = (timestampreservation) =>{
        const formattedDate = new Date(timestampreservation).toLocaleString('pl-PL', optionsDate);
        return(formattedDate);

    }

    const formatTime = (timestampreservation) =>{
        const formattedDate = new Date(timestampreservation).toLocaleString('pl-PL', optionsTime);
        return(formattedDate);

    }

    const isActive = (timeStart, timeEnd) => {
        if(currenttimestamp >= timeStart && currenttimestamp <= timeEnd){
            return true;
        }
        else{
            return false;
        }
    }

    const deleteReservation = (id) => {
      fetch(`https://tnaiprojektapi20240205160915.azurewebsites.net/api/reservations/${id}`, { method: "DELETE", headers: {
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
          LoadingReservations();
      }, 3000);
    }

    const addMessagesDelOK = () => {
        msgs.current.show([
            { severity: 'success', summary: 'Success', detail: 'Rezerwacja została usunieta poprawnie!', sticky: true, closable: false }
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

      const handleEditClick = (reservation) => {
        setVisableEdit(true);
        setSelectedReservation(reservation);
      };

  return (
    <div>
        
      <div className='flex justify-content-center flex-wrap'>
        {reservations.map((item) => (
            <div className='flex flex-column justify-content-center text-color bg-indigo-700 font-bold m-2 border-round px-5 py-2' style={{ minWidth: '400px', minHeight: '200px' }} key={item.id}>
                <h2 className='flex align-items-center justify-content-center'>Rezerwacja nr {item.id}</h2>
                <p className='font-normal ml-3'><span className="pi pi-calendar mr-3"></span>{formatDate(item.start) === formatDate(item.end) ? formatDate(item.start) : `${formatDate(item.start)} - ${formatDate(item.end)}`}</p>
                <p className='font-normal ml-3'><span className="pi pi-clock mr-3"></span>{formatTime(item.start)} - {formatTime(item.end)} {isActive(item.start, item.end) ? <span className='ml-3 p-2 bg-green-800'>W trakcie</span> : <span></span> }</p>
                <p className='font-normal ml-3'><span className="pi pi-user mr-3"></span>{item.client.name} {item.client.surname}</p>
                <p className='font-normal ml-3'><span className="pi pi-mobile mr-3"></span>{item.track.name}</p>
                <p className='font-normal ml-3'><span className="pi pi-money-bill mr-3"></span>{item.price} PLN</p>
                <div className='flex justify-content-end mb-2'>
                    <Button className="mx-2 text-color" icon="pi pi-pencil" rounded text aria-label="Edytuj" onClick={() => handleEditClick(item)}/>
                    <Button className="mx-2 text-color" icon="pi pi-times" rounded text aria-label="Usuń" onClick={() => deleteReservation(item.id)} />
                    <Dialog header={`Edytuj: Rezerwacja nr ${selectedReservation ? `${selectedReservation.id}` : ''}`} visible={visibleEdit} style={{ width: '50vw' }} onHide={() => { setVisableEdit(false); setSelectedReservation(null); }}>
                        <ReservationEdit visibleEdit={setVisableEdit} loadingReservations={LoadingReservations} props={selectedReservation}/>
                    </Dialog>
                </div>
            </div>
        ))}
        </div>
        <div className='flex justify-content-end flex-wrap mt-4'>
            <Button className="flex align-items-center justify-content-center text-color bg-indigo-700 px-4" label="Dodaj" icon="pi pi-plus" onClick={() => setVisableAdd(true)}/>
            <Dialog header="Dodaj nową rezerwację" visible={visibleAdd} style={{width: '50vw'}} onHide={() => setVisableAdd(false)}>
                <ReservationAdd visibleAdd={setVisableAdd} loadingReservations={LoadingReservations}/>
            </Dialog>
        </div>
        <Messages ref={msgs} />
        
    </div>
  )
}

export default ReservationList
