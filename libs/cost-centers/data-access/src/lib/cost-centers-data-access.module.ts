import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { CostCentersService } from './cost-centers.service';
import * as fromCostCenters from './+state/cost-centers.reducer';
import { CostCentersFacade } from './+state/cost-centers.facade';
import { CostCentersEffects } from './+state/cost-centers.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCostCenters.COST_CENTERS_FEATURE_KEY,
      fromCostCenters.reducer
    ),
    EffectsModule.forFeature([CostCentersEffects])
  ],
  providers: [CostCentersFacade, CostCentersService]
})
export class CostCentersDataAccessModule {}
