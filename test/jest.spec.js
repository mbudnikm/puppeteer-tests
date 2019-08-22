describe('EXAMPLE JEST TESTS', () => {
    it('some test', () => {
        expect(1 + 2).toEqual(3)
    });

    it('some test xddd', () => {
        expect.assertions(1)
        const p = Promise.resolve(123)
        p.then(value => {
            expect(value).toEqual(123)
        })

        //return p
    });
});