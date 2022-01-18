import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'app.component.html'
})
export class AppComponent {
  public dataRoutes = [{
    label: 'Home',
    icon: 'home',
    route: '/'
  }, {
    label: 'Funcionários',
    icon: 'person',
    route: '/employees/list-employees'
  }];
}
