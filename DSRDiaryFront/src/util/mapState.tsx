import { useState } from "react";

export default function useMap<K, V>() : [Map<K, V>, { set: (key: K, value: V) => void, remove: (key: K) => void} ] {
    const [map, setMap] = useState<Map<K, V>>(new Map());

    const set = (key: K, value: V) => {
        setMap((prev) => {
            const newValue = new Map(prev);
            newValue.set(key, value);
            return newValue;
        })
    }

    const remove = (key: K) => {
        setMap((prev) => {
            const newValue = new Map(prev);
            newValue.delete(key);
            return newValue;
        })
    }

    return [ map, { set, remove }]
}