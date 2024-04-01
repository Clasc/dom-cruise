import { StateMachine } from ".";

describe("StateMachine", () => {
    it("should mutate the change to be the last one mutated to", () => {
        const sut = new StateMachine(0);
        sut.mutate(1);
        expect(sut.state).toBe(1);
    });

    it("should call the onchange handler with new value", () => {
        const sut = new StateMachine(0);
        const handler = jest.fn();
        sut.onChange(handler)
        sut.mutate(1);
        expect(sut.state).toBe(1);
        expect(handler).toBeCalledWith(1);
    });

    it("should call all specified onchange handlers with new value", () => {
        const sut = new StateMachine(0);
        const handler = jest.fn();
        const secondHandler = jest.fn();
        sut.onChange(handler)
        sut.onChange(secondHandler)
        sut.mutate(1);
        expect(sut.state).toBe(1);
        expect(handler).toBeCalledWith(1);
        expect(secondHandler).toBeCalledWith(1);
    });

    it("should apply function provided for mutate", () => {
        const sut = new StateMachine(1);
        sut.mutate(x => x + 5);
        expect(sut.state).toBe(6);
    });

    it("should call handlers with new value when function is provided for mutate", () => {
        const sut = new StateMachine(1);
        const handler = jest.fn();
        const secondHandler = jest.fn();
        sut.onChange(handler)
        sut.onChange(secondHandler)
        sut.mutate(x => x + 5);
        expect(sut.state).toBe(6);
        expect(handler).toBeCalledWith(6);
        expect(secondHandler).toBeCalledWith(6);
    });

    it("should apply functions in objects mutations", () => {
        const sut = new StateMachine({ test: "a" });
        const handler = jest.fn();
        sut.onChange(handler)
        sut.mutate(x => ({ test: x.test + "b" }));
        expect(handler).toBeCalledWith({ test: 'ab' });
        expect(sut.state).toStrictEqual({ test: "ab" });
    });

    it("should not change the state in object when not using mutate and throw error", () => {
        const sut = new StateMachine({ test: "a" });
        expect(() => (sut.state as { test: string }).test = "b").toThrowError()
        expect(sut.state).toStrictEqual({ test: "a" });
    });

    it("should overwrite whole state object", () => {
        const sut = new StateMachine({ test: "a" });
        sut.mutate({ something: "else" } as any);
        expect(sut.state).toStrictEqual({ something: "else" });
    });
});