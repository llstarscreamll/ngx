import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import {
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer
} from '@ngrx/router-store';

import { debug } from './meta-reducers/debug.reducer';
import { environment } from '../../environments/environment';
import { AnimationsService } from './animations/animations.service';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';

export const metaReducers: MetaReducer<any>[] = [initStateFromLocalStorage];

if (!environment.production) {
  // metaReducers.unshift(storeFreeze);
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer
    })
  ],
  declarations: [],
  providers: [AnimationsService],
  exports: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
