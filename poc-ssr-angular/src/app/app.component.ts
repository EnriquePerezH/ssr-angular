import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'poc-ssr-angular';
  private readonly http = inject(HttpClient);
  todos$ = this.http
    .get<any[]>('https://jsonplaceholder.typicode.com/todos')
    .pipe(
      tap((res: any) => {
        console.log('loaded all todos', res);
      })
    );
  constructor() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((res) => console.log('loaded from constructor todo 1', res));
  }

  getTodo() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/10')
      .subscribe((res) => console.log('loaded from btn todo 1', res));
  }
}
