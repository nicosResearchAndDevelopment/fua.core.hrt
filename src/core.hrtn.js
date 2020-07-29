module['exports'] = function () {

    /**
     * Returns the time in seconds since the process started.
     * @returns {Number} 
     * {@link https://nodejs.org/api/process.html#process_process_hrtime_time process.hrtime}
     */
    function processTime() {
        const [sec, nanosec] = process['hrtime']();
        return sec + 1e-9 * nanosec;
    }

    /**
     * Returns the time in seconds of UTC time.
     * @returns {Number} 
     * {@link https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/now Date.now}
     */
    function dateTime() {
        return 1e-3 * Date['now']();
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
     * 
     * @param {{mode: "floor"|"high"}} args 
     */
    function hrt(args = { 'mode': "high" }) {
        switch (args['mode']) {
            case "floor":
                return Math['floor'](hrTime());
                break;
            case "high":
            default:
                return hrTime();
                break;
        }
    } // hrt

    return hrt;
};
