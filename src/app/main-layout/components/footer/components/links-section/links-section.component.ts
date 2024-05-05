import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-links-section',
  templateUrl: './links-section.component.html',
  styleUrls: ['./links-section.component.css']
})
export class LinksSectionComponent  {
  @Input() sections: any;
  
}
