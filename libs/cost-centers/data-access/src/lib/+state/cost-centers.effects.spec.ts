import { Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from '@nrwl/angular/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';

import { emptyPagination } from '@kirby/shared';
import { CostCentersEffects } from './cost-centers.effects';
import { CostCentersService } from '../cost-centers.service';
import { SearchCostCenters, SearchCostCentersOk } from './cost-centers.actions';

describe('CostCentersEffects', () => {
  let actions: Observable<any>;
  let effects: CostCentersEffects;
  let costCenterService: CostCentersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        DataPersistence,
        CostCentersEffects,
        { provide: CostCentersService, useValue: { search: q => q } },
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(CostCentersEffects);
    costCenterService = TestBed.get(CostCentersService);
  });

  describe('searchCostCenters$', () => {
    it('should work', () => {
      const query = { search: 'foo' };
      const serviceResponse = emptyPagination();
      spyOn(costCenterService, 'search').and.returnValue(
        cold('a|', {
          a: serviceResponse
        })
      );

      actions = hot('-a-|', { a: new SearchCostCenters(query) });

      expect(effects.searchCostCenters$).toBeObservable(
        hot('-a-|', { a: new SearchCostCentersOk(serviceResponse) })
      );
      expect(costCenterService.search).toHaveBeenCalledWith(query);
    });
  });
});
