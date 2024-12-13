import { Component,OnInit,TemplateRef  } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { Note } from 'src/app/_models/dashboard/note';
import { NoteType } from 'src/app/_enums/note-type'
import { ToastrService } from 'ngx-toastr';
import { Root, RootList } from 'src/app/_models/root';
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['../dashboard.component.css','./bookmark.component.css']
})
export class BookmarkComponent implements OnInit{
  Bookmarks: Note[]=[]; 

  modalRef?: BsModalRef;
  bookmarkForm: FormGroup= new FormGroup({});
  constructor(private modalService: BsModalService, 
              private formBuilder: FormBuilder,
              private dashboardService:DashboardService,
              private toastr:ToastrService  
            ){}
  
  ngOnInit(): void {
    this.BookmarkFormInitilaze();
    this.GetBookMarks();
  }
   
  BookmarkFormInitilaze() {
    this.bookmarkForm = this.formBuilder.group({
      url : ['',[Validators.required, Validators.pattern(/^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/)]],
       
    });
  }
  GetBookMarks(){
    this.dashboardService.GetNotes(NoteType.Bookmark).subscribe(
      (response:RootList<Note>) => {  
        if(response && response.data) {   
          this.Bookmarks=response.data ;
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
    this.BookmarkFormInitilaze();
    this.modalRef?.hide();
  }

  submitBookMark() {  
     if (this.bookmarkForm.valid) {
      this.dashboardService.saveNote(this.bookmarkForm.value,NoteType.Bookmark).subscribe(
        (response:Root<Note>) => {       
          this.Bookmarks.push(response.data)
          this.toastr.success('saved successfully', 'Success', { timeOut: 3000 });
        }     
      );
      this.closeModal();
    }  
  }

  DeleteBookMark(id:any){
    this.dashboardService.deleteNote(id).subscribe(
      (reponse:any) => {    
        if(this.Bookmarks && this.Bookmarks.length >0){     
          this.Bookmarks=this.Bookmarks.filter(x=>x.id!==id);     
          this.toastr.success('delete successfully', 'Success', { timeOut: 3000 });
        }  
      } 
    )
  }

}
