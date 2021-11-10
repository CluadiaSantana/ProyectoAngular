import { Directive, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appIsLogged]'
})
export class IsLoggedDirective {

  @Input() appIsLogged: boolean =false;
  isLoggedIn: boolean = false;

  constructor(private authentication: AuthenticationService, private elRef: ElementRef, private router: Router) { }



ngOnInit(){
 this.isLoggedIn = this.authentication.isLoggedIn(); 
 if(this.isLoggedIn == !this.appIsLogged){
   this.elRef.nativeElement.remove();
   this.router.navigate(['/header']);
 }
}
}