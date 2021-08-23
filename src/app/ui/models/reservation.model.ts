
export class Reservation {
    user!: string;
    schedule!: Schedule;
    price!: number;
    discount!: string;
    state!: State;
}

export class Schedule {
    year!: string;
    month!: string;
    day!: string;
    hour!: string;
}

export enum State {
    VALID,
    INVALID
}  