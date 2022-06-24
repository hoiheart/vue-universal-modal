import type { App, Ref } from 'vue';
interface PluginOptions {
    teleportTarget?: string;
    teleportComponent?: string;
    teleportComponentId?: string;
    modalComponent?: string;
}
interface Provide {
    teleportTarget: string;
    visibleModals: Ref<Set<HTMLElement>>;
    addVisibleModals: (el: HTMLElement) => void;
    removeVisibleModals: (el: HTMLElement) => void;
}
declare const PLUGIN_NAME = "VueUniversalModal";
declare const CLASS_NAME = "vue-universal-modal";
declare const _default: {
    install: (app: App<any>, options: PluginOptions) => void;
};
export default _default;
export { PLUGIN_NAME, CLASS_NAME };
export type { PluginOptions, Provide };
