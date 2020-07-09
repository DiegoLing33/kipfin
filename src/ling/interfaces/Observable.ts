import ObserverDelegate from "@/ling/delegates/ObserverDelegate";

/**
 * Observable object
 */
export default interface Observable{
    /**
     * Returns the observer
     */
    getObserver(): ObserverDelegate;
}