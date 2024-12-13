import { NoteType } from "src/app/_enums/note-type"
export interface Note{
    id:string,
    userId:string,
    type:NoteType| null,
    noteText:string| null,
    url:string| null,
    inputDate:string| null,
    isComplete:boolean
}