
import Logger from './Logger';
import iframeApi from 'iframe-api';

class UShellAPIGate {
    constructor(pluginApi) {
        this.shellApi = null;
        this.pluginApi = pluginApi || {};

        iframeApi(this.pluginApi)
            .then((api) => {
                console.log('Api recieved in BO plugin', api);
                this.shellApi = api;

                if (api && api.moduleLoaded && typeof api.moduleLoaded === 'function') {
                    api.moduleLoaded();
                }
            }, (err) => {
                Logger.error(err, 'UShellAPIGate error', "UShellAPIGate.init()");
            });
    }

    async do(queueId, path, params, method = 'get') {
        return this._callApiMethod('do', queueId, path, params, method);
    }

    async sendError(text = null, descr = null, lifetime = 10, hideClose = false) {
        return this._callApiMethod('sendError', text, descr, lifetime, hideClose);
    }

    async sendWarning(text = null, descr = null, lifetime = 10, hideClose = false) {
        return this._callApiMethod('sendWarning', text, descr, lifetime, hideClose);
    }

    async sendSuccess(text = null, descr = null, lifetime = 10, hideClose = false) {
        return this._callApiMethod('sendSuccess', text, descr, lifetime, hideClose);
    }

    async sendInfo(text = null, descr = null, lifetime = 10, hideClose = false) {
        return this._callApiMethod('sendInfo', text, descr, lifetime, hideClose);
    }

    async conf(operations, wsids, timestamp, offset) {
        return this._callApiMethod('conf', operations, wsids, timestamp, offset);
    }

    async collection(type, wsids, page, page_size, show_deleted) {
        return this._callApiMethod('collection', type, wsids, page, page_size, show_deleted);
    }

    async sync(entries) {
        return this._callApiMethod('sync', entries);
    }

    async log(wsids, params) {
        return this._callApiMethod('log', wsids, params);
    }

    async _callApiMethod(method, ...args) {
        console.log('Calling UShellAPIGate._callApiMethod with arguments', args);

        if (this.shellApi) {
            if (this.shellApi[method] && typeof this.shellApi[method] === 'function') {
                return this.shellApi[method](...args);
            }

            throw new Error(`Remote method api.${method}() not available.`);
        } else {
            throw new Error('Remote api not available.');
        }
    }
}

export default UShellAPIGate;
