const
    config      = {
        tests:      100,
        iterations: 100000
    },
    timer       = {
        ts:   [0, 0],
        time: 0,
        start() {
            this.ts = process.hrtime();
        },
        stop() {
            const [sec, nsec] = process.hrtime(this.ts);
            this.time         = sec + 1e-9 * nsec;
        }
    },
    shuffle     = (array) => {
        for (let index = array.length - 1; index > 0; index--) {
            let temp      = array[index],
                random    = Math.floor(Math.random() * index);
            array[index]  = array[random];
            array[random] = temp;
        }
        return array;
    },
    round       = (number, decimals = 0) => {
        const factor = 10 ** decimals;
        return Math.round(number * factor) / factor;
    },
    hrt_methods = {
        'static':   () => 1337,
        'datetime': () => {
            return 1e-3 * Date.now();
        },
        'hrtime':   () => {
            const [sec, nsec] = process.hrtime();
            return sec + 1e-9 * nsec;
        }
    },
    test_array  = shuffle((new Array(config.tests)).fill(Object.keys(hrt_methods)).flat(1).map(val => val)),
    results     = Object.fromEntries(Object.keys(hrt_methods).map(key => [key, {
        name:  key,
        times: [],
        value: ''
    }]));

for (let key of test_array) {
    const method = hrt_methods[key],
          result = results[key];
    timer.start();
    for (let i = 0, max = config.iterations; i < max; i++) {
        result.value = method();
    }
    timer.stop();
    result.times.push(timer.time);
}

console.log('Average time of ' + config.tests.toLocaleString() + ' tests with ' + config.iterations.toLocaleString() + ' iterations each:');
for (let result of Object.values(results)) {
    const avgTimeSec = result.times.reduce((acc, val) => acc + val, 0) / result.times.length;
    console.log('- ' + result.name + ': ' + round(1e3 * avgTimeSec, 2).toLocaleString() + 'ms');
}