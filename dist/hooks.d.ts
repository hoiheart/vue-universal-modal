import type { ComputedRef, Ref } from 'vue';
declare type UseOrder = ({ modelValue, show }: {
    modelValue: Ref<boolean | undefined>;
    show: Ref<boolean>;
}) => {
    latest: ComputedRef<boolean>;
};
export declare const useOrder: UseOrder;
declare type UseColse = ({ close, options, latest }: {
    close: Ref;
    options: Ref<{
        [key: string]: unknown;
    }>;
    latest: ComputedRef<boolean>;
}) => {
    mergeOptions: {
        transition: number | false;
        closeClickDimmed: boolean;
        closeKeyCode: number | false;
        styleModalContent: {
            [key: string]: unknown;
        };
    };
    onClickDimmed: () => void;
};
export declare const useClose: UseColse;
declare type UseA11Y = ({ modalRef, latest, show }: {
    modalRef: Ref<null | HTMLElement>;
    latest: ComputedRef<boolean>;
    show: Ref<boolean>;
}) => void;
export declare const useA11Y: UseA11Y;
export {};
