import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

interface AlertDialogTexts {
  action: string;
  text: string;
  confirmText: string;
  cancelText: string;
}

interface ResultDialog {
  success();
  failed(error: string);
}

@Injectable()
export class AlertDialogService {

  constructor() { }

  deleteDialog(itemType: string) {
    return this.sureDialog({
      action: 'Deleted',
      text: 'You won\'t be able to revert this!',
      confirmText: `Your ${itemType} has been deleted.`,
      cancelText: `Your ${itemType} is safe :)`,
    });
  }

  sureDialog(alertDialogTexts: AlertDialogTexts) {
    return new Promise<ResultDialog>((resolve, reject) => {
      swal({
        titleText: 'Are you sure?',
        text: alertDialogTexts.text,
        type: 'warning',
        showCancelButton: true,
        buttonsStyling: true,
        reverseButtons: true,
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.value) {
          resolve({
            success: () => {
              swal(
                `${alertDialogTexts.action}!`,
                alertDialogTexts.confirmText,
                'success'
              );
            },
            failed: (err) => {
              swal(
                'Error',
                err,
                'error',
              );
            }
          });
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal(
            'Cancelled',
            alertDialogTexts.cancelText,
            'error'
          );
        }
      });
    });
  }


  confrimDialog(alertDialogTexts: AlertDialogTexts, promise?: Promise<any>) {
    swal({
      titleText: 'Are you sure?',
      text: alertDialogTexts.text,
      type: 'warning',
      showCancelButton: true,
      buttonsStyling: true,
      reverseButtons: true,
      confirmButtonText: 'Confirm',
      preConfirm: () => {
        promise
          .then(() => {
            swal(
              `${alertDialogTexts.action}!`,
              alertDialogTexts.confirmText,
              'success'
            );
          })
          .catch(() => {
            swal.insertQueueStep({
              type: 'error',
              title: 'Some erorr'
            });
          });
      },
    }).then((result) => {
      if (result.value) {
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelled',
          alertDialogTexts.cancelText,
          'error'
        );
      }
    });
  }

  warningDialog(title: string, text: string) {
    swal({
      type: 'warning',
      title: title,
      text: text,
      backdrop: `radial-gradient(#40404b, #111118) rgba(34,34,40,0.94)`
    });
  }

}
