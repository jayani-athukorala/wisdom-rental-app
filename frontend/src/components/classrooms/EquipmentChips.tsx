import type {
    Classroom,
    Equipment
} from '../../types';

type EquipmentChipsProps = {
    room: Classroom;
    equipment: Equipment[];
    onChange: (
        room: Classroom,
        equipmentCode: string,
        add: boolean
    ) => void;
};

export default function EquipmentChips({
                                           room,
                                           equipment,
                                           onChange
                                       }: EquipmentChipsProps) {
    return (
        <div className="chips">
            {equipment.map((item) => {
                const hasEquipment =
                    room.equipment.some(
                        (roomEquipment) =>
                            roomEquipment.equipmentCode ===
                            item.equipmentCode
                    );

                return (
                    <button
                        key={item.id}
                        className={
                            hasEquipment
                                ? 'chip selected'
                                : 'chip'
                        }
                        onClick={() =>
                            onChange(
                                room,
                                item.equipmentCode,
                                !hasEquipment
                            )
                        }
                    >
                        {item.equipmentCode}
                    </button>
                );
            })}
        </div>
    );
}