import { enableArray } from "../../shared/index";

export function initSlots(instance: any, children: any) {
    normalizeObjectSlots(children, instance.slots);
}

function normalizeObjectSlots(children: any, slots: any) {
    for (const name in children) {
        const slot = children[name];

        slots[name] = props => enableArray(slot(props)); // cool!! 中间层

    }
}

