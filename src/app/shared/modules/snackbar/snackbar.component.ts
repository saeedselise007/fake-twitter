import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss'],
    // encapsulation: ViewEncapsulation.None,
})
export class SnackbarComponent {

    constructor(private _snackBar: MatSnackBar) {
    }

    openSnackBar(message): void {
        this._snackBar.open(message, 'X', {
            duration: 3000,
            panelClass: ['red-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top',
        });
    }

}
