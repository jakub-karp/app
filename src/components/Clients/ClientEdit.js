import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { useRef, useState } from 'react';

const ClientEdit = ({visibleEdit, loadingClients, props}) => {
  const [editName, setEditName] = useState("");
  const [editSurname, setEditSurname] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const msgs = useRef(null);

  const editClient = () => {
    const name = editName.trim();
    const surname = editSurname.trim();
    const phone = editPhone.trim();
    if(name){
        fetch(`https://tnaiprojektapi20240205160915.azurewebsites.net/api/clients/${props.id}`, {
            method: "PUT",
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
                addMessagesEditERROR();
            });

            
            setEditName("");
            setEditSurname("");
            setEditPhone("");
            addMessagesEditOK();
            setTimeout(() => {
                loadingClients();
                clearMessages();
                visibleEdit(false);
            }, 2000);

    }
  }

  const addMessagesEditOK = () => {
    msgs.current.show([
        { severity: 'success', summary: 'Success', detail: 'Klient został edytowany poprawnie!', sticky: true, closable: false }
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
        <label htmlFor="name">Imię</label>
        <InputText id="name" value={editName} onChange={(e) => setEditName(e.target.value)}/>
        <label htmlFor="surname">Nazwisko</label>
        <InputText id="surname" value={editSurname} onChange={(e) => setEditSurname(e.target.value)}/>
        <label htmlFor="phone">Numer telefonu</label>
        <InputText keyfilter="num" id="phone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)}/>
        <Button className="flex align-items-center justify-content-center text-color bg-indigo-700 px-4 mt-3" label="Edytuj" icon="pi pi-pencil" onClick={() => editClient()}/>
        <Messages ref={msgs} />
      </div>
    </div>
  )
}

export default ClientEdit
