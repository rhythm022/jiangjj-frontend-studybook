import { enableArray } from "../../shared/index";

export function initSlots(instance: any, children: any) {
    for (const name in children) {
        const slot = children[name];

        instance.slots[name] = enableArray(slot)

    }
}

