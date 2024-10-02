import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';

interface Admin {
  id: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Assicurati che questo sia corretto

  constructor(private http: HttpClient) {}

  // authenticate(username: string, password: string): Observable<{ id: string }> {
  //   return this.http.post<{ id: string }>(`${this.apiUrl}/authenticate`, { username, password });
  // }

  getUser(): Observable<any[]> {
    return this.http.get<User[]>(this.apiUrl + '/admins');
  }

  authenticatorResponse(username: string, password: string): Observable<any> {
    return this.getUser().pipe(
      map((users: User[]) => users.find(user => user.username === username && user.password === password))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/utenti`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/utenti/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/utenti/${id}`);
  }

  getUsersByAdmin(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/utenti?user_id=${id}`);
  }

  getLoggedUser(): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/admins`);
  }
}
