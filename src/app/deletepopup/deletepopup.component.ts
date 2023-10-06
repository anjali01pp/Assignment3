import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deletepopup',
  templateUrl: './deletepopup.component.html',
  styleUrls: ['./deletepopup.component.css']
})
export class DeletepopupComponent {
  @Input() message!: string;
  @Output() confirmed = new EventEmitter<boolean>();

  confirmDelete() {
    this.confirmed.emit(true);
  }

  cancelDelete() {
    this.confirmed.emit(false);
  }
}
