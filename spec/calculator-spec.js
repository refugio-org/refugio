describe("multiplication", function() {
    it("should multiply 2 and 3", function() {
        // Given
        var x1 = 2,
            x2 = 3;

        // When
        var product = x1 * x2;

        // Then
        expect(product).toBe(6);
    });
}); 
