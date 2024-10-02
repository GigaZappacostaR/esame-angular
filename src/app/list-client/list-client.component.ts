import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model'; 
import { AuthService } from '../auth.service'; 
@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'data_nascita', 'actions'];
  editingUser: User | null = null;

  id : number = -1;


  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      data_nascita: ['', Validators.required],
    });

    this.id = sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId') as string) : -1;
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getUsersByAdmin(this.id).subscribe(
      (users:User[]) => {
        this.users = users;
      },
      (error: any) => {
        console.error('Errore nel caricamento degli utenti:', error);

      }
    ) 

    // this.authService.getLoggedUser().subscribe((loggedUser: { username: any; }) => {
    //   this.authService.getUsersByAdmin(loggedUser.username).subscribe((users: User[]) => {
    //     this.users = users;
    //   });
    // });
  }

  addUser() {
    this.editingUser = null;
    this.userForm.reset();
  }

  saveUser() {
    if (this.editingUser) {
      // Modifica utente esistente
      this.authService.updateUser(this.editingUser.id, this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.userForm.reset();
      });
    } else {
      // Aggiungi nuovo utente
      this.authService.addUser(this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.userForm.reset();
      });
    }
  }

  editUser(user: User) {
    this.editingUser = user;
    this.userForm.patchValue(user);
  }

  deleteUser(userId: number) {
    this.authService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  cancelEdit() {
    this.editingUser = null;
    this.userForm.reset();
  }
}