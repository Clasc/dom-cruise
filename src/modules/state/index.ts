/* eslint-disable require-jsdoc */
type StateUpdate<TState> = (newState: TState) => void;

export default function state<TState>(defaultVal: TState, events: StateUpdate<TState>[] = []): [{ ref: TState }, StateUpdate<TState>] {
    const current = { ref: defaultVal };
    const updateState: StateUpdate<TState> = (ns) => {
        current.ref = ns;
        events?.forEach(e => e(ns));
    };

    return [current, updateState];
}