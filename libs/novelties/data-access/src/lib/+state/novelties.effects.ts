import { map, tap } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';

import { NoveltiesPartialState } from './novelties.reducer';
import {
  SearchNovelties,
  SearchNoveltiesOk,
  SearchNoveltiesError,
  NoveltiesActionTypes,
  GetNoveltyOk,
  GetNovelty,
  GetNoveltyError,
  SearchNoveltyTypesOk,
  SearchNoveltyTypesError,
  UpdateNovelty,
  UpdateNoveltyOk,
  UpdateNoveltyError,
  CreateNoveltiesToEmployees,
  CreateNoveltiesToEmployeesOk,
  CreateNoveltiesToEmployeesError,
  ApproveNovelty,
  ApproveNoveltyOk,
  ApproveNoveltyError,
  DeleteNoveltyApprovalOk,
  DeleteNoveltyApprovalError
} from './novelties.actions';
import { NoveltyService } from '../novelty.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NoveltiesEffects {
  @Effect() searchNovelties$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.SearchNovelties,
    {
      run: (action: SearchNovelties, state: NoveltiesPartialState) =>
        this.noveltyService
          .search(action.payload)
          .pipe(map(apiResponse => new SearchNoveltiesOk(apiResponse))),
      onError: (action: SearchNovelties, error) =>
        new SearchNoveltiesError(error)
    }
  );

  @Effect() searchNoveltyTypes$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.SearchNoveltyTypes,
    {
      run: (action: SearchNovelties) =>
        this.noveltyService
          .searchNoveltyTypes(action.payload)
          .pipe(map(apiResponse => new SearchNoveltyTypesOk(apiResponse))),
      onError: (action: SearchNovelties, error) =>
        new SearchNoveltyTypesError(error)
    }
  );

  @Effect()
  createNoveltiesToEmployees$ = this.dataPersistence.pessimisticUpdate(
    NoveltiesActionTypes.CreateNoveltiesToEmployees,
    {
      run: (action: CreateNoveltiesToEmployees) =>
        this.noveltyService
          .createNoveltiesToEmployees(action.payload)
          .pipe(
            map(apiResponse => new CreateNoveltiesToEmployeesOk(apiResponse))
          ),
      onError: (action: CreateNoveltiesToEmployees, error) =>
        new CreateNoveltiesToEmployeesError(error)
    }
  );

  @Effect() getNovelty$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.GetNovelty,
    {
      run: (action: GetNovelty) =>
        this.noveltyService
          .get(action.payload)
          .pipe(map(apiResponse => new GetNoveltyOk(apiResponse))),
      onError: (action: GetNovelty, error) => new GetNoveltyError(error)
    }
  );

  @Effect() updateNovelty$ = this.dataPersistence.optimisticUpdate(
    NoveltiesActionTypes.UpdateNovelty,
    {
      run: (action: UpdateNovelty) =>
        this.noveltyService
          .update(action.payload.id, action.payload.noveltyData)
          .pipe(
            map(
              response =>
                new UpdateNoveltyOk({
                  id: action.payload.id,
                  noveltyData: response
                })
            )
          ),
      undoAction: (action: UpdateNovelty, error: any) =>
        new UpdateNoveltyError({ ...action.payload, error })
    }
  );

  @Effect()
  public approveNovelty$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.ApproveNovelty,
    {
      run: (action: ApproveNovelty, state: NoveltiesPartialState) => {
        return this.noveltyService
          .approve(action.payload.noveltyId)
          .pipe(map(response => new ApproveNoveltyOk(action.payload)));
      },
      onError: (action: ApproveNovelty, error) => {
        return new ApproveNoveltyError({
          ...action.payload,
          error: error
        });
      }
    }
  );

  @Effect()
  public deleteNoveltyApproval$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.DeleteNoveltyApproval,
    {
      run: (action: ApproveNovelty, state: NoveltiesPartialState) => {
        return this.noveltyService
          .deleteApproval(action.payload.noveltyId)
          .pipe(map(response => new DeleteNoveltyApprovalOk(action.payload)));
      },
      onError: (action: ApproveNovelty, error) => {
        return new DeleteNoveltyApprovalError({
          ...action.payload,
          error: error
        });
      }
    }
  );

  @Effect({ dispatch: false }) updateNoveltyOk$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.UpdateNoveltyOk),
    tap(action => this.snackBar.open('Novedad actualizada correctamente', 'Ok'))
  );

  @Effect({ dispatch: false }) updateNoveltyError$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.UpdateNoveltyError),
    tap(action => this.snackBar.open('Error actualizando la novedad', 'Ok'))
  );

  public constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private noveltyService: NoveltyService,
    private dataPersistence: DataPersistence<NoveltiesPartialState>
  ) {}
}
