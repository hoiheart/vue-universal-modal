interface Options {
    transition: number | false;
    closeKeyCode: number | false;
    closeClickDimmed: boolean;
    styleModal: {
        [key: string]: string;
    };
    styleModalContent: {
        [key: string]: string;
    };
}
declare const _default: import("vue").DefineComponent<{
    close: {
        type: FunctionConstructor;
        required: true;
        default: () => undefined;
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    id: {
        type: StringConstructor;
        default: string;
    };
    class: {
        type: StringConstructor;
        default: string;
    };
    ariaLabelledby: {
        type: StringConstructor;
        default: string;
    };
}, {
    CLASS_NAME: string;
    teleportTarget: string;
    modalRef: import("vue").Ref<any>;
    show: import("vue").Ref<any>;
    latest: import("vue").ComputedRef<boolean>;
    emitClose: () => void;
    emitAfterLeave: () => void;
    onClickDimmed: () => void;
    mergeOptions: Options;
    transition: string | boolean;
    className: string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("before-enter" | "after-enter" | "before-leave" | "after-leave")[], "before-enter" | "after-enter" | "before-leave" | "after-leave", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    close: Function;
    options: Record<string, any>;
    disabled: boolean;
    id: string;
    class: string;
    ariaLabelledby: string;
} & {}>, {
    close: Function;
    options: Record<string, any>;
    disabled: boolean;
    id: string;
    class: string;
    ariaLabelledby: string;
}>;
export default _default;
