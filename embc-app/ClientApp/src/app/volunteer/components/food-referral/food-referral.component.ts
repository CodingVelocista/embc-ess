import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import range from 'lodash/range';

import { FoodReferral, Supplier } from 'src/app/core/models';
import { ReferralDate } from 'src/app/core/models/referral-date';
import { FoodRatesComponent } from 'src/app/shared/modals/food-rates/food-rates.component';
import { SupplierComponent } from '../supplier/supplier.component';
import { AbstractReferralComponent } from '../abstract-referral/abstract-referral.component';

const BREAKFAST = 10.00;
const LUNCH = 13.00;
const DINNER = 22.00;
const GROCERIES = 22.50;

@Component({
  selector: 'app-food-referral',
  templateUrl: './food-referral.component.html',
  styleUrls: ['./food-referral.component.scss']
})
export class FoodReferralComponent extends AbstractReferralComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() referralChange = new EventEmitter<FoodReferral>();

  // TODO: replace this with formReady event on supplier form
  @ViewChild(SupplierComponent) supplierRef: SupplierComponent;

  private ratesModal: NgbModalRef = null;

  days: Array<number> = null;

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  get subType() { return this.f.subType.value; }

  get totalAmount() {
    if (this.subType === 'RESTAURANT') {
      const b = this.f.numBreakfasts.value * BREAKFAST;
      const l = this.f.numLunches.value * LUNCH;
      const d = this.f.numDinners.value * DINNER;
      const n = this.selected.length;
      return (b + l + d) * n;
    }
    if (this.subType === 'GROCERIES') {
      const d = this.f.numDaysMeals.value;
      const n = this.selected.length;
      return d * GROCERIES * n;
    }
  }

  // helper to format dollar amounts
  currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  constructor(
    public fb: FormBuilder,
    private modals: NgbModal,
  ) {
    super(fb);
    this.form.addControl('subType', this.fb.control(''));
    this.form.addControl('numBreakfasts', this.fb.control(''));
    this.form.addControl('numLunches', this.fb.control(''));
    this.form.addControl('numDinners', this.fb.control(''));
    this.form.addControl('numDaysMeals', this.fb.control(''));
    this.form.addControl('totalAmount', this.fb.control(''));
  }

  ngOnInit() {
    this.handleFormChange();
    this.displayReferral(this.referral as FoodReferral);
  }

  ngAfterViewInit() {
    // connect child form to parent
    if (this.supplierRef && !this.form.get('supplier')) {
      this.form.addControl('supplier', this.supplierRef.form);
      this.supplierRef.form.setParent(this.form);
    }
  }

  ngOnDestroy() {
    // close modal if it's open
    if (this.ratesModal) { this.ratesModal.dismiss(); }
  }

  // validate the whole form as we capture data
  private handleFormChange(): void {
    this.form.valueChanges.subscribe(() => this.saveChanges());
  }

  private displayReferral(referral: FoodReferral) {
    if (referral) {
      this.form.reset();
      this.form.patchValue({
        subType: referral.subType || null,
        numBreakfasts: referral.numBreakfasts || 0,
        numLunches: referral.numLunches || 0,
        numDinners: referral.numDinners || 0,
        numDaysMeals: referral.numDaysMeals || 0,
        comments: referral.comments,
        totalAmount: referral.totalAmount || 0
      });

      // populate the evacuee list with existing selection
      (referral.evacuees || []).forEach(x => this.selectEvacuee(x));
    }
  }

  // if all required information is in the form we emit
  private saveChanges() {
    if (!this.form.valid) {
      return;
    }
    // Copy over all of the original referral properties
    // Then copy over the values from the form
    // This ensures values not on the form, such as the Id, are retained
    console.log('referral =', this.referral);
    console.log('form =', this.form.value);
    const p = { ...this.referral, ...this.form.value, totalAmount: this.totalAmount };
    this.referralChange.emit(p);
  }

  // NB: this is called when date component is initialized and whenever its data changes
  updateReferralDate(rd: ReferralDate) {
    this.referral.dates = rd;

    // update array for number dropdowns
    this.days = range(1, this.referral.dates.days + 1); // [1..n]

    // update any dropdowns that exceed max
    if (this.f.numBreakfasts.value > this.days) { this.f.numBreakfasts.setValue(+this.days); }
    if (this.f.numLunches.value > this.days) { this.f.numLunches.setValue(+this.days); }
    if (this.f.numDinners.value > this.days) { this.f.numDinners.setValue(+this.days); }
    if (this.f.numDaysMeals.value > this.days) { this.f.numDaysMeals.setValue(+this.days); }
  }

  updateSupplier(value: Supplier) {
    this.referral.supplier = value;
  }

  viewRates() {
    this.ratesModal = this.modals.open(FoodRatesComponent, { size: 'lg', centered: true });
    this.ratesModal.result.then(
      () => { this.ratesModal = null; },
      () => { this.ratesModal = null; }
    );
  }

}
