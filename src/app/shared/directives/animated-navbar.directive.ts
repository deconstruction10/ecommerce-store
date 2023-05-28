import {AfterViewInit, Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Subscription, take, timer} from "rxjs";

@Directive({
  selector: '[appAnimatedNavbar]'
})
export class AnimatedNavbarDirective  implements OnInit, AfterViewInit {
private scrollSubscription!: Subscription;
  constructor(private element: ElementRef, private renderer: Renderer2) { }

 ngOnInit() {

 };

 ngAfterViewInit() {
   timer(1000)
     .pipe(
       take(1)
      ).subscribe(()=> {
       this.renderer.setStyle(this.element.nativeElement, 'position', 'sticky');
   })
 };
}
