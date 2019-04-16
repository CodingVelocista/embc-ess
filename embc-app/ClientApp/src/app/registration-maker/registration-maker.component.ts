import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { AppState } from '../store';
import { RegistrationService } from '../core/services/registration.service';
import {
  Registration, FamilyMember, isBcAddress, Community, Country, Volunteer, IncidentTask, Address, User
} from 'src/app/core/models';
import { IncidentTaskService } from '../core/services/incident-task.service';
import { ValidationHelper } from 'src/app/shared/validation/validation.helper';
import { hasErrors, invalidField, clearFormArray, compareById } from 'src/app/shared/utils';
import { CustomValidators } from 'src/app/shared/validation/custom.validators';
import { GENDER_OPTIONS, INSURANCE_OPTIONS } from 'src/app/constants';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-registration-maker',
  templateUrl: './registration-maker.component.html',
  styleUrls: ['./registration-maker.component.scss']
})
export class RegistrationMakerComponent implements OnInit {
  // state needed by this FORM
  countries$ = this.store.select(s => s.lookups.countries.countries);
  regions$ = this.store.select(s => s.lookups.regions);
  relationshipTypes$ = this.store.select(s => s.lookups.relationshipTypes.relationshipTypes);
  incidentTasks$ = this.incidentTaskService.getIncidentTasks().pipe(map(x => x.data));

  CANADA: Country; // the object representation of the default country

  pageTitle = 'Add an Evacuee';
  activeForm = true; // this lets the user fill things out
  // The model for the form data collected
  form: FormGroup;
  componentActive = true;
  submitted = false;

  // Flags for the different modes this form supports
  createMode = true;
  finalizeMode = false;
  editMode = false; // edit mode is the mode where the form is fed data from the api. (Changes text and etc.)
  summaryMode = false; // just show the summary
  submitting = false; // this is what disables buttons on submit

  // DECLARATION AND CONSENT MUST BE CHECKED BEFORE SUBMIT
  declarationAndConsent: FormControl = new FormControl(null);

  // this is the "final copy" or version of the content in the form that will be updated or refreshed.
  registration: Registration;
  // who's completing/editing this evacuee registration
  currentUser: User;
  submission: any;

  // convenience getters so we can use helper functions in Angular templates
  hasErrors = hasErrors;
  compareById = compareById;

  // `validationErrors` represents an object with field-level validation errors to display in the form
  validationErrors: { [key: string]: any } = {};

  // error summary to display; i.e. 'Some required fields have not been completed.'
  errorSummary = '';

