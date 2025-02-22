import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any[] = [];
  selectedUser: any = null;
  selectedIndex: number = -1;

  handleUserEvent(eve: any) {
    if (this.selectedIndex > -1) {
      this.users[this.selectedIndex] = eve;
      this.selectedUser = null;
      this.selectedIndex = -1;
    } else {
      this.users.push(eve);
    }
  }

  editUser(user: any, index: number) {
    this.selectedUser = { ...user };
    this.selectedIndex = index;
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    if (this.selectedIndex === index) {
      this.selectedUser = null;
      this.selectedIndex = -1;
    }
  }
}
