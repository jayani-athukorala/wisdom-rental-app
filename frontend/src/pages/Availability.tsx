import { useState } from 'react';
import { request } from '../api';

import type {
    Classroom,
    Equipment
} from '../types';

type AvailabilityProps = {
    equipment: Equipment[];
    onBook: () => void;
};

export default function Availability({
                                         equipment,
                                         onBook
                                     }: AvailabilityProps) {
    const [now] = useState(() =>
        new Date(Date.now() + 3600000)
            .toISOString()
            .slice(0, 16)
    );

    const [end] = useState(() =>
        new Date(Date.now() + 7200000)
            .toISOString()
            .slice(0, 16)
    );

    const [form, setForm] = useState({
        start: now,
        end,
        minCapacity: 1,
        accessible: false,
        equipment: '',
        roomType: ''
    });

    const [data, setData] =
        useState<Classroom[]>([]);

    const [error, setError] = useState('');

    const search = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setError('');

            const params = new URLSearchParams({
                start: form.start,
                end: form.end,
                minCapacity: String(form.minCapacity),
                accessible: String(form.accessible)
            });

            if (form.equipment) {
                params.set(
                    'equipment',
                    form.equipment
                );
            }

            if (form.roomType) {
                params.set(
                    'roomType',
                    form.roomType
                );
            }

            const result =
                await request<Classroom[]>(
                    '/classrooms/available?' +
                    params.toString()
                );

            setData(result);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <>
            <section className="panel">
                <h2>
                    Find an available classroom
                </h2>

                <form
                    className="form grid"
                    onSubmit={search}
                >
                    <label>
                        Start

                        <input
                            type="datetime-local"
                            value={form.start}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    start: event.target.value
                                })
                            }
                        />
                    </label>

                    <label>
                        End

                        <input
                            type="datetime-local"
                            value={form.end}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    end: event.target.value
                                })
                            }
                        />
                    </label>

                    <label>
                        Minimum capacity

                        <input
                            type="number"
                            min="1"
                            value={form.minCapacity}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    minCapacity:
                                        +event.target.value
                                })
                            }
                        />
                    </label>

                    <label>
                        Room type

                        <select
                            value={form.roomType}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    roomType:
                                    event.target.value
                                })
                            }
                        >
                            <option value="">
                                Any
                            </option>

                            {[
                                'SMALL',
                                'MEDIUM',
                                'SEMINAR',
                                'LARGE',
                                'HALL'
                            ].map((type) => (
                                <option
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Equipment

                        <select
                            value={form.equipment}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    equipment:
                                    event.target.value
                                })
                            }
                        >
                            <option value="">
                                Any
                            </option>

                            {equipment.map((item) => (
                                <option
                                    key={item.id}
                                    value={
                                        item.equipmentCode
                                    }
                                >
                                    {item.equipmentName}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="check">
                        <input
                            type="checkbox"
                            checked={form.accessible}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    accessible:
                                    event.target.checked
                                })
                            }
                        />

                        Accessible only
                    </label>

                    <button className="primary">
                        Search availability
                    </button>
                </form>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}
            </section>

            <section className="roomgrid">
                {data.map((room) => (
                    <div
                        key={room.id}
                        className="room"
                    >
                        <div>
                            <span className="tag">
                                {room.roomType}
                            </span>

                            <h3>
                                {room.roomName}
                            </h3>

                            <p>
                                {room.capacity} seats ·{' '}
                                {room.accessible
                                    ? 'Accessible'
                                    : 'Standard access'}
                            </p>

                            <small>
                                {room.equipment
                                    .map(
                                        (item) =>
                                            item.equipmentName
                                    )
                                    .join(' · ')}
                            </small>
                        </div>

                        <button onClick={onBook}>
                            Create booking
                        </button>
                    </div>
                ))}
            </section>
        </>
    );
}