import { Component,OnInit,TemplateRef  } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { NoteType } from 'src/app/_enums/note-type'
import { ToastrService } from 'ngx-toastr';
import { Root, RootList } from 'src/app/_models/root';
import { Note } from 'src/app/_models/dashboard/note';
@Component({
  selector: 'app-regular-note',
  templateUrl: './regular-note.component.html',
  styleUrls: ['../dashboard.component.css','./regular-note.component.css']
})
export class RegularNoteComponent implements OnInit {
  RegularNotes: Note[]=[];

  modalRef?: BsModalRef;
  regularForm: FormGroup= new FormGroup({});
  constructor(private modalService: BsModalService, 
              private formBuilder: FormBuilder,
              private dashboardService:DashboardService,
              private toastr:ToastrService){}

       
  ngOnInit(): void {
    this.RegularFormInitilaze();
    this.GetRegular();
  }
   
  RegularFormInitilaze() {
    this.regularForm = this.formBuilder.group({
      note : ['',[Validators.required,Validators.maxLength(100)]],
       
    });
  }
 
  GetRegular(){
    this.dashboardService.GetNotes(NoteType.Regular).subscribe(
      (response:RootList<Note>) => {  
        if(response && response.data) {   
          this.RegularNotes=response.data ;
        }  
      } 
    )
   }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered'
    });
  }
  closeModal() {
    this.RegularFormInitilaze();
    this.modalRef?.hide();
  }

  submitRegular() {
     if (this.regularForm.valid) {
      this.dashboardService.saveNote(this.regularForm.value,NoteType.Regular).subscribe(
        (response:Root<Note>) => {       
          this.RegularNotes.push(response.data)
          this.toastr.success('saved successfully', 'Success', { timeOut: 3000 });
        }     
      );
      this.closeModal();
    }  
  }
  DeleteRegular(id:any){
    this.dashboardService.deleteNote(id).subscribe(
      (reponse:any) => {    
        if(this.RegularNotes && this.RegularNotes.length >0){     
          this.RegularNotes=this.RegularNotes.filter(x=>x.id!==id);     
          this.toastr.success('delete successfully', 'Success', { timeOut: 3000 });
        }  
      } 
    )
  }
}
