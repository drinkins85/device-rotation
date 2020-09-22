"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceRotation = (function () {
    function DeviceRotation() {
        var _this = this;
        this.params = {
            limit: 100,
            callback: function () { },
            offset: {
                x: 0,
                y: 0,
            },
        };
        this.timerId = 0;
        this.callbackArgs = [];
        this.onOrientationChange = function (e) {
            var position = _this.getDevicePosition(e);
            _this.throttle(_this.params.callback, _this.params.limit, _this.setTimer).apply(void 0, __spreadArrays([position], _this.callbackArgs));
        };
        this.getPermission = function () {
            window.DeviceOrientationEvent.requestPermission()
                .then(function (response) {
                if (response !== 'granted') {
                    console.error('Permission denied');
                    return;
                }
                window.addEventListener('deviceorientation', _this.onOrientationChange, true);
            })
                .catch(function (err) {
                console.error(err);
            });
        };
        this.setTimer = function (timerId) {
            _this.timerId = timerId;
        };
        this.throttle = function (callback, limit, timerSetter) {
            var wait = false;
            return function throttled(position) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (!wait) {
                    callback.call.apply(callback, __spreadArrays([this, position], args));
                    wait = true;
                    var timerId = window.setTimeout(function () { wait = false; }, limit);
                    timerSetter(timerId);
                }
            };
        };
        this.getDevicePosition = function (e) {
            var gamma = Math.floor(e.gamma);
            var beta = Math.floor(e.beta);
            return {
                x: Math.floor(gamma) + _this.params.offset.x,
                y: Math.floor(beta) + _this.params.offset.y,
            };
        };
        this.isAvailable = function () { return Boolean(window.DeviceOrientationEvent); };
        this.needPermission = function () { return (_this.isAvailable() && typeof window.DeviceOrientationEvent.requestPermission === 'function'); };
        this.setLimit = function (limit) {
            _this.params.limit = limit;
        };
        this.setOffset = function (x, y) {
            _this.params.offset.x = x;
            _this.params.offset.y = y;
        };
        this.setCallback = function (callback) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _this.params.callback = callback;
            _this.callbackArgs = args;
        };
        this.start = function (params) {
            if (params === void 0) { params = {}; }
            if (!_this.isAvailable()) {
                return;
            }
            if (_this.needPermission() && params.withPermission) {
                _this.getPermission();
                return;
            }
            window.addEventListener('deviceorientation', _this.onOrientationChange, true);
        };
        this.stop = function () {
            window.removeEventListener('deviceorientation', _this.onOrientationChange, true);
            window.clearTimeout(_this.timerId);
        };
    }
    return DeviceRotation;
}());
exports.default = new DeviceRotation();
//# sourceMappingURL=index.js.map