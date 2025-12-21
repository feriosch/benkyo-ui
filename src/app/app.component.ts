import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { routeAnimations } from './shared/animations/route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent {
  title = 'benkyo-ui';

  getRouteAnimationData(outlet: RouterOutlet): string {
    if (!outlet?.isActivated) {
      return '';
    }
    return (
      outlet.activatedRouteData?.['animation'] ??
      outlet.activatedRoute?.snapshot?.url.toString() ??
      ''
    );
  }
}
