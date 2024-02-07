import React from 'react'
import { Card } from 'primereact/card'
import ReservationList from '../components/Reservations/ReservationList'

const ReservationView = () => {
  return (
    <div>
        <Card className='px-5 border-200 border-1 border-round-lg min-w-full'>
          <h1>Rezerwacje</h1>
            <ReservationList/>
        </Card>
    </div>
  )
}

export default ReservationView
