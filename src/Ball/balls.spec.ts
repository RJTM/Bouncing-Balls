import Ball from "./ball";

describe("adssae", () => {
    beforeEach(() => {
        const ball = new Ball(0, 0, 0, 0, "red", 3);
    });

    test("stop shoulsd stop the ball", () => {
        expect(ball.stopped).toBeFalsy();
    });
});
