import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject,switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
import { NoteType } from '../_enums/note-type';
import { Note } from '../_models/dashboard/note';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Root, RootList } from '../_models/root';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnInit {
  note: Note | null = {
    id: '',
    userId: '',
    type: null,
    noteText: null,
    url: null,
    inputDate: null,
    isComplete: false,
  };
   user:any|null=null
  constructor(private http: HttpClient,
              private authService:AuthService,
              private toastr: ToastrService) {    
                  this.authService.currentUser$.subscribe(user => {
                    if (user) {

                      this.user = user; 
                    }
                  });            
              }

  ngOnInit() {
    
  }
  GetNotes(type: NoteType){
    if (this.user) {
      const params = { userId: this.user.data.id,type: type.toString() };
      return this.http.get<RootList<Note>>(`${environment.baseUrl}dashboard/get-notes`,{params});
    }
    throw new Error('User not found');

  }      
  FilterNotes(type: NoteType,DateType:string){
    if (this.user) {
      const params = { userId: this.user.data.id,type: type.toString(),dateType:DateType };
      return this.http.get<RootList<Note>>(`${environment.baseUrl}dashboard/filter-notes`,{params});
    }
    throw new Error('User not found');

  }     

  deleteNote(id:string){
    return this.http.delete<any>(`${environment.baseUrl}dashboard/delete-note/${id}`);
  }
  saveNote(model: any, type: NoteType) {
        if (this.user) {
          const data = this.dataProcess(model, type, this.user.data.id);
          return this.http.post<Root<Note>>(`${environment.baseUrl}dashboard/create-note`, data).pipe(

          );
        }
        throw new Error('User not found');
       
  }
    dataProcess(model: any, type: any,userId:string) {
         
      if (this.note) {
      if (type === NoteType.Todo) {  
          this.note.userId=userId?? null;
          this.note.inputDate=model?.inputDate?? null;
          this.note.noteText=model?.note?? null;
          this.note.isComplete = model?.isComplete ?? false;    
          this.note.type=type;
        } 
       else if (type === NoteType.Reminder) {  
          this.note.userId=userId?? null;
          this.note.inputDate=model?.inputDate?? null;
          this.note.noteText=model?.note?? null;   
          this.note.type=type;     
        } 
       else if (type === NoteType.Bookmark) {  
          this.note.userId=userId?? null;
          this.note.url=model?.url?? null;  
          this.note.type=type;   
        }   
        else if (type === NoteType.Regular) {  
          this.note.userId=userId?? null;
          this.note.noteText=model?.note?? null;   
          this.note.type=type;  
        }   
       return this.note;
       
      }
      else {
        return this.note;

      }
    }
    
}

