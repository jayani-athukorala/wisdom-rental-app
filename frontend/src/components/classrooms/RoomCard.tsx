import EquipmentChips from './EquipmentChips';

import type {
    Classroom,
    Equipment
} from '../../types';

type RoomCardProps = {
    room: Classroom;
    equipment: Equipment[];
    onEquipmentChange: (
        room: Classroom,
        code: string,
        add: boolean
    ) => void;
};

export default function RoomCard({
                                     room,
                                     equipment,
                                     onEquipmentChange
                                 }: RoomCardProps) {
    return (
        <div className="room">
            <div>
                <span className="tag">
                    {room.roomType}
                </span>

                <h3>{room.roomName}</h3>

                <p>
                    {room.capacity} seats ·{' '}
                    {room.accessible
                        ? 'Accessible'
                        : 'Not accessible'}{' '}
                    ·{' '}
                    {room.active
                        ? 'Active'
                        : 'Inactive'}
                </p>

                <EquipmentChips
                    room={room}
                    equipment={equipment}
                    onChange={onEquipmentChange}
                />
            </div>
        </div>
    );
}