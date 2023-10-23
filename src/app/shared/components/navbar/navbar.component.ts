import { ChangeDetectionStrategy, Component } from '@angular/core';

type NavItem = {
  label: string;
  route: string;
  exact?: boolean;
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly navItems: NavItem[] = [
    {
      label: 'Home',
      route: '/',
      exact: true,
    },
    {
      label: 'Login',
      route: '/login',
    },
  ];
}
