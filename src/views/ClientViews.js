import React from 'react'
import { Card } from 'primereact/card'
import ClientsList from '../components/Clients/ClientsList'

const ClientViews = () => {
  return (
    <div>
      <Card className='px-5 border-200 border-1 border-round-lg min-w-full' style={{width: '70vw'}}>
        <h1>Klienci</h1>
        <ClientsList />
      </Card>
    </div>
  )
}

export default ClientViews
