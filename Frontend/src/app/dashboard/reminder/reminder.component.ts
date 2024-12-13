import { Component,OnInit,TemplateRef  } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { NoteType } from 'src/app/_enums/note-type';
import { Note } from 'src/app/_models/dashboard/note';
import { ToastrService } from 'ngx-toastr';
import { Root, RootList } from 'src/app/_models/root';
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['../dashboard.component.css','./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  Reminders: Note[]=[]; 
  modalRef?: BsModalRef;
  reminderForm: FormGroup= new FormGroup({});
  constructor(private modalService: BsModalService, 
              private formBuilder: FormBuilder,
              private dashboardService:DashboardService,
              private toastr:ToastrService
            ){}

  ngOnInit(): void {
    this.RemiderFormInitilaze();
    this.GetReminders();
  }
   
  RemiderFormInitilaze() {
    const currDateTime=this.getCurrentDateTime();
    this.reminderForm = this.formBuilder.group({
      note : ['',[Validators.required,Validators.maxLength(100)]],
      inputDate: [currDateTime, [Validators.required]],  
      
    });
  }


  GetReminders(){
    this.dashboardService.GetNotes(NoteType.Reminder).subscribe(
      (response:RootList<Note>) => {  
        if(response && response.data) {   
          this.Reminders=response.data ;
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
    this.RemiderFormInitilaze();
    this.modalRef?.hide();
  }

  submitReminder() {
        if (this.reminderForm.valid) {
        this.dashboardService.saveNote(this.reminderForm.value,NoteType.Reminder).subscribe(
          (response:Root<Note>) => {       
            this.Reminders.push(response.data)
            this.toastr.success('saved successfully', 'Success', { timeOut: 3000 });
          }     
        );
        this.closeModal();
      }  
  }

  filterReminders(event:any){
  this.dashboardService.FilterNotes(NoteType.Reminder,event.target.value).subscribe(
      (response:RootList<Note>) => {  
        if(response && response.data) {
          this.Reminders=response.data;
        }    
      } 
    )
  }

  DeleteReminder(id:any){
    this.dashboardService.deleteNote(id).subscribe(
      (reponse:any) => {    
        if(this.Reminders && this.Reminders.length >0){     
          this.Reminders=this.Reminders.filter(x=>x.id!==id);     
          this.toastr.success('delete successfully', 'Success', { timeOut: 3000 });
        }  
      } 
    )
  }
}
