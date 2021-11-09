import { Directive, Input, ElementRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appIsLogged]'
})
export class IsLoggedDirective {

  @Input() appIsLogged: undefined;
  isLoggedIn: boolean = false;

  constructor(private authentication: AuthenticationService, private elRef: ElementRef) { }



ngOnInit(){
 this.isLoggedIn = this.authentication.isLoggedIn(); 
 if(this.isLoggedIn == true){
   this.elRef.nativeElement.remove();
 }
}
}