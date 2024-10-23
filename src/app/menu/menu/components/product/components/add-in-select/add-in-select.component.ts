import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-in-select',
  templateUrl: './add-in-select.component.html',
  styleUrls: ['./add-in-select.component.css']
})
export class AddInSelectComponent {

  
  constructor(private fb: FormBuilder) {
  }
  @Input() addIns: any ;
  @Input() parentName: string = '';
  subchildId : number=3;

  addInForm: FormGroup;

  ngOnInit(): void {
    this.addInForm = this.fb.group({});

    this.addIns?.forEach((addIn:any) => {
      if(addIn.children){
        this.addInForm.addControl(String(addIn.id), new FormControl(this.getSelectedSubchildId(addIn.children)));
      }
      else{
        this.addInForm.addControl(String(addIn.id), new FormControl(addIn.pump));
      }
      
    });

    this.addInForm.valueChanges.subscribe(() => {
      console.log(this.addIns);
      const addInData = this.addIns.map((addIn: any) => {
        console.log(addIn)
        if (addIn.children && addIn.children.length > 0) {
          const subchildWithPump = addIn.children.find((child: any) => !this.subchildHasNoPump(child));
          console.log(subchildWithPump);
          if (subchildWithPump) {
            console.log(addIn);
            return {
              id: addIn.children[0].id,
              pump: addIn.children[0].pump
            };
          }
        }
  
        return {
          id: this.addInForm.get(String(addIn.id))?.value,
          pump: addIn.pump
        };
      });
      
      console.log(addInData);
    });
    
  }

  subchildHasNoPump(addIn: any): boolean {
    return addIn.pump == null;
  }

  hasChildrenForSelect(array: any[]): boolean {
    return array.some(subchild => !subchild.children && this.subchildHasNoPump(subchild));
  }

  incrementPump(addIn: any): void {
    if(addIn.pump<12){
      addIn.pump++;
      this.addInForm.get(String(addIn.id))?.setValue(addIn.pump);
    }
  }

  decrementPump(addIn: any): void {
    if (addIn.pump > 0) {
      addIn.pump--;
      this.addInForm.get(String(addIn.id))?.setValue(addIn.pump);
    }
  }

  getSelectedSubchildId(children: any[]): string {
    const selectedSubchild = children.find(subchild => subchild.selected);
    return selectedSubchild ? selectedSubchild.id : null;
  }

  buildAddInControls(): FormGroup[] {
    return this.addIns.map((addIn:any) => this.fb.group({
      id: new FormControl(addIn.id),
      pump: new FormControl(addIn.pump ?? 0) 
    }));
  }

  submitForm() {
    const selectedAddIns = this.addIns.map((addIn:any) => ({
        id: addIn.id,
        pump: addIn.pump,
    }));
    console.log(selectedAddIns);
  }
  }
