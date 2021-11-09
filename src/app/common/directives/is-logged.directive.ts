import { Directive, Input, ElementRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appIsLogged]'
})
export class IsLoggedDirective {

  @Input() appIsLogged: boolean =false;
  isLoggedIn: boolean = false;

  constructor(private authentication: AuthenticationService, private elRef: ElementRef) { }



ngOnInit(){
 this.isLoggedIn = this.authentication.isLoggedIn(); 
 if(this.isLoggedIn == !this.appIsLogged){
   this.elRef.nativeElement.remove();
 }
}
}