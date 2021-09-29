const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    hrtn             = require("../src/core.hrtn.js"),
    REPETITIONS      = 10;

describe("core.hrtn", () => {

    test("should return a number close to Date.now", function () {
        for (let i = 0; i < REPETITIONS; i++) {
            const
                t0 = 1e-3 * Date.now(),
                t1 = hrtn();

            expect(typeof t1).toBe('number');
            expect(t1).toBeCloseTo(t0, 2);
        }
    });

    test("should return different numbers with succeeding calls", function () {
        for (let i = 0; i < REPETITIONS; i++) {
            const
                t0 = hrtn(),
                t1 = hrtn();

            expect(t1).toBeCloseTo(t0, 2);
            expect(t1).not.toBe(t0);
        }
    });

    test("should have a floor method returning integers", function () {
        for (let i = 0; i < REPETITIONS; i++) {
            const
                t0 = 1e-3 * Date.now(),
                t1 = hrtn.floor();

            expect(t1).toBeCloseTo(t0, -1);
            expect(parseInt(t1)).toBe(t1);
        }
    });

    test("should have a datetime method returning strings", function () {
        const datetime = hrtn.datetime();
        expect(typeof datetime).toBe('string');
        console.log(datetime);
    });

});
