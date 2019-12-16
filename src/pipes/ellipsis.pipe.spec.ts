import { EllipsisPipe } from './ellipsis.pipe';

describe('ElipsisPipe', () => {
    it('create an instance', () => {
        const pipe = new EllipsisPipe();
        expect(pipe).toBeTruthy();
    });

    it('returns a string with an endpoint of an ellipses', () => {
        const pipe = new EllipsisPipe();
        let value = pipe.transform('hello world', -3);

        expect(value).toEqual('hello...');
    });

    it('returns undefined if value is undefined', () => {
        const pipe = new EllipsisPipe();
        let value = pipe.transform(undefined, -3);

        expect(value).toEqual(undefined);
    });

    it('returns value if value length is equal to length argument', () => {
        const pipe = new EllipsisPipe();
        let value = pipe.transform('hello', 5);

        expect(value).toEqual('hello');
    });
});
