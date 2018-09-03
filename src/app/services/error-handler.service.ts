import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    constructor(private snackbar: MatSnackBar) {
    }

    showError(error) {
        const message = error && error.message ? error.message : 'No error provided from API';

        this.snackbar.open(message, '×', { panelClass: ['error'], verticalPosition: 'top', duration: 3000 });
    }

    showMessage(message: string) {
        message = message && message.length > 0 ? message : 'No message provided';

        this.snackbar.open(message, '×', { panelClass: ['error'], verticalPosition: 'top', duration: 3000 });
    }
}
