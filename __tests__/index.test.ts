/// <reference types="jest" />
import DeviceRotation from '../src/index';

describe('isAvailable', () => {
    it('returns true if DeviceOrientationEvent available', () => {
        Object.defineProperty(window, 'DeviceOrientationEvent', {
            writable: true,
            value: {},
        });

        expect(DeviceRotation.isAvailable()).toBe(true);
    });

    it('returns false if DeviceOrientationEvent unavailable', () => {
        Object.defineProperty(window, 'DeviceOrientationEvent', {
            writable: true,
            value: undefined,
        });

        expect(DeviceRotation.isAvailable()).toBe(false);
    });
});

describe('needPermission', () => {
    it('returns true if DeviceOrientationEvent has requestPermission func', () => {
        Object.defineProperty(window, 'DeviceOrientationEvent', {
            writable: true,
            value: {
                requestPermission: () => {},
            },
        });

        expect(DeviceRotation.needPermission()).toBe(true);
    });

    it('returns false if DeviceOrientationEvent has requestPermission func', () => {
        Object.defineProperty(window, 'DeviceOrientationEvent', {
            writable: true,
            value: {
                requestPermission: undefined,
            },
        });

        expect(DeviceRotation.needPermission()).toBe(false);
    });
});

describe('params', () => {
    it('default limit', () => {
        // @ts-ignore
        expect(DeviceRotation.params.limit).toBe(100);
    });

    it('setLimit', () => {
        DeviceRotation.setLimit(999);

        // @ts-ignore
        expect(DeviceRotation.params.limit).toBe(999);
    });

    it('default offset', () => {
        // @ts-ignore
        expect(DeviceRotation.params.offset).toMatchObject({ x: 0, y: 0 });
    });

    it('setOffset', () => {
        DeviceRotation.setOffset(5, 7);

        // @ts-ignore
        expect(DeviceRotation.params.offset).toMatchObject({ x: 5, y: 7 });
    });

    it('setCallback', () => {
        const cb = () => {};
        DeviceRotation.setCallback(cb);

        // @ts-ignore
        expect(DeviceRotation.params.callback).toBe(cb);
    });
});

it('getDevicePosition', () => {
    DeviceRotation.setOffset(0, 0);

    // @ts-ignore
    expect(DeviceRotation.getDevicePosition({
        gamma: 2.342342,
        beta: 3.453454,
    })).toMatchObject({
        x: 2,
        y: 3,
    });
});

it('getPermission', () => {
    const mockRequestPermission = jest.fn(() => Promise.resolve('granted'));

    Object.defineProperty(window, 'DeviceOrientationEvent', {
        writable: true,
        value: {
            requestPermission: mockRequestPermission,
        },
    });

    // @ts-ignore
    DeviceRotation.getPermission();

    expect(mockRequestPermission).toHaveBeenCalled();
});
