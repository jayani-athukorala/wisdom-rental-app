export type Equipment = { id: number, equipmentCode: string, equipmentName: string };
export type Classroom = {
    id: number,
    roomName: string,
    capacity: number,
    roomType: string,
    accessible: boolean,
    active: boolean,
    equipment: Equipment[]
};
export type Customer = {
    id: number,
    customerType: 'COMPANY' | 'INDIVIDUAL',
    fullName: string,
    companyName?: string,
    email: string,
    phone: string,
    active: boolean
};
export type Booking = {
    id: number,
    classroom: Classroom,
    customer: Customer,
    bookingUser: string,
    startTime: string,
    endTime: string,
    comments?: string,
    status: 'ACTIVE' | 'CANCELLED'
};
