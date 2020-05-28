import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap, map} from 'rxjs/operators';

export interface Todo {
  id?: number
  title: string
  completed?: boolean
  created_at?: any
}

@Injectable({providedIn: 'root'})
export class TodosService {
  public todos: Todo[] = []
  title: any

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/api/todos.json')
      .pipe(tap( todos => this.todos = todos ))
  }

  onToggle(id: number): Observable<any> {
    const idx = this.todos.findIndex(t => t.id === id)
    const data = {
      title: this.todos[idx].title,
      completed: this.todos[idx].completed = !this.todos[idx].completed
    }
    console.log(data)
    return this.http.put<any>(`http://localhost:3000/api/todos/${id}`, data)
     .pipe(map(res => {
        console.log(res)
     }))
  }

  // load(): Observable<Todo[]>{
  //   return this.http.get<Todo[]>('http://localhost:3000/api/todos.json')
  //     .pipe(tap(todos => {
  //       if (!todos) {
  //         return []
  //       }
  //       return Object.keys(this.todos).map(key => ({...this.todos[key], id: key}))
  //     }))
  // }

  create(todo: Todo): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/todos`, todo)
      .pipe(map(res => {
        return this.todos.unshift({...todo, id: res.id, created_at: res.created_at, completed: res.completed })
      }))
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/todos/${id}.json`)
      .pipe(map(res => {
        this.todos = this.todos.filter(todo => todo.id !== id)
      }))
  }
}
