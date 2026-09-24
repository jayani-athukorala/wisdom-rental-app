import { request } from '../api';

import BookingForm from '../components/bookings/BookingForm';
import BookingTable from '../components/bookings/BookingTable';

import type {
    Booking,
    Classroom,
    Customer
} from '../types';

type BookingsProps = {
    data: Booking[];
    rooms: Classroom[];
    customers: Customer[];
    reload: () => void;
    setMessage: (message: string) => void;
};

export default function Bookings({
                                     data,
                                     rooms,
                                     customers,
                                     reload,
                                     setMessage
                                 }: BookingsProps) {
    const cancel = async (id: number) => {
        try {
            await request(
                `/bookings/${id}/cancel`,
                {
                    method: 'PATCH'
                }
            );

            reload();
        } catch (error) {
            setMessage((error as Error).message);
        }
    };

    return (
        <>
            <section className="panel">
                <h2>Create booking</h2>

                <BookingForm
                    rooms={rooms}
                    customers={customers}
                    reload={reload}
                    setMessage={setMessage}
                />
            </section>

            <section className="panel">
                <h2>Upcoming bookings</h2>

                <BookingTable
                    data={data}
                    cancel={cancel}
                />
            </section>
        </>
    );
}