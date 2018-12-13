import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { ToDoService } from "../services/to-do.service";
import { ToDo } from "../models/ToDo";

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.css']
})
export class DisplayNoteComponent implements OnInit {

  public ToDoList = [];

  public selectedTodo = [];

  //boolean values
  public hideDatePicker:boolean = true; 
  public dueDate:boolean;
  public showEditOptions:boolean = false; 
  public showEditButton:boolean = true;
  public showAddNoteInSmallScreen = true;
  public filterByDefault = true;
  public selectedFilter = false;
  public noToDos = false;

  constructor(private ToDoService:ToDoService) { }

  ngOnInit() {
    this.refreshToDoList()
    if(this.ToDoList.length == 0){
      this.noToDos = true;
    }
  }


  AllNotes(){
   this.filterByDefault = true;
   this.selectedFilter = false;
   this.ToDoService.showAllNotes().subscribe(
     res=>{
       this.ToDoList = res;
     }
     );
  }

  ToDoOnly(){
    this.filterByDefault = false;
    this.selectedFilter = true;
    this.ToDoService.showOnlyToDo(this.ToDoList).subscribe(
      res =>{
        this.ToDoList = res;
      }
    );
  }

  
  edit(){
    this.showEditOptions = true;
    this.showAddNoteInSmallScreen = false;
    this.showEditButton = false;
  }

  cancel(){
    this.showEditButton = true;
    this.showAddNoteInSmallScreen = true;
    this.showEditOptions = false;
  }


  showDatePicker(choice){
  //  console.log(choice);
    this.hideDatePicker = !choice;
  }

  selectedToDo(e,id){
    if(e.target.checked){
      this.selectedTodo.push(id);
    //  console.log("pushed",this.selectedTodo);
    }else{
      this.selectedTodo.splice(this.selectedTodo.indexOf(id), 1);
    //  console.log("removed",this.selectedTodo);
    }
  }

  remove(){
    if(this.selectedTodo.length == 0){
      alert("Please select an item to be removed!!!");
    }else
    {
      this.ToDoService.removeTodo(this.selectedTodo);
      this.selectedTodo = [];
    }
  }

  submitForm(form){
    if(!form.todo){
      form.todo = false;
    }
    let date = new Date();
   // console.log(form);
   
   let due_date = form.duedate;

   let date_1 = new Date(due_date);
   let date_2= new Date(date);

   if(date_1 < date_2){
    alert("Due date should be greater than the current date!!!");
   }
   else 
   {
     this.ToDoService.postToDo(form , date).subscribe(
      res=>{
      //  console.log("Posted"),
        this.refreshToDoList()
    },
      error=>console.log("Error!!",error)
      );
    } 
 }

  refreshToDoList(){
    this.ToDoService.getTodo().subscribe(
      data =>{ 
        this.ToDoList = data; 
      }
    );
    //console.log(this.ToDoList);
  }

}
