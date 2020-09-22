interface IDeviceRotationParams {
    limit: number;
    callback: (position: IDeviceRotationPosition) => void;
    offset: IDeviceRotationPosition;
}

interface IDeviceRotationPosition {
    x: number;
    y: number;
}

interface IDeviceRotationStartParams {
    withPermission?: boolean;
}

type TCallBack = (position: IDeviceRotationPosition, ...args) => void;

class DeviceRotation {
    protected params:IDeviceRotationParams = {
        limit: 100,
        callback: () => {},
        offset: {
            x: 0,
            y: 0,
        },
    };

    protected timerId = 0;

    protected callbackArgs = [];

    protected onOrientationChange = (e: DeviceOrientationEvent): void => {
        const position: IDeviceRotationPosition = this.getDevicePosition(e);
        this.throttle(
            this.params.callback,
            this.params.limit,
            this.setTimer,
        )(position, ...this.callbackArgs);
    };

    protected getPermission = () => {
        window.DeviceOrientationEvent.requestPermission()
            .then((response) => {
                if (response !== 'granted') {
                    // eslint-disable-next-line no-console
                    console.error('Permission denied');
                    return;
                }

                window.addEventListener('deviceorientation', this.onOrientationChange, true);
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);
            });
    };

    protected setTimer = (timerId) => {
        this.timerId = timerId;
    };

    protected throttle = (
        callback: TCallBack,
        limit: number,
        timerSetter: (timerId: number) => void,
    ): TCallBack => {
        let wait = false;

        return function throttled(position, ...args): void {
            if (!wait) {
                callback.call(this, position, ...args);
                wait = true;
                const timerId = window.setTimeout(() => { wait = false; }, limit);

                timerSetter(timerId);
            }
        };
    };

    protected getDevicePosition: (e: DeviceOrientationEvent) => IDeviceRotationPosition = (e) => {
        const gamma = Math.floor(e.gamma);
        const beta = Math.floor(e.beta);

        return {
            x: Math.floor(gamma) + this.params.offset.x,
            y: Math.floor(beta) + this.params.offset.y,
        };
    };

    public isAvailable = (): boolean => Boolean(window.DeviceOrientationEvent);

    public needPermission = (): boolean => (
        this.isAvailable() && typeof window.DeviceOrientationEvent.requestPermission === 'function'
    );

    public setLimit = (limit: number): void => {
        this.params.limit = limit;
    };

    public setOffset = (x: number, y: number): void => {
        this.params.offset.x = x;
        this.params.offset.y = y;
    };

    public setCallback = <T extends TCallBack, TArgs>(callback: T, ...args: Array<TArgs>) => {
        this.params.callback = callback;
        this.callbackArgs = args;
    };

    public start = (params: IDeviceRotationStartParams = {}): void => {
        if (!this.isAvailable()) {
            return;
        }

        if (this.needPermission() && params.withPermission) {
            this.getPermission();
            return;
        }

        window.addEventListener('deviceorientation', this.onOrientationChange, true);
    };

    public stop = ():void => {
        window.removeEventListener('deviceorientation', this.onOrientationChange, true);
        window.clearTimeout(this.timerId);
    };
}

export = new DeviceRotation();
