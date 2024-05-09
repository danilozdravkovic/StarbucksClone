import { AfterViewInit, Component } from '@angular/core';
import { FooterLinksService } from '../../services/footer-links.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
  constructor(private footerLinksService : FooterLinksService){}

  sections : object[] = [];
  ngAfterViewInit():void{
    this.footerLinksService.getAll().subscribe({
      next:(data)=>{
        this.sections=data;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
