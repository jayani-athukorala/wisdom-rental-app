import { useState } from 'react';
import { request } from '../../api';

import type {
    Classroom,
    Customer
} from '../../types';

type BookingFormProps = {
    rooms: Classroom[];
    customers: Customer[];
    reload: () => void;
    setMessage: (message: string) => void;
};

export default function BookingForm({
                                        rooms,
                                        customers,
                                        reload,
                                        setMessage
                                    }: BookingFormProps) {
    const [form, setForm] = useState({
        classroomId: '',
        customerId: '',
        bookingUser: '',
        startTime: '',
        endTime: '',
        comments: ''
    });

    const submit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            await request('/bookings', {
                method: 'POST',
                body: JSON.stringify({
                    ...form,
                    classroomId: +form.classroomId,
                    customerId: +form.customerId
                })
            });

            setMessage('Booking created');

            setForm({
                classroomId: '',
                customerId: '',
                bookingUser: '',
                startTime: '',
                endTime: '',
                comments: ''
            });

            reload();
        } catch (error) {
            setMessage((error as Error).message);
        }
    };

    return (
        <form
            className="form grid"
            onSubmit={submit}
        >
            <label>
                Classroom

                <select
                    required
                    value={form.classroomId}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            classroomId: event.target.value
                        })
                    }
                >
                    <option value="">
                        Select
                    </option>

                    {rooms
                        .filter((room) => room.active)
                        .map((room) => (
                            <option
                                key={room.id}
                                value={room.id}
                            >
                                {room.roomName} ({room.capacity})
                            </option>
                        ))}
                </select>
            </label>

            <label>
                Customer

                <select
                    required
                    value={form.customerId}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            customerId: event.target.value
                        })
                    }
                >
                    <option value="">
                        Select
                    </option>

                    {customers
                        .filter((customer) => customer.active)
                        .map((customer) => (
                            <option
                                key={customer.id}
                                value={customer.id}
                            >
                                {customer.fullName}
                            </option>
                        ))}
                </select>
            </label>

            <label>
                Booking user

                <input
                    required
                    value={form.bookingUser}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            bookingUser: event.target.value
                        })
                    }
                />
            </label>

            <label>
                Start

                <input
                    required
                    type="datetime-local"
                    value={form.startTime}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            startTime: event.target.value
                        })
                    }
                />
            </label>

            <label>
                End

                <input
                    required
                    type="datetime-local"
                    value={form.endTime}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            endTime: event.target.value
                        })
                    }
                />
            </label>

            <label>
                Comments

                <input
                    value={form.comments}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            comments: event.target.value
                        })
                    }
                />
            </label>

            <button className="primary">
                Create booking
            </button>
        </form>
    );
}