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
declare type TCallBack = (position: IDeviceRotationPosition, ...args: any[]) => void;
declare class DeviceRotation {
    protected params: IDeviceRotationParams;
    protected timerId: number;
    protected callbackArgs: any[];
    protected onOrientationChange: (e: DeviceOrientationEvent) => void;
    protected getPermission: () => void;
    protected setTimer: (timerId: any) => void;
    protected throttle: (callback: TCallBack, limit: number, timerSetter: (timerId: number) => void) => TCallBack;
    protected getDevicePosition: (e: DeviceOrientationEvent) => IDeviceRotationPosition;
    isAvailable: () => boolean;
    needPermission: () => boolean;
    setLimit: (limit: number) => void;
    setOffset: (x: number, y: number) => void;
    setCallback: <T extends TCallBack, TArgs>(callback: T, ...args: TArgs[]) => void;
    start: (params?: IDeviceRotationStartParams) => void;
    stop: () => void;
}
declare const _default: DeviceRotation;
export default _default;
