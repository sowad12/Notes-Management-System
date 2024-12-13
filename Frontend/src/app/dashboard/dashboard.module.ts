import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { TodoComponent } from './todo/todo.component';
import { ReminderComponent } from './reminder/reminder.component';
import { RegularNoteComponent } from './regular-note/regular-note.component';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms'; 
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    RegularNoteComponent,
    ReminderComponent,
    TodoComponent,
    BookmarkComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports:[
    DashboardComponent,
    RegularNoteComponent,
    ReminderComponent,
    TodoComponent,
    BookmarkComponent
    ]
})
export class DashboardModule { }
