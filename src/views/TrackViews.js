import React from 'react'
import { Card } from 'primereact/card'
import TracksList from '../components/Tracks/TracksList'

const TrackViews = () => {
  return (
    <div>
        <Card className='px-5 border-200 border-1 border-round-lg min-w-full' style={{width: '70vw'}}>
            <h1>Tory</h1>
            <TracksList/>
        </Card>
    </div>
  )
}

export default TrackViews
