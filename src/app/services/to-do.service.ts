import { Injectable } from '@angular/core';
import {ToDo} from '../models/ToDo';
import { Observable ,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

   d=new Date();

private filteredListToDo : ToDo[]=[];
private  listToDo: ToDo[] = [   
  {
    body: "This is just a note!",
    publishDate:new Date(),
    isToDo:false,
    id:"todo250"
  },
  {
    body: "This is just To-Do!",
    publishDate:new Date(),
    Due:new Date(),
    isToDo:true,
    id:"todo280"
  }
];
  constructor() { }

  getTodo():Observable<ToDo[]>{
    return of(this.listToDo);
  }

  postToDo(form , publishdate){
    // Generates 3 digit random number for each todo as id
      var number;
      do {
        number = Math.floor(Math.random() * 999);
      } while (number < 100);

   this.listToDo.push({
      body: form.note,
      Due:form.duedate,
      publishDate: publishdate,
      isToDo:form.todo,
      id: "todo"+number
    });
    return of(this.listToDo)
  }

  removeTodo(id){
  //  console.log(id);
    for(let i=0;i<this.listToDo.length;i++){
      for(let j=0;j<id.length;j++){
        if(this.listToDo[i].id == id[j]){
    //      console.log(this.listToDo[i].id+"Matched"+id[j]);
        this.listToDo.splice(this.listToDo.indexOf(this.listToDo[i]),1);
        }
      }
    }   
     //console.log("removed",this.listToDo);
  }

  showAllNotes():Observable<ToDo[]>{
    return of(this.listToDo);
  }

  showOnlyToDo(todo){
//    console.log(todo);
    todo = todo.filter(
      t=>t.isToDo == true
      );
//      console.log(todo);
      return of(todo);
  }
}
