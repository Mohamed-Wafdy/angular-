import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnChanges {
  @Input() user: any = null;
  @Output() userEvent = new EventEmitter<any>();

  model = {
    userName: '',
    userEmail: '',
    UserID: ''
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue) {
      this.model = { ...changes['user'].currentValue };
    }
  }

  handleClick() {
    this.userEvent.emit({ ...this.model });
    this.model = {
      userName: '',
      userEmail: '',
      UserID: ''
    };
  }
}
