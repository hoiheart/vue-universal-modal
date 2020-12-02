import type { App, Ref } from 'vue';
interface PluginOptions {
    teleportComponent: string;
    teleportComponentId: string;
    modalComponent: string;
}
interface Provide {
    teleportComponentId: string;
    teleportRef: Ref;
}
declare const PLUGIN_NAME = "VueUniversalModal";
declare const CLASS_NAME = "vue-universal-modal";
declare const _default: {
    install: (app: App, options?: {}) => void;
};
export default _default;
export { PLUGIN_NAME, CLASS_NAME };
export type { PluginOptions, Provide };
