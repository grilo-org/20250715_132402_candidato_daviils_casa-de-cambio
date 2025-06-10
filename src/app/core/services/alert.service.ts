import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    showSuccess(message: string, title: string = 'Sucesso!') {
        Swal.fire({
            title: title,
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
        });
    }

    showError(message: string, title: string = 'Erro!') {
        Swal.fire({
            title: title,
            html: message,
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }

    showWarning(message: string, title: string = 'Atenção!') {
        Swal.fire({
            title: title,
            html: message,
            icon: 'warning',
            confirmButtonText: 'OK',
        });
    }

    showInfo(message: string, title: string = 'Informação!') {
        Swal.fire({
            title: title,
            html: message,
            icon: 'info',
            confirmButtonText: 'OK',
        });
    }

    confirmMessage(t: string, m: string, callback: any = null) {
        Swal.fire({
            title: t,
            html: m,
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            confirmButtonColor: '#032E58',
            cancelButtonColor: '#dc3545'
        }).then((result) => {
            console.log('retorno ', result);
            if (result.isConfirmed) {
                console.log('retorno 456 ', result);
                if (callback != null) {
                    console.log('retorno 789 ', result);
                    callback();
                }
            }
        });
    }

    showMessage(t: string, m: string, type: any = 'warning') {
        Swal.fire({
            title: t,
            html: m,
            icon: type,
            confirmButtonColor: '#032E58',
        });
    }
}
