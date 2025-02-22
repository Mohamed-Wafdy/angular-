import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'task';
  users = [
    { name: 'Ahmed Ali', address: 'Nile Street, Cairo' },
    { name: 'Mohamed Hassan', address: 'King Street, Riyadh' },
    { name: 'Khaled Saeed', address: 'Al-Haram Street, Giza' },
    { name: 'Fatima Zahra', address: 'Salam Street, Doha' },
    { name: 'Youssef Ibrahim', address: 'Victory Street, Dubai' },
    { name: 'Sarah Mahmoud', address: 'Sea Street, Beirut' },
    { name: 'Ali Al-Kadhimi', address: 'Airport Street, Baghdad' },
    { name: 'Noor Al-Huda', address: 'Olive Street, Amman' },
    { name: 'Ibrahim Sami', address: 'University Street, Damascus' },
    { name: 'Hind Abdulrahman', address: 'Palm Street, Jeddah' },
    { name: 'Mohamed Hassan', address: 'Light Street, Mecca' },
    { name: 'Khaled Saeed', address: 'Zahra Street, Kuwait' },
    { name: 'Fatima Zahra', address: 'Jasmine Street, Manama' },
    { name: 'Sarah Mahmoud', address: 'Pearl Street, Muscat' },
    { name: 'Ali Al-Kadhimi', address: 'Star Street, Khartoum' }
  ];

  searchText: string = '';

  get filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().startsWith(this.searchText.toLowerCase())
    );
  }
}
