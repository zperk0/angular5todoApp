import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { ToDoService } from './services/to-do.service';
import { ToDoFormComponent } from './components/to-do-form/to-do-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    ToDoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
