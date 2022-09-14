import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {AddressService} from "../../../../../_services/_api/address.service";
import {Address} from "../../../../../_models/address";
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {UserService} from "../../../../../_services/_api/user.service";
import {UserSecurity} from "../../../../../_models/user.security";
import {CountryService} from "../../../../../_services/_api/country.service";
import {Country} from "../../../../../_models/country";

@Component({
  selector: 'app-setting-address',
  templateUrl: './setting-address.component.html',
  styleUrls: ['./setting-address.component.scss']
})
export class SettingAddressComponent implements OnInit {

  addAddressForm!: UntypedFormGroup;
  addressForm!: UntypedFormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  addressList!: Address[];
  countryList!: Country[];
  proposalCountryList!: Country[];
  value!: number | undefined;
  _reload = true;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private addressService: AddressService,
              private countryService: CountryService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.value = this.user.themeSimplifiedDto?.id;
    this.addressForm = new UntypedFormGroup({
      id: new UntypedFormControl(this.user.themeSimplifiedDto?.id, Validators.required)
    });
    this.addAddressForm = new UntypedFormGroup({
      alias: new UntypedFormControl('', [Validators.required]),
      name: new UntypedFormControl('', [Validators.required]),
      building: new UntypedFormControl(''),
      street: new UntypedFormControl('', [Validators.required]),
      postcode: new UntypedFormControl('', [Validators.required]),
      country: new UntypedFormControl('', [Validators.required])
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
      postcode: this.f.postcode.value,
      country: this.f.country.value}).subscribe(value => {
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

  select(country: Country): void {
    this.addAddressForm.patchValue({country: country.name});
  }

  inputChange($event: any): void {
    this.proposalCountryList = [];
    if (this.f.country.value.length > 0) {
      this.countryService.getAllActiveDto(this.f.country.value, 'name', 'name').subscribe(value => {
        this.proposalCountryList = value
      });
    } else {
      this.countryService.getAllActiveDto().subscribe(value => {
        this.proposalCountryList = value
      });
    }
  }

  /**
   * Allow to click everywhere to close the dropdown.
   * @param event
   */
  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (!(event.target as Element).className.includes('no-click-ish')) {
      this.proposalCountryList = [];
    }
  }
}
