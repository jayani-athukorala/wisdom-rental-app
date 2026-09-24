import {
    useEffect,
    useState
} from 'react';

import {
    Building2,
    CalendarDays,
    DoorOpen,
    Search,
    Users
} from 'lucide-react';

import { request } from './api';

import Dashboard from './pages/Dashboard';
import Availability from './pages/Availability';
import Bookings from './pages/Bookings';
import Customers from './pages/Customers';
import Rooms from './pages/Rooms';

import type {
    Booking,
    Classroom,
    Customer,
    Equipment
} from './types';

type Tab =
    | 'dashboard'
    | 'availability'
    | 'bookings'
    | 'customers'
    | 'rooms';

export default function App() {
    const [tab, setTab] =
        useState<Tab>('dashboard');

    const [rooms, setRooms] =
        useState<Classroom[]>([]);

    const [customers, setCustomers] =
        useState<Customer[]>([]);

    const [bookings, setBookings] =
        useState<Booking[]>([]);

    const [equipment, setEquipment] =
        useState<Equipment[]>([]);

    const [message, setMessage] =
        useState('');

    const load = async () => {
        try {
            const [
                roomData,
                customerData,
                bookingData,
                equipmentData
            ] = await Promise.all([
                request<Classroom[]>(
                    '/classrooms'
                ),

                request<Customer[]>(
                    '/customers'
                ),

                request<Booking[]>(
                    '/bookings'
                ),

                request<Equipment[]>(
                    '/classrooms/equipment'
                )
            ]);

            setRooms(roomData);
            setCustomers(customerData);
            setBookings(bookingData);
            setEquipment(equipmentData);
        } catch (error) {
            setMessage(
                (error as Error).message
            );
        }
    };

    useEffect(() => {
        load();
    }, []);

    const nav = [
        [
            'dashboard',
            'Dashboard',
            Building2
        ],
        [
            'availability',
            'Availability',
            Search
        ],
        [
            'bookings',
            'Bookings',
            CalendarDays
        ],
        [
            'customers',
            'Customers',
            Users
        ],
        [
            'rooms',
            'Classrooms',
            DoorOpen
        ]
    ] as const;

    return (
        <div className="shell">
            <aside>
                <div className="brand">
                    <span>W</span>

                    <div>
                        Wisdom Rental

                        <small>
                            Classroom management
                        </small>
                    </div>
                </div>

                <nav>
                    {nav.map(
                        ([key, label, Icon]) => (
                            <button
                                key={key}
                                className={
                                    tab === key
                                        ? 'active'
                                        : ''
                                }
                                onClick={() =>
                                    setTab(key)
                                }
                            >
                                <Icon size={19} />
                                {label}
                            </button>
                        )
                    )}
                </nav>
            </aside>

            <main>
                <header>
                    <div>
                        <h1>
                            {
                                nav.find(
                                    (item) =>
                                        item[0] === tab
                                )?.[1]
                            }
                        </h1>

                        <p>
                            Manage spaces, customers
                            and reservations.
                        </p>
                    </div>
                </header>

                {message && (
                    <div
                        className="notice"
                        onClick={() =>
                            setMessage('')
                        }
                    >
                        {message}
                    </div>
                )}

                {tab === 'dashboard' && (
                    <Dashboard
                        rooms={rooms}
                        customers={customers}
                        bookings={bookings}
                    />
                )}

                {tab === 'availability' && (
                    <Availability
                        equipment={equipment}
                        onBook={() =>
                            setTab('bookings')
                        }
                    />
                )}

                {tab === 'bookings' && (
                    <Bookings
                        data={bookings}
                        rooms={rooms}
                        customers={customers}
                        reload={load}
                        setMessage={setMessage}
                    />
                )}

                {tab === 'customers' && (
                    <Customers
                        data={customers}
                        reload={load}
                        setMessage={setMessage}
                    />
                )}

                {tab === 'rooms' && (
                    <Rooms
                        data={rooms}
                        equipment={equipment}
                        reload={load}
                        setMessage={setMessage}
                    />
                )}
            </main>
        </div>
    );
}