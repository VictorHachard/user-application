import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {AddressService} from "../../../../../_services/_api/address.service";
import {Address} from "../../../../../_models/address";
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {UserService} from "../../../../../_services/_api/user.service";
import {UserSecurity} from "../../../../../_models/user.security";

@Component({
  selector: 'app-setting-address',
  templateUrl: './setting-address.component.html',
  styleUrls: ['./setting-address.component.scss']
})
export class SettingAddressComponent implements OnInit {

  addAddressForm!: FormGroup;
  addressForm!: FormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  addressList!: Address[];
  value!: number | undefined;
  _reload = true;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private addressService: AddressService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  console.log(this.user)
  }

  ngOnInit(): void {
    this.value = this.user.themeSimplifiedDto?.id;
    this.addressForm = new FormGroup({
      id: new FormControl(this.user.themeSimplifiedDto?.id, Validators.required)
    });
    this.addAddressForm = new FormGroup({
      alias: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      building: new FormControl(''),
      street: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [Validators.required])
    });
    this.reload(); //TODO find better way
  }

  private reload() {
    setTimeout(() => this._reload = false);
    setTimeout(() => this._reload = true);
  }

  get f() { return this.addAddressForm.controls; }

  addAddress(): void {
    this.addressService.create({
      alias: this.f.alias.value,
      name: this.f.name.value,
      building: this.f.building.value,
      street: this.f.street.value,
      postcode: this.f.postcode.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('addAddress');
      this.isSummited.emit(true);
    });
  }

  address(id: number): void {

  }

  removeAddress(id: number): void {
    this.addressService.delete(id).subscribe(value => {
      this.alertManagerManager.addAlertIcon('address');
      this.isSummited.emit(true);
    });
  }
}
