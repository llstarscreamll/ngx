import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthFacade } from '@agile-work/auth-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'auth-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit, OnDestroy {

  public errors$: Observable<any>;
  public status$: Observable<string>;

  public constructor(private authFacade: AuthFacade) { }

  public ngOnInit() {
    this.errors$ = this.authFacade.errors$;
    this.status$ = this.authFacade.status$;
  }

  public ngOnDestroy(): void {
    this.authFacade.cleanErrors();
  }

  public login(credentials) {
    this.authFacade.loginWithCredentials(credentials);
  }

}
