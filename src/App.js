import {Menu} from 'primereact/menu';
import HomeViews from './views/HomeViews';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ClientViews from './views/ClientViews';
import ReservationView from './views/ReservationView';
import TrackViews from './views/TrackViews';

function App() {
  let items = [
    { label: 'Home', icon: 'pi pi-home', url: '/' },
    { label: 'Tory', icon: 'pi pi-mobile', url: '/tracks' },
    { label: 'Klienci', icon: 'pi pi-user', url: '/clients' },
    { label: 'Rezerwacje', icon: 'pi pi-calendar-plus', url: '/reservations' }
];
  return (
    <div className="">
      <header className="flex justify-content-center align-items-center bg-indigo-700 w-full border-round-lg">
        <h2 className="flex justify-content-center align-items-center">Kręgielnia</h2>
        
      </header>
      <div className='flex flex-wrap justify-content-left'>
        <BrowserRouter>
          <div className='flex h-full p-6'>
            <Menu className='h-full' model={items}/>
          </div>
          <div className='flex mx-7 mt-6 w-8' >
            <Routes>
              <Route path="/" element={<HomeViews />} />
              <Route path="/clients" element={<ClientViews />} />
              <Route path="/reservations" element={<ReservationView />} />
              <Route path="/tracks" element={<TrackViews />} />
            </Routes>
          </div>
        </BrowserRouter>
        
      </div>
      
    </div>
  );
}

export default App;
