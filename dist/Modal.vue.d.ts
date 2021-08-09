interface MergeOptions {
    transition: number | false;
    closeClickDimmed: boolean;
    closeKeyCode: number | false;
    styleModalContent: {
        [key: string]: unknown;
    };
}
declare const _default: import("vue").DefineComponent<{
    close: {
        type: FunctionConstructor;
        default: () => undefined;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}, {
    CLASS_NAME: string;
    emitClose: () => void;
    inserted: import("vue").Ref<boolean>;
    latest: import("vue").ComputedRef<boolean>;
    mergeOptions: MergeOptions;
    modalRef: import("vue").Ref<null>;
    onMouseDownDimmed: (e: MouseEvent) => void;
    onMouseUpDimmed: (e: MouseEvent) => void;
    onTransitionEmit: {
        beforeEnter: () => void;
        enter: () => void;
        afterEnter: () => void;
        enterCancelled: () => void;
        beforeLeave: () => void;
        leave: () => void;
        afterLeave: () => void;
        leaveCancelled: () => void;
    };
    show: import("vue").Ref<boolean>;
    teleportTarget: string;
    transition: string | boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("before-enter" | "enter" | "after-enter" | "enter-cancelled" | "before-leave" | "leave" | "after-leave" | "leave-cancelled")[], "before-enter" | "enter" | "after-enter" | "enter-cancelled" | "before-leave" | "leave" | "after-leave" | "leave-cancelled", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    close?: unknown;
    disabled?: unknown;
    modelValue?: unknown;
    options?: unknown;
} & {
    disabled: boolean;
    modelValue: boolean;
    options: Record<string, any>;
} & {
    close?: Function | undefined;
}>, {
    close: Function;
    disabled: boolean;
    modelValue: boolean;
    options: Record<string, any>;
}>;
export default _default;
