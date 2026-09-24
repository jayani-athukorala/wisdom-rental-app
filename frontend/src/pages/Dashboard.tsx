import StatCard from '../components/common/StatCard';
import BookingTable from '../components/bookings/BookingTable';

import type {
    Booking,
    Classroom,
    Customer
} from '../types';

type DashboardProps = {
    rooms: Classroom[];
    customers: Customer[];
    bookings: Booking[];
};

export default function Dashboard({
                                      rooms,
                                      customers,
                                      bookings
                                  }: DashboardProps) {
    const activeBookings =
        bookings.filter(
            (booking) => booking.status === 'ACTIVE'
        );

    return (
        <>
            <section className="stats">
                <StatCard
                    n={rooms.length}
                    label="Classrooms"
                />

                <StatCard
                    n={
                        customers.filter(
                            (customer) => customer.active
                        ).length
                    }
                    label="Active customers"
                />

                <StatCard
                    n={activeBookings.length}
                    label="Upcoming bookings"
                />

                <StatCard
                    n={
                        rooms.filter(
                            (room) => room.accessible
                        ).length
                    }
                    label="Accessible rooms"
                />
            </section>

            <section className="panel">
                <h2>Next bookings</h2>

                <BookingTable
                    data={activeBookings.slice(0, 6)}
                />
            </section>
        </>
    );
}