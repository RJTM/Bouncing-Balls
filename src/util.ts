/**
 * Returns a random number between min and max
 * @param  {number} min
 * @param  {number} max
 * 
 * @return {number} A random number
 */
const randomNumber = function (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * @callback onResizeUpdateCallback
 * @param {number} width - Window Width
 * @param {number} height - Window height
 */

/**
 * Calls the function callback on window resize with window width and height as parameters
 * @param  {onResizeUpdateCallback} callback - Function to be called
 */
const onResizeUpdate = function (callback: (width: number, height: number) => void) {
    window.addEventListener('resize', function () {
        callback(window.innerWidth, window.innerHeight);
    });
}

/**
 * Returns an object of shape { height, width } with the current window height and width
 */
const getWindowSize = function () : {width: number, height: number} {
    return {
        height: window.innerHeight,
        width: window.innerWidth
    };
}

/**
 * @callback onGravityChangeCallback
 * @param {number} gravity
 */


/**
 * Calls the function callback on gravity change
 * @param  {onGravityChangeCallback} callback
 */
const onGravityChangeUpdate = function (callback: (gravity: string) => void) {
    document.querySelector('.gravity-control')
        .addEventListener('change', (event) => {
            callback((<HTMLInputElement> event.target).value);
        });
}

/**
 * @callback onBounceChangeCallback
 * @param {number} bounce
 */


/**
 * Calls the function callback on bounce change
 * @param  {onBounceChangeCallback} callback
 */
const onBounceChangeUpdate = function (callback: (bounce: any) => void) {
    document.querySelector('.bounce-control')
        .addEventListener('change', (event) => {
            callback((<HTMLInputElement> event.target).value);
        });
}

/**
 * @callback onDelayChangeCallback
 * @param {number} delay
 */


/**
 * Calls the function callback on delay change
 * @param  {onDelayChangeCallback} callback
 */
const onDelayChangeUpdate = function (callback: (delay: any) => void) {
    document.querySelector('.delay-control')
        .addEventListener('change', (event) => {
            callback((<HTMLInputElement> event.target).value);
        });
}

export { randomNumber, onResizeUpdate, getWindowSize, onGravityChangeUpdate, onBounceChangeUpdate, onDelayChangeUpdate };