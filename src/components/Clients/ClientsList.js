import React, { useState , useEffect, useRef } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import ClientAdd from './ClientAdd';
import ClientEdit from './ClientEdit';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [visibleAdd, setVisableAdd] = useState(false);
  const [visibleEdit, setVisableEdit] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const msgs = useRef(null);

  useEffect(() => {
      LoadingClients();
  },[]);

  const LoadingClients = () =>{
    fetch("https://tnaiprojektapi20240205160915.azurewebsites.net/api/clients", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
    setClients(data);
    console.log(data);
    })
    .catch((error) => console.log(error));
  }
  const deleteClient = (id) => {
    fetch(`https://tnaiprojektapi20240205160915.azurewebsites.net/api/clients/${id}`, { method: "DELETE", headers: {
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
        LoadingClients();
    }, 3000);
  }
  const addMessagesDelOK = () => {
    msgs.current.show([
        { severity: 'success', summary: 'Success', detail: 'Klient został usuniety poprawnie!', sticky: true, closable: false }
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
  
  const handleEditClick = (client) => {
    setVisableEdit(true);
    setSelectedClient(client);
  };

  return (
    <div>
      <div className='flex justify-content-center flex-wrap'>
        {clients.map((item) => (
            <div className='flex flex-column justify-content-center text-color bg-indigo-700 font-bold m-2 border-round px-5' style={{ minWidth: '400px', minHeight: '200px' }} key={item.id}>
                <h2>{item.name} {item.surname}</h2>
                <p className='font-normal ml-3'><span className="pi pi-phone mr-3"></span>{item.phone}</p>
                <div className='flex justify-content-end mb-2'>
                    <Button className="mx-2 text-color" icon="pi pi-pencil" rounded text aria-label="Edytuj" onClick={() => handleEditClick(item)}/>
                    <Button className="mx-2 text-color" icon="pi pi-times" rounded text aria-label="Usuń" onClick={() => deleteClient(item.id)} />
                    <Dialog header={`Edytuj: ${selectedClient ? `${selectedClient.name} ${selectedClient.surname}` : ''}`} visible={visibleEdit} style={{ width: '50vw' }} onHide={() => { setVisableEdit(false); setSelectedClient(null); }}>
                        <ClientEdit visibleEdit={setVisableEdit} loadingClients={LoadingClients} props={selectedClient}/>
                    </Dialog>
                </div>
            </div>
        ))}
        </div>
        <div className='flex justify-content-end flex-wrap mt-4'>
            <Button className="flex align-items-center justify-content-center text-color bg-indigo-700 px-4" label="Dodaj" icon="pi pi-plus" onClick={() => setVisableAdd(true)}/>
            <Dialog header="Dodaj nowego klienta" visible={visibleAdd} style={{width: '50vw'}} onHide={() => setVisableAdd(false)}>
                <ClientAdd visibleAdd={setVisableAdd} loadingClients={LoadingClients}/>
            </Dialog>
        </div>
         <Messages ref={msgs} />
    </div>
  )
}

export default ClientsList
