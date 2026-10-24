import { GameState } from '../types/game';
import { EVENT_DECK } from '../data/eventDeck';

export function resolveTriggeredEvent(
  state: GameState,
  eventId: string,
  choiceId: string
): GameState {
  const event = EVENT_DECK[eventId];
  const choice = event?.choices.find((c) => c.id === choiceId);
  if (!event || !choice) return state;

  const nextState: GameState = structuredClone(state);
  const { effect } = choice;

  // 1. Deduct or add cash
  if (choice.requiredCash) nextState.cash = Math.max(0, nextState.cash - choice.requiredCash);
  if (effect.cashDelta) nextState.cash = Math.max(0, nextState.cash + effect.cashDelta);

  // 2. Apply Composure shift
  if (effect.composureDelta) {
    nextState.composure = Math.min(100, Math.max(0, nextState.composure + effect.composureDelta));
  }

  // 3. Apply Faction Rep shifts
  if (effect.factionRepDelta) {
    for (const fr of effect.factionRepDelta) {
      nextState.factionRep[fr.factionId] += fr.delta;
    }
  }

  // 4. Update or clear Clocks
  if (effect.clockProgress) {
    for (const cp of effect.clockProgress) {
      const targetClock = nextState.clocks[cp.clockId];
      if (targetClock) {
        targetClock.current = Math.min(
          targetClock.max,
          Math.max(0, targetClock.current + cp.delta)
        );
        if (
          targetClock.current >= targetClock.max &&
          !nextState.triggeredEventsQueue.includes(targetClock.onCompleteEventId)
        ) {
          nextState.triggeredEventsQueue.push(targetClock.onCompleteEventId);
        }
      }
    }
  }
  if (effect.resetClockId && nextState.clocks[effect.resetClockId]) {
    nextState.clocks[effect.resetClockId].current = 0;
  }
  if (effect.removeClockId) {
    delete nextState.clocks[effect.removeClockId];
  }

  // 5. Inventory & Node unlocks
  if (effect.addInventoryItem && !nextState.inventory.includes(effect.addInventoryItem)) {
    nextState.inventory.push(effect.addInventoryItem);
  }
  if (effect.removeInventoryItem) {
    nextState.inventory = nextState.inventory.filter((i) => i !== effect.removeInventoryItem);
  }
  if (effect.unlockNodeIds) {
    for (const nodeId of effect.unlockNodeIds) {
      if (nextState.nodes[nodeId]) nextState.nodes[nodeId].isUnlocked = true;
    }
  }

  // 6. Trigger Act 1 Ending Epilogue if specified
  if (effect.triggerEndingId) {
    nextState.activeEndingId = effect.triggerEndingId;
  }

  // 7. Pop event from queue and log result
  nextState.triggeredEventsQueue = nextState.triggeredEventsQueue.filter((id) => id !== eventId);
  nextState.activeLog.unshift(`[EVENT: ${event.title}] ${effect.narrativeLog}`);

  // 8. Check for 0% Composure Breakdown (unless we just resolved the breakdown event itself)
  if (
    eventId !== 'evt_composure_breakdown' &&
    nextState.composure <= 0 &&
    !nextState.triggeredEventsQueue.includes('evt_composure_breakdown')
  ) {
    nextState.triggeredEventsQueue.push('evt_composure_breakdown');
    nextState.activeLog.unshift(
      '[CRISIS] Composure dropped to 0% — Blackout Paranoia triggered!'
    );
  }

  return nextState;
}
