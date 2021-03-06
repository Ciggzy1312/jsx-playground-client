import { Dispatch } from 'redux';
import bundler from '../../bundler';
import { ActionType } from '../action-types';
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellBeforeAction,
  Action,
  Direction,
} from '../actions';
import { CellType } from '../cell';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellBefore = (
  id: string | null,
  cellType: CellType
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      cellType
    },
  };
};


export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>)=>{
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId
      }
    })

    const result = await bundler(input)

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload:{
        cellId,
        bundle: result
      }
    })
  };
};