  // generic validation helper
  private constraints: { [key: string]: { [key: string]: string | { [key: string]: string } } };
  private validationHelper: ValidationHelper;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>, // ngrx app state
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private incidentTaskService: IncidentTaskService,
    private router: Router,
    private authService: AuthService,
  ) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.constraints = {
      incidentTask: {
        required: 'Please select a task number from the list.'
      },
      facility: {
        required: 'Please state the Facility Name / Registration Location.'
      },
      hostCommunity: {
        required: 'Please select the host community from the list.'
      },
      headOfHousehold: {
        firstName: {
          required: 'Please enter a first name.',
        },
        lastName: {
          required: 'Please enter a last name.',
        },
        dob: {
          required: 'Please enter date of birth.',
          date: 'Please enter a valid date.',
          maxDate: 'Date of birth must be today or in the past.',
        },
      },
      registeringFamilyMembers: {
        required: 'Please register any immediate family members who live within the same household as the evacuee.',
      },
      primaryResidenceInBC: {
        required: 'Please make a selection regarding your primary residence.',
      },
      phoneNumber: {
        phone: 'Please enter a valid telephone number.',
      },
      phoneNumberAlt: {
        phone: 'Please enter a valid telephone number.',
      },
      email: {
        email: 'Please enter a valid email address.',
      },
      mailingAddressSameAsPrimary: {
        required: 'Please select whether your mailing address is the same as your primary residence.',
      },
      mailingAddressInBC: {
        required: 'Please make a selection regarding your mailing address.',
      },
      insuranceCode: {
        required: 'Please make a selection regarding insurance coverage.',
      },
      dietaryNeeds: {
        required: 'Please make a selection regarding dietary requirements.',
      },
      medicationNeeds: {
        required: 'Please make a selection regarding medication.',
      },
      hasThreeDayMedicationSupply: {
        required: 'Please make a selection regarding medication supply.',
      },
      hasPets: {
        required: 'Please make a selection regarding pets.',
      },
      requiresSupport: {
        required: 'Please select whether supports are required.',
      },
    };
    // TODO: Wow. it sure would be nice if we could just instatiate a class instead of using interfaces
    this.registration = this.blankRegistration();
    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.validationHelper = new ValidationHelper(this.constraints);
  }

  // convenience getter for easy access to form fields within the HTML template
  get f(): any { return this.form.controls; }

  // convenience getter for easy access to validation errors within the HTML template
  get e(): any { return this.validationErrors; }

  // Shortcuts for this.form.get(...)
  // this is a way to grab the familymembers in a typed way
  get familyMembers() { return this.f.familyMembers as FormArray; }

  disableInput(disabled: boolean) {
    // hide the form TODO: V1 shouldn't handle sensitive information. This is a workaround toggle.
    this.activeForm = !disabled;
  }

  ngOnInit() {
    // fetch the default country
    this.countries$.subscribe((countries: Country[]) => {
      // the only(first) element that is named Canada
      countries.forEach((country: Country) => {
        // if the canada is not set and we found one in the list
        if (country.name === 'Canada') {
          this.CANADA = country;
        }
      });
    });

    // Create form controls
    this.initForm();

    // Watch for value changes
    this.onFormChange();

    // Know the current user
    this.authService.getCurrentUser().subscribe(u => this.currentUser = u);

    // if there are route params we should grab them
    const id = this.route.snapshot.params.id;

    if (id) {
      // this is a form with data flowing in.
      // TODO: Redirect to error page if we fail to fetch the registration
      this.registrationService.getRegistrationById(id).subscribe(r => {

        // set registration mode to edit and save the previous content in an object.
        this.registration = r;
        this.editMode = true;
        this.displayRegistration(r);
      });
    } else {
      // this is a fresh form
      this.displayRegistration();
    }
  }

  invalid(field: string, parent: FormGroup = this.form): boolean {
    return invalidField(field, parent, this.submitted);
  }

  addFamilyMember(fmbr?: FamilyMember): void {
    this.familyMembers.push(this.createFamilyMember(fmbr));
  }

  removeFamilyMember(i: number): void {
    this.familyMembers.removeAt(i);
  }

  // reset the list of family members
  clearFamilyMembers(): void {
    clearFormArray(this.familyMembers);
  }

  // family member formgroup
  createFamilyMember(fmbr?: FamilyMember): FormGroup {
    if (fmbr) {
      return this.formBuilder.group({
        bcServicesNumber: fmbr.bcServicesNumber || null,
        id: fmbr.id || null,
        active: fmbr.active || null,
        sameLastNameAsEvacuee: fmbr.sameLastNameAsEvacuee,
        firstName: [fmbr.firstName, Validators.required],
        lastName: [fmbr.lastName, Validators.required],
        nickname: fmbr.nickname,
        initials: fmbr.initials,
        gender: fmbr.gender,
        dob: [fmbr.dob, [Validators.required, CustomValidators.date('YYYY-MM-DD'), CustomValidators.maxDate(moment())]], // TODO: check this!!
        relationshipToEvacuee: [fmbr.relationshipToEvacuee, Validators.required],
      });
    } else {
      // make a new family member blank and return it.
      return this.formBuilder.group({
        sameLastNameAsEvacuee: true,
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        initials: '',
        gender: null,
        dob: [null, [Validators.required, CustomValidators.date('YYYY-MM-DD'), CustomValidators.maxDate(moment())]], // TODO: Split into [DD] [MM] [YYYY]
        relationshipToEvacuee: [null, Validators.required],
      });
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      restrictedAccess: null,
      essFileNumber: null,
      dietaryNeeds: [null, Validators.required],
      dietaryNeedsDetails: [null],
      disasterAffectDetails: [null],
      externalReferralsDetails: '',
      facility: [null, Validators.required],
      familyRecoveryPlan: [null],
      followUpDetails: [null],
      insuranceCode: [null, Validators.required],  // one of ['yes', 'yes-unsure', 'no', 'unsure']
      medicationNeeds: [null, Validators.required],
      selfRegisteredDate: null,
      registrationCompletionDate: null,
      registeringFamilyMembers: [null, Validators.required],
      hasThreeDayMedicationSupply: [null, CustomValidators.requiredWhenTrue('medicationNeeds')],
      hasInquiryReferral: null,
      hasHealthServicesReferral: null,
      hasFirstAidReferral: null,
      hasChildCareReferral: null,
      hasPersonalServicesReferral: null,
      hasPetCareReferral: null,
      hasPets: [null, Validators.required],
      requiresAccommodation: null,
      requiresClothing: null,
      requiresFood: null,
      requiresIncidentals: null,
      requiresTransportation: null,
      requiresSupport: [null, Validators.required],

      // HOH fields that we decided to put at the parent form level to simplify things
      phoneNumber: '', // only BC phones will be validates so keep validators out of here...
      phoneNumberAlt: '',
      email: ['', Validators.email],

      primaryResidence: this.formBuilder.group({
        addressSubtype: null, // address fields are validated by sub-components (bc-address, other-address)
        addressLine1: '',
        postalCode: '',
        community: '',
        city: '',
        province: '',
        country: '',
      }),

      mailingAddress: this.formBuilder.group({
        addressSubtype: null, // address fields are validated by sub-components (bc-address, other-address)
        addressLine1: '',
        postalCode: '',
        community: '',
        city: '',
        province: '',
        country: '',
      }),

      headOfHousehold: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        nickname: '',
        initials: '',
        gender: null,
        dob: [null, [Validators.required, CustomValidators.date('YYYY-MM-DD'), CustomValidators.maxDate(moment())]], // TODO: Split into [DD] [MM] [YYYY]
      }),

      familyMembers: this.formBuilder.array([]), // array of formGroups

      incidentTask: [null, Validators.required], // which task is this from
      hostCommunity: [null, Validators.required], // which community is hosting
      completedBy: null, // TODO: the volunteer completing this form (we need AUTH in place to do know who you are)

      // UI booleans
      primaryResidenceInBC: [null, Validators.required],
      // this will be validated when 'mailingAddressSameAsPrimary == false'
      mailingAddressInBC: [null, CustomValidators.requiredWhenFalse('mailingAddressSameAsPrimary')],
      mailingAddressSameAsPrimary: [null, Validators.required],
    });
  }

  onFormChange(): void {
    // validate the whole form as we capture data
    this.form.valueChanges.subscribe(() => this.validateForm());

    // validate phone numbers, for BC residents ONLY!
    // NOTE - international numbers are not validated due to variance in formats, etc.
    this.f.primaryResidenceInBC.valueChanges
      .subscribe((checked: boolean) => {
        if (checked) {
          this.f.phoneNumber.setValidators([CustomValidators.phone]);
          this.f.phoneNumberAlt.setValidators([CustomValidators.phone]);
        } else {
          this.f.phoneNumber.setValidators(null);
          this.f.phoneNumberAlt.setValidators(null);
        }
        this.f.phoneNumber.updateValueAndValidity();
        this.f.phoneNumberAlt.updateValueAndValidity();
      });

    // show/hide family members section based on the "family info" radio button
    this.f.registeringFamilyMembers.valueChanges
      .subscribe((value: string) => {
        if (value === 'yes' && this.familyMembers.length === 0) {
          this.addFamilyMember();
        }
        if (value === 'no') {
          this.clearFamilyMembers();
        }
      });

    // set "family info" radio to "No family" when all members have been removed from the form
    this.familyMembers.valueChanges
      .subscribe((family: any[]) => {
        const radio = this.f.registeringFamilyMembers;
        if (radio.value === 'yes' && family.length === 0) {
          radio.setValue('no');
        }
      });
  }

  validateForm(): void {
    this.validationErrors = this.validationHelper.processMessages(this.form);
  }

  displayRegistration(r?: Registration | null): void {
    // Display the appropriate page title and form state
    if (r == null) {
      this.pageTitle = 'Add an Evacuee';
      this.createMode = true;
      this.finalizeMode = false; // turn off these
    } else {
      if (r.incidentTask == null) {
        this.pageTitle = `Finalize Evacuee Registration ${r.essFileNumber}`;
        this.finalizeMode = true;
        this.createMode = false; // turn off these
      } else {
        this.pageTitle = 'Edit Evacuee Registration';
        this.createMode = this.finalizeMode = false; // turn off these
      }
    }

    if (r && this.form) {
      // Reset the form back to pristine
      this.form.reset();

      const familyMembers: FamilyMember[] = r.headOfHousehold.familyMembers;
      const primaryResidence: Address = r.headOfHousehold.primaryResidence;
      const mailingAddress: Address = r.headOfHousehold.mailingAddress;
      const incidentTask: IncidentTask = r.incidentTask;
      const hostCommunity: Community = r.hostCommunity;

      // If the evacuee is here now then the defer to later of the registration of family members is now currently yes.
      if (r.registeringFamilyMembers === 'yes-later') {
        r.registeringFamilyMembers = 'yes';
      }

      // iterate over the array and collect each family member as a formgroup and put them into a form array
      // we need to do this before we update the main form so it populates the FormArray properly
      if (familyMembers != null) {
        familyMembers.forEach((m: FamilyMember) => {
          this.addFamilyMember(m);
        });
      }

      // some form fields for showing or hiding UI elements
      const primaryResidenceInBC: boolean = isBcAddress(primaryResidence);
      const mailingAddressInBC: boolean = isBcAddress(mailingAddress);
      const mailingAddressSameAsPrimary: boolean = (mailingAddress == null);

      // Update the data on the form from the data included from the API
      this.form.patchValue({
        id: r.id as string,
        restrictedAccess: r.restrictedAccess as boolean,
        essFileNumber: r.essFileNumber as number,
        dietaryNeeds: r.dietaryNeeds as boolean,
        dietaryNeedsDetails: r.dietaryNeedsDetails as string,
        disasterAffectDetails: r.disasterAffectDetails as string,
        externalReferralsDetails: r.externalReferralsDetails as string,
        facility: r.facility as string,
        familyRecoveryPlan: r.familyRecoveryPlan as string,
        followUpDetails: r.followUpDetails as string,
        insuranceCode: r.insuranceCode as string,
        medicationNeeds: r.medicationNeeds as boolean,
        selfRegisteredDate: r.selfRegisteredDate as string,
        registrationCompletionDate: r.registrationCompletionDate as string,
        registeringFamilyMembers: r.registeringFamilyMembers as string,

        hasThreeDayMedicationSupply: r.hasThreeDayMedicationSupply as boolean,

        hasInquiryReferral: r.hasInquiryReferral as boolean,
        hasHealthServicesReferral: r.hasHealthServicesReferral as boolean,
        hasFirstAidReferral: r.hasFirstAidReferral as boolean,
        hasChildCareReferral: r.hasChildCareReferral as boolean,
        hasPersonalServicesReferral: r.hasPersonalServicesReferral as boolean,
        hasPetCareReferral: r.hasPetCareReferral as boolean,

        hasPets: r.hasPets as boolean,

        requiresAccommodation: r.requiresAccommodation as boolean,
        requiresClothing: r.requiresClothing as boolean,
        requiresFood: r.requiresFood as boolean,
        requiresIncidentals: r.requiresIncidentals as boolean,
        requiresTransportation: r.requiresTransportation as boolean,
        requiresSupport: r.requiresSupport as boolean,

        headOfHousehold: {
          // id: r.headOfHousehold.id as string,
          // active: r.headOfHousehold.active as boolean,
          firstName: r.headOfHousehold.firstName as string,
          lastName: r.headOfHousehold.lastName as string,
          nickname: r.headOfHousehold.nickname as string,
          initials: r.headOfHousehold.initials as string,
          gender: r.headOfHousehold.gender as string,
          dob: r.headOfHousehold.dob as string,
          // bcServicesNumber: r.headOfHousehold.bcServicesNumber as string,
          // personType: r.headOfHousehold.personType,
        },

        // these belong to the HOH but we placed them here to simplify the HTML markup...
        phoneNumber: r.headOfHousehold.phoneNumber as string,
        phoneNumberAlt: r.headOfHousehold.phoneNumberAlt as string,
        email: r.headOfHousehold.email as string,

        // primaryResidence: r.headOfHousehold.primaryResidence as Address,
        // mailingAddress: r.headOfHousehold.mailingAddress as Address,
        completedBy: r.completedBy as Volunteer,
        hostCommunity: hostCommunity as Community,
        incidentTask: incidentTask as IncidentTask,

        // UI booleans
        primaryResidenceInBC: primaryResidenceInBC as boolean,
        mailingAddressInBC: mailingAddressInBC as boolean,
        mailingAddressSameAsPrimary: mailingAddressSameAsPrimary as boolean,
      });

      // add the primary residence back into the form
      if (primaryResidence != null) {
        this.form.patchValue({
          primaryResidence: {
            addressSubtype: primaryResidence.addressSubtype as string,
            addressLine1: primaryResidence.addressLine1 as string,
            postalCode: primaryResidence.postalCode as string,
            community: primaryResidence.community as Community,
            city: primaryResidence.city as string,
            province: primaryResidence.province as string,
            country: primaryResidence.country as Country,
          },
        });
      }
      // add the mailing address back into the form
      if (mailingAddress != null) {
        this.form.patchValue({
          mailingAddress: {
            addressSubtype: mailingAddress.addressSubtype as string,
            addressLine1: mailingAddress.addressLine1 as string,
            postalCode: mailingAddress.postalCode as string,
            community: mailingAddress.community as Community,
            city: mailingAddress.city as string,
            province: mailingAddress.province as string,
            country: mailingAddress.country as Country,
          },
        });
      }
    }
  }

  next() {
    this.submitting = true; // this disables buttons while we process the form
    this.submitted = true; // TODO: Unsure what this is.
    this.validateForm();
    // stop here if form is invalid
    if (this.form.invalid) {
      this.errorSummary = 'Some required fields have not been completed.';
      this.submitting = false; // reenable so they can try again
    } else {
      // success!
      this.errorSummary = null;
      // save the registration by copying the properties into it.
      this.registration = this.collectRegistrationFromForm();

      // navigate to the next page. AKA show the summary part of the form.
      this.summaryMode = true;
      this.submitting = false; // reenable when we parse data
    }
  }
  submit() {
    // alert(this.registration.headOfHousehold.primaryResidence.country.name);
    // Send data to the server
    this.submitted = true;
    // in transmission
    this.submitting = true;
    // this function performs the "send json to server" action
    // push changes to backend
    // TODO: should this be editmode?
    if (this.registration.id == null) {
      // submit the global registration to the server
      this.registrationService
        .createRegistration(this.registration)
        .subscribe(() => {
          this.submitting = false;

          // TODO: there is an exception that if the route is ...com/embcess/register-evacuee it should only go up one instead of 2
          // TODO: It should be fixed but will need a wider refactor for consistency

          // if the parameters are on the end of the URL we need to route towards root once more
          this.editMode ? this.router.navigate(['../../../evacuees'], { relativeTo: this.route }) : this.router.navigate(['../../evacuees'], { relativeTo: this.route });
        });
    } else {
      // submit the global registration to the server
      this.registrationService
        .updateRegistration(this.registration)
        .subscribe(() => {
          this.submitting = false;
          this.editMode ? this.router.navigate(['../../../evacuees'], { relativeTo: this.route }) : this.router.navigate(['../../evacuees'], { relativeTo: this.route });
        });
    }
  }
  back() {
    // return to the edit mode so you can change the form data
    this.summaryMode = false;
  }

  collectRegistrationFromForm(): Registration {
    //
    const values = this.form.value;
    // ensure proper sub-types are assigned to people entities
    const personType: 'FMBR' = 'FMBR';
    const familyMembers: FamilyMember[] = (values.familyMembers as FamilyMember[]).map(fmr => ({ ...fmr, personType }));

    // Use form values to create evacuee registration
    const r: Registration = {
      id: null,
      active: null,
      declarationAndConsent: null,
      essFileNumber: null,

      headOfHousehold: {
        id: null,
        firstName: values.headOfHousehold.firstName || null,
        lastName: values.headOfHousehold.lastName || null,
        initials: values.headOfHousehold.initials || null,
        nickname: values.headOfHousehold.nickname || null,
        gender: values.headOfHousehold.gender || null,
        dob: values.headOfHousehold.dob || null,
        personType: 'HOH' || null,
        phoneNumber: values.phoneNumber || null,
        phoneNumberAlt: values.phoneNumberAlt || null,
        email: values.email || null,
        familyMembers, // copy in the already parsed values for familymembers
        primaryResidence: { ...values.primaryResidence },
        mailingAddress: values.mailingAddressSameAsPrimary ? null : { ...values.mailingAddress },
      },

      // Registration Record
      restrictedAccess: values.restrictedAccess,
      dietaryNeeds: values.dietaryNeeds as boolean,
      dietaryNeedsDetails: values.dietaryNeedsDetails as string,
      disasterAffectDetails: values.disasterAffectDetails as string,
      externalReferralsDetails: values.externalReferralsDetails as string,
      facility: values.facility as string,
      familyRecoveryPlan: values.familyRecoveryPlan as string,
      followUpDetails: values.followUpDetails as string,
      insuranceCode: values.insuranceCode as string,
      medicationNeeds: values.medicationNeeds as boolean,
      registeringFamilyMembers: values.registeringFamilyMembers as string, // 'yes' or 'no'

      // Family state flags
      hasThreeDayMedicationSupply: values.hasThreeDayMedicationSupply as boolean,
      hasInquiryReferral: values.hasInquiryReferral as boolean,
      hasHealthServicesReferral: values.hasHealthServicesReferral as boolean,
      hasFirstAidReferral: values.hasFirstAidReferral as boolean,
      hasChildCareReferral: values.hasChildCareReferral as boolean,
      hasPersonalServicesReferral: values.hasPersonalServicesReferral as boolean,
      hasPetCareReferral: values.hasPetCareReferral as boolean,
      hasPets: values.hasPets as boolean,

      // requirements
      requiresAccommodation: values.requiresAccommodation as boolean,
      requiresClothing: values.requiresClothing as boolean,
      requiresFood: values.requiresFood as boolean,
      requiresIncidentals: values.requiresIncidentals as boolean,
      requiresTransportation: values.requiresTransportation as boolean,
      requiresSupport: values.requiresSupport as boolean,

      // dates we care about
      selfRegisteredDate: values.selfRegisteredDate as string,
      registrationCompletionDate: new Date().toJSON() as string, // this stamps whenever the registration was completed

      // related entities
      incidentTask: values.incidentTask,
      hostCommunity: values.hostCommunity,
      completedBy: values.completedBy,
    };
    const registration = this.registration;
    if (this.editMode) {
      // if we are editing the form we assign the values collected when the form initialized and collected the registration from the api.
      r.id = registration.id;
      r.active = registration.active || null;
      r.declarationAndConsent = registration.declarationAndConsent || null;
      r.essFileNumber = registration.essFileNumber || null;
      r.headOfHousehold.id = registration.headOfHousehold.id || null;
      r.registrationCompletionDate = registration.registrationCompletionDate || null; // todo need to check if this date is being handled correctly
      r.headOfHousehold.primaryResidence.id = registration.headOfHousehold.primaryResidence.id || null;
      r.completedBy = registration.completedBy || null;
    }
    // timestamp the completion date on
    r.registrationCompletionDate = r.registrationCompletionDate || new Date().toJSON();

    // track who completed the registration for reporting purposes
    const volunteer: Partial<Volunteer> = this.currentUser.contactid ? { id: this.currentUser.contactid } : null;
    // the initial completed by volunteer is preserved unless there is a new volunteer
    r.completedBy = r.completedBy || volunteer;

    // The user now consents.
    r.declarationAndConsent = true;

    // if there was no primary address country set by the form before submission
    if (!r.headOfHousehold.primaryResidence.country) {
      r.headOfHousehold.primaryResidence.country = this.CANADA;
    }
    // the user included a mailing address but the form did not set the country
    if (r.headOfHousehold.mailingAddress && !r.headOfHousehold.mailingAddress.country) {
      r.headOfHousehold.mailingAddress.country = this.CANADA;
    }

    // return the registration
    return r;
  }
  // --------------------HELPERS-----------------------------------------

  isBcAddress(address: Address): boolean {
    return isBcAddress(address);
  }
  genderOption(key: string) {
    const option = GENDER_OPTIONS.find(item => item.key === key);
    return option ? option.value : null;
  }
  insuranceOption(key: string) {
    const option = INSURANCE_OPTIONS.find(item => item.key === key);
    return option ? option.value : null;
  }
  blankRegistration(): Registration {
    // This is a workaround for not having an instantiable class that initializes the interface
    return {
      id: null,
      active: null,
      restrictedAccess: null,
      declarationAndConsent: null,
      essFileNumber: null,
      dietaryNeeds: null,
      dietaryNeedsDetails: null,
      disasterAffectDetails: null,
      externalReferralsDetails: null,
      facility: null,
      familyRecoveryPlan: null,
      followUpDetails: null,
      insuranceCode: null,
      medicationNeeds: null,
      registrationCompletionDate: null,
      registeringFamilyMembers: null,
      selfRegisteredDate: null,
      hasThreeDayMedicationSupply: null,
      hasInquiryReferral: null,
      hasHealthServicesReferral: null,
      hasFirstAidReferral: null,
      hasChildCareReferral: null,
      hasPersonalServicesReferral: null,
      hasPetCareReferral: null,
      hasPets: null,
      requiresAccommodation: null,
      requiresClothing: null,
      requiresFood: null,
      requiresIncidentals: null,
      requiresTransportation: null,
      requiresSupport: null,
      headOfHousehold: null,
      incidentTask: null,
      hostCommunity: null,
      completedBy: null,
    };
  }
}