import type { ComputedRef, Ref } from 'vue';
declare type UseA11Y = ({ modalRef, latest, show, }: {
    modalRef: Ref<null | HTMLElement>;
    latest: ComputedRef<boolean>;
    show: Ref<boolean>;
}) => void;
declare type UseClose = ({ close, closeKeyCode, latest, }: {
    close: Ref;
    closeClickDimmed: boolean;
    closeKeyCode: number | false;
    latest: ComputedRef<boolean>;
}) => {
    onMouseDownDimmed: (e: MouseEvent) => void;
    onMouseUpDimmed: (e: MouseEvent) => void;
};
declare type UseOrder = ({ modalRef, show, }: {
    modalRef: Ref<HTMLElement | null>;
    show: Ref<boolean>;
}) => {
    latest: ComputedRef<boolean>;
};
export declare const useA11Y: UseA11Y;
export declare const useClose: UseClose;
export declare const useOrder: UseOrder;
export {};
