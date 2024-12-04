// add-in-select.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-in-select',
  templateUrl: './add-in-select.component.html',
  styleUrls: ['./add-in-select.component.css']
})
export class AddInSelectComponent implements OnInit {
  @Input() addIns: any[];
  @Input() parentName: string = '';
  @Input() form: FormGroup;

  ngOnInit(): void {}

  subchildHasNoPump(addIn: any): boolean {
    return addIn.pump == null;
  }

  hasChildrenForSelect(array: any[]): boolean {
    return array.some(subchild => !subchild.children && this.subchildHasNoPump(subchild));
  }

  incrementPump(addIn: any): void {
    if (addIn.pump < 12) {
      addIn.pump++;
      this.form.get(String(addIn.id)+'_pump')?.setValue(addIn.pump);
    }
  
  }

  decrementPump(addIn: any): void {
    if (addIn.pump > 0) {
      addIn.pump--;
      this.form.get(String(addIn.id)+'_pump')?.setValue(addIn.pump);
    }
  }
}
