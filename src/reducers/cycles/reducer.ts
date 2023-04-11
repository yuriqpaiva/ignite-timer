import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export interface AddNewCycleAction {
  type: ActionTypes
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return produce(state, (draft) => {
        const currentCycle = draft.cycles.findIndex(
          (cycle) => cycle.id === state.activeCycleId,
        )

        if (currentCycle < 0) {
          return state
        }

        draft.activeCycleId = null
        draft.cycles[currentCycle].interruptedDate = new Date()
      })
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return produce(state, (draft) => {
        const currentCycle = draft.cycles.findIndex(
          (cycle) => cycle.id === state.activeCycleId,
        )

        if (currentCycle < 0) {
          return state
        }

        draft.activeCycleId = null
        draft.cycles[currentCycle].finishedDate = new Date()
      })
    default:
      return state
  }
}
