/**
 * Returns the time in seconds since the process started.
 * @returns {Number}
 * {@link https://nodejs.org/api/process.html#process_process_hrtime_time process.hrtime}
 */
function processTime() {
    const [sec, nsec] = process.hrtime();
    return sec + 1e-9 * nsec;
}

/**
 * Returns the time in seconds of UTC time.
 * @returns {Number}
 * {@link https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/now Date.now}
 */
function dateTime() {
    return 1e-3 * Date.now();
}

/**
 * The offset in seconds from UTC time to the start of the process.
 * @type {Number}
 */
const offset = dateTime() - processTime();

/**
 * Aims to be more precise than Date.now and returns the time in seconds of UTC time.
 * @returns {Number}
 */
function hrTime() {
    return offset + processTime();
} // hrTime

/**
 * Calls hrTime internally, but returns the result floored to seconds.
 * @returns {Number}
 */
hrTime.floor = function () {
    return Math.floor(hrTime());
};

module.exports = hrTime;