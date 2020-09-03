/**
 * The store loader
 */
export default class StoreLoader {

    /**
     * Storage wait interval
     */
    static readonly STORE_WAIT_INTERVAL = 10;

    /**
     * Storage loop interval
     */
    static readonly STORE_LOOP_INTERVAL = 30 * 1000;

    /**
     * Waits while store loaded
     * @param store
     * @param closure
     */
    public static wait(store: any, closure: () => void) {
        const __wait = setInterval(() => {
            if (!store.getters.user.isZero()) {
                console.log(2);
                clearInterval(__wait);
                closure();
            }
        }, StoreLoader.STORE_WAIT_INTERVAL);
    }

    /**
     * Loops after storage is ready
     * @param store
     * @param closure
     * @param timeout
     */
    public static loopAfterWaiting(store: any, closure: () => void,
                                   timeout = StoreLoader.STORE_LOOP_INTERVAL) {
        StoreLoader.wait(store, () => {
            closure(); // First call
            setInterval(closure, timeout);
        });
    }

}