export declare const IX: (x: number, y: number, z: number, size: number) => number;
export declare const iterateGrid: (size: number, cb: ({ x, y, z }: {
    x: number;
    y: number;
    z: number;
}) => void) => void;
export declare const extractSlice: (density: Float32Array, z: number, n: number) => Float32Array;
