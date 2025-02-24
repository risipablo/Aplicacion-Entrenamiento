export interface NatacionList {
    _id: number,
    day: string,
    title: string,
    routine: string[],
    piletas: number,
    meters: number
}

export interface Exercise {
    _id: number;
    name: string;
    primaryMuscle: string;
    secondMuscle: string;
    equipament: string;
}

export interface RoutineList {
    _id: number,
    title:string,
    muscle:string,
    series:string,
    reps:string,
}

export interface NotesList{
    _id:number,
    title:string,
    description:string,
    date:string,
}