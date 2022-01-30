import { enableArray } from "../../shared/index";
import { ShapeFlags } from "../../shared/ShapeFlags";

export function initSlots(instance: any, children: any) {
    if(instance.vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN){
        normalizeObjectSlots(children, instance.slots);
    }
}

function normalizeObjectSlots(children: any, slots: any) {
    for (const name in children) {
        const slot = children[name];

        slots[name] = props => enableArray(slot(props)); // cool!! 中间层

    }
}

