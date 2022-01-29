export function initSlots(instance: any, children: any) {
    instance.slots = Array.isArray(children) ? children : [children]
}

