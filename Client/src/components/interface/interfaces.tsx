export interface NatacionList {
    _id: number,
    day: string,
    title: string,
    piletas: string[], //(series)
    meters:string[],
    routine: string[],
    
}

export interface Exercise {
    _id: number;
    name: string;
    primaryMuscle: string;
    secondMuscle: string;
    equipament: string;
}

// interface de gimnasio
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