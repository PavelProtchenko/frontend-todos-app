import { Component, OnInit } from '@angular/core';
import { TodosService, Todo } from '../shared/todos.service';
import { delay } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  form: FormGroup
  todos: Todo[] = []

  public loading: boolean = true
  public show: boolean = false
  public searchString: string = ''

  constructor(public todosService: TodosService) { }

  ngOnInit(): void {
    // this.todosService.load().pipe().subscribe(() => {
    //   return this.todos
    // })

    this.todosService.fetchTodos()
    .pipe(delay(10))
    .subscribe(() => {
      this.loading = false
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  createTodo() {
    const {title} = this.form.value

    const todo: Todo = {
      title
    }
    this.todosService.create(todo).subscribe(todo => {
      this.form.reset()
    }, err => console.log(err))
    // console.log(todo)
  }

  onChange(id: number) {
    this.todosService.onToggle(id).subscribe(todo => {todo})
  }

  removeBtn(id: number) {
    this.todosService.remove(id).subscribe(todo => {todo})
  }

  showForm() {
    this.show = true
    if (this.show === true) {
      console.log('Yeahuu')
    }
  }
}
