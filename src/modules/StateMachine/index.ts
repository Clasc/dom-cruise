/* eslint-disable require-jsdoc */
type StateUpdate<TState> = (newState: TState) => void;

export class StateMachine<TState> {
    #state: TState;
    #events: StateUpdate<TState>[] = [];

    constructor(defaultValue: TState) {
        this.#state = defaultValue;
    }

    public get state(): Readonly<TState> { return Object.freeze(this.#state) }

    public onChange(handler: StateUpdate<TState>) {
        this.#events.push(handler);
    }

    public mutate(change: TState | ((current: TState) => TState)) {
        if (typeof change === "function")
            this.#state = (change as (c: TState) => TState)(this.#state);
        else if (typeof change === typeof this.#state) {
            this.#state = change;
        }

        this.#events.forEach(e => e(this.#state));
    }
}