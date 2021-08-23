import { State } from "./state.model";

export class ReservationUI {

    label: string;
    stateLabel: string;
    hour: number;
    state: State;
    colour: string;

    constructor(label: string, stateLabel: string, hour :number, state: State, colour: string){
        this.label = label;
        this.stateLabel = stateLabel;
        this.hour = hour;
        this.state = state;
        this.colour = colour;
    }
}

