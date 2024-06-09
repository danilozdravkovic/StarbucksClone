import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-in-select',
  templateUrl: './add-in-select.component.html',
  styleUrls: ['./add-in-select.component.css']
})
export class AddInSelectComponent {
  @Input() addIns: any ;
  @Input() parentName: string = '';

  hasSubchildPump(addIn: any): boolean {
    return addIn.pump == null;
  }

  hasChildrenForSelect(array: any[]): boolean {
    return array.some(subchild => !subchild.children && this.hasSubchildPump(subchild));
  }

  incrementPump(addIn: any): void {
    if(addIn.pump<12){
      addIn.pump++;
    }
  }

  decrementPump(addIn: any): void {
    if (addIn.pump > 0) {
      addIn.pump--;
    }
  }
  }
