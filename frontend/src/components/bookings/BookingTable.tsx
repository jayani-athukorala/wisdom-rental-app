import type { Booking } from '../../types';

type BookingTableProps = {
    data: Booking[];
    cancel?: (id: number) => void;
};

export default function BookingTable({
                                         data,
                                         cancel
                                     }: BookingTableProps) {
    return (
        <div className="tablewrap">
            <table>
                <thead>
                <tr>
                    <th>Room</th>
                    <th>Customer</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Status</th>
                    {cancel && <th />}
                </tr>
                </thead>

                <tbody>
                {data.map((booking) => (
                    <tr key={booking.id}>
                        <td>
                            {booking.classroom.roomName}
                        </td>

                        <td>
                            {booking.customer.fullName}
                        </td>

                        <td>
                            {new Date(
                                booking.startTime
                            ).toLocaleString()}
                        </td>

                        <td>
                            {new Date(
                                booking.endTime
                            ).toLocaleString()}
                        </td>

                        <td>
                                <span
                                    className={
                                        'status ' +
                                        booking.status.toLowerCase()
                                    }
                                >
                                    {booking.status}
                                </span>
                        </td>

                        {cancel && (
                            <td>
                                {booking.status === 'ACTIVE' && (
                                    <button
                                        className="danger"
                                        onClick={() =>
                                            cancel(booking.id)
                                        }
                                    >
                                        Cancel
                                    </button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}