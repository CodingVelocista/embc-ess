import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/core/services/audit.service';

@Component({
  selector: 'app-auditor',
  templateUrl: './auditor.component.html',
  styleUrls: ['./auditor.component.scss']
})
export class AuditorComponent implements OnInit {

  audit: any;
  recordNumber: string;

  constructor(
    private auditService: AuditService
  ) { }

  ngOnInit() {
  }
  search() {
    // record numbers are minumum 6 digits.
    if (parseInt(this.recordNumber) && this.recordNumber.length >= 6) {
      this.auditService.getAccessAudit(this.recordNumber)
        .subscribe(
          a => this.audit = a,
          err => console.log(err),
        );
    }
  }
}
