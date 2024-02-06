import React, { useState, useRef } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';

const ClientAdd = ({visibleAdd, loadingClients}) => {
    const [newName, setNewName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const msgs = useRef(null);

    const addClient = () => {
      const name = newName.trim();
      const surname = newSurname.trim();
      const phone = newPhone.trim();
      if(name && surname && phone){
          fetch("https://tnaiprojektapi20240205160915.azurewebsites.net/api/clients", {
              method: "POST",
              body: JSON.stringify({
              name,
              surname,
              phone,
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
              setNewSurname("");
              setNewPhone("");
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
          { severity: 'success', summary: 'Success', detail: 'Klient został dodany poprawnie!', sticky: true, closable: false }
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
      <label htmlFor="name">Imię</label>
      <InputText id="name" value={newName} onChange={(e) => setNewName(e.target.value)}/>
      <label htmlFor="surname">Nazwisko</label>
      <InputText id="surname" value={newSurname} onChange={(e) => setNewSurname(e.target.value)}/>
      <label htmlFor="phone">Numer telefonu</label>
      <InputText keyfilter="num" id="phone" value={newPhone} onChange={(e) => setNewPhone(e.target.value)}/>
      <Button className="flex align-items-center justify-content-center text-color bg-indigo-700 px-4 mt-3" label="Dodaj" icon="pi pi-plus" onClick={() => addClient()}/>
      <Messages ref={msgs} />
    </div>
  )
}

export default ClientAdd
