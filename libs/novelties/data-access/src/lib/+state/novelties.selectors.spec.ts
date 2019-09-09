import {
  NoveltiesState,
  NoveltiesPartialState,
  NOVELTIES_FEATURE_KEY
} from './novelties.reducer';
import { noveltiesQuery } from './novelties.selectors';
import { createNovelty } from '@llstarscreamll/novelties/utils';
import { emptyPagination } from '@llstarscreamll/shared';

describe('Novelties Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const novelty = createNovelty('PRODUCT-AAA');

  let storeState: NoveltiesPartialState;

  beforeEach(() => {
    storeState = {
      [NOVELTIES_FEATURE_KEY]: {
        paginatedList: {
          data: [
            novelty,
            createNovelty('PRODUCT-BBB'),
            createNovelty('PRODUCT-CCC')
          ],
          meta: {}
        },
        paginatedNoveltyTypesList: emptyPagination(),
        createNoveltiesToEmployeesStatus: null,
        selected: novelty,
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Novelties Selectors', () => {
    it('getAllNovelties() should return the list of Novelties', () => {
      const results = noveltiesQuery.getPaginatedList(storeState);

      expect(results.data.length).toBe(3);
    });

    it('getSelectedNovelty() should return the selected Entity', () => {
      const result = noveltiesQuery.getSelectedNovelty(storeState);

      expect(result).toEqual(novelty);
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = noveltiesQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = noveltiesQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
