import {FormGroup} from "@angular/forms";

export class Utils {

  public static matchPassword(firstControl: string, secondControl: string): any {
    // @ts-ignore //TODO edit this fuck ?????
    return (control: FormGroup): { [key: string]: boolean } | null => {
      if (control.get(firstControl)?.value !== control.get(secondControl)?.value) {
        const err = {noMatch: true};
        control.get(firstControl)?.setErrors(err);
        return err;
      } else {
        const noMatchError = control.get(firstControl)?.hasError('noMatch');
        if (noMatchError) {
          delete control.get(firstControl)?.errors?.noMatch;
          control.get(firstControl)?.updateValueAndValidity();
        }
      }
    };
  }

}
