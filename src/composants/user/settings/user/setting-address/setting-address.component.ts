import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {AddressService} from "../../../../../_services/_api/address.service";
import {Address} from "../../../../../_models/address";

@Component({
  selector: 'app-setting-address',
  templateUrl: './setting-address.component.html',
  styleUrls: ['./setting-address.component.scss']
})
export class SettingAddressComponent {

  addressForm!: FormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  addressList!: Address[];
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private addressService: AddressService) { }

  ngOnInit(): void {
  }

}
