class URemoteAPIGate {
    constructor(remoteApi) {
        this.api = remoteApi;
    }

    async selectView(view) {
        return this._callApiMethod('selectView', view);
    }

    async setRights(rights) {
        return this._callApiMethod('setRights', rights);
    }

    async init(payload) {
        return this._callApiMethod('init', payload);
    }

    async _callApiMethod(method, ...args) {
        console.log('Calling URemoteAPIGate._callApiMethod with arguments', args);

        if (this.api) {
            if (this.api[method] && typeof this.api[method] === 'function') {
                return this.api[method](...args);
            }
        }
    }
}

export default URemoteAPIGate;