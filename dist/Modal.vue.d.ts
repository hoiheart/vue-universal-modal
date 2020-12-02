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
    teleportRef: import("vue").Ref<any>;
    modal: import("vue").Ref<null>;
    state: {
        show: boolean;
        closed: boolean;
        className: string;
    };
    emitClose: () => void;
    setClose: () => void;
    onClickDimmed: () => void;
    mergeOptions: Options;
    transition: string | boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
