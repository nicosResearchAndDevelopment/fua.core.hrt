module['exports'] = function () {

    //function _get_hrtime(time) {
    //    return process['hrtime'](time);
    //} // _get_hrtime
    //
    //let
    //    _hrtime    = _get_hrtime()
    //;
    const
        //_hrtime_start     = _get_hrtime(undefined),
        //_now              = new Date(),
        //_utc_ts_sec_start = (new Date(_now.getTime() + (_now.getTimezoneOffset() * 60000)).valueOf()) / 1000.0,
        //hrt               = (args) => {
        //    _hrtime = _get_hrtime(_hrtime_start);
        //    return (_utc_ts_sec_start + parseFloat(_hrtime[0] + "." + _hrtime[1])) * 1000.0;
        //} // hrt

        // simon
        process_ms = () => (([sec, nanosec]) => (1e3 * sec + 1e-6 * nanosec))(process['hrtime']()),
        _offset    = Date['now']() - process_ms(),
        hrt        = (args = {'mode': "high"}) => {
            switch (args['mode']) {
                case "floor":
                    return Math['floor'](_offset + process_ms());
                    break;
                case "high":
                default:
                    return _offset + process_ms();
                    break;
            } // switch
        } // hrt
    ; // const

    return hrt;
};
