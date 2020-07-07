module['exports'] = function () {
    const
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
