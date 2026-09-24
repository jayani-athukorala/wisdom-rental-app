import { request } from '../api';
import RoomCard from '../components/classrooms/RoomCard';

import type {
    Classroom,
    Equipment
} from '../types';

type RoomsProps = {
    data: Classroom[];
    equipment: Equipment[];
    reload: () => void;
    setMessage: (message: string) => void;
};

export default function Rooms({
                                  data,
                                  equipment,
                                  reload,
                                  setMessage
                              }: RoomsProps) {
    const changeEquipment = async (
        room: Classroom,
        code: string,
        add: boolean
    ) => {
        try {
            await request(
                `/classrooms/${room.id}/equipment/${code}`,
                {
                    method: add ? 'PUT' : 'DELETE'
                }
            );

            reload();
        } catch (error) {
            setMessage((error as Error).message);
        }
    };

    return (
        <section className="roomgrid">
            {data.map((room) => (
                <RoomCard
                    key={room.id}
                    room={room}
                    equipment={equipment}
                    onEquipmentChange={changeEquipment}
                />
            ))}
        </section>
    );
}