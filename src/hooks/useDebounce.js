import { useRef } from "react";

export function useDebounce(func, time) {
    const funCall = useRef(null);
    return (...args) => {
        if (funCall.current !== null) {
            clearTimeout(funCall.current);
        }
        funCall.current = setTimeout(() => {
            func(...args);
        }, time);
    };
}
