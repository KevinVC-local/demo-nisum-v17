import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [MatDialogContent, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfirmComponent {

  readonly dialogRef = inject(MatDialogRef<ModalConfirmComponent>);

  readonly title = model('Confirm action');
  readonly message = model('Are you sure you want to continue with the action?');

  ngOnInit(): void {
    console.log(this.title());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
