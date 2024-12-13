import { Component,OnInit,TemplateRef  } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { NoteType } from 'src/app/_enums/note-type';
import { ToastrService } from 'ngx-toastr';
import { Root, RootList } from 'src/app/_models/root';
import { Note } from 'src/app/_models/dashboard/note';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['../dashboard.component.css','./todo.component.css']
})
export class TodoComponent implements OnInit {
  modalRef?: BsModalRef;

  todoForm: FormGroup= new FormGroup({});
  Todos: Note[]=[]; 
  constructor(private modalService: BsModalService, 
              private formBuilder: FormBuilder,
              private dashboardService:DashboardService,
              private toastr:ToastrService

            ){}

  ngOnInit(): void {
    this.TodoFormInitilaze();
    this.GetNotes();
  }


  TodoFormInitilaze() {
    const currDateTime=this.getCurrentDateTime();
    this.todoForm = this.formBuilder.group({
      note : ['',[Validators.required,Validators.maxLength(100)]],
      inputDate: [currDateTime, [Validators.required]],
      isComplete: [false],
      
    });
  }
  
  GetNotes(){
    this.dashboardService.GetNotes(NoteType.Todo).subscribe(
      (response:RootList<Note>) => {  
        if(response && response.data) {
          this.Todos=response.data ;
        }
     
      } 
    )
   }

  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }


  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered'
    });
  }
  closeModal() {
    this.TodoFormInitilaze();
    this.modalRef?.hide();
  }
 
  submitTodo() {
    if (this.todoForm.valid) {
    this.dashboardService.saveNote(this.todoForm.value,NoteType.Todo).subscribe(
      (response:Root<Note>) => {       
        this.Todos.push(response.data)
        this.toastr.success('Todo saved successfully', 'Success', { timeOut: 3000 });
      }     
    );
    this.closeModal();
  }
}
  
  filterTodos(event:any){
    this.dashboardService.FilterNotes(NoteType.Todo,event.target.value).subscribe(
      (response:RootList<Note>) => {  
        if(response && response.data) {
          this.Todos=response.data;
        }    
      } 
    )
  }
  DeleteTodo(id:string){
    this.dashboardService.deleteNote(id).subscribe(
      (reponse:any) => {    
        if(this.Todos && this.Todos.length >0){     
          this.Todos=this.Todos.filter(x=>x.id!==id);     
          this.toastr.success('delete successfully', 'Success', { timeOut: 3000 });
        }  
      } 
    )

  }
}
