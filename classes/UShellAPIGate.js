/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */


class UShellAPIGate {
    constructor(dispatch = null) {
        this.api = null;
        this.dispatchFunc = dispatch; // dispatch function
    }

    async init(iframeApi) {
        if (iframeApi && typeof iframeApi === 'function') {
            return iframeApi({
                dispatch: (action) => {
                    this.dispatch(action);
                }
            }).then((api) => {
                this.api = api;

                if (api.onModuleLoad) {
                    api.onModuleLoad();
                }
            });
        }
        throw new Error('Ushell API error: iframeApi is not defined!');
    }

    async dispatch(action) {
        if (this.dispatchFunc && typeof this.dispatchFunc === 'function') {
            return this.dispatchFunc(action);
        }
    }

    async do(queueId, path, params, method = 'get') {
        if (this.api) {
            if (this.api.do && typeof this.api.do === 'function') {
                return this.api.do(queueId, path, params, method);
            } 

            throw new Error('Remote method api.do() not available.');
        } else {
            throw new Error('Remote api not available.');
        }
    }

    async sendError(text = null, descr = null, lifetime = 10, hideClose = false) {
        if (this.api) {
            if (this.api.do && typeof this.api.do === 'function') {
                return this.api.sendError(text, descr, lifetime, hideClose);
            } 

            throw new Error('Remote method api.sendError() not available.');
        } else {
            throw new Error('Remote api not available.');
        }
    }

    async sendWarning(text = null, descr = null, lifetime = 10, hideClose = false) {
        if (this.api) {
            if (this.api.do && typeof this.api.do === 'function') {
                return this.api.sendWarning(text, descr, lifetime, hideClose);
            } 

            throw new Error('Remote method api.sendWarning() not available.');
        } else {
            throw new Error('Remote api not available.');
        }
    }

    async sendSuccess(text = null, descr = null, lifetime = 10, hideClose = false) {
        if (this.api) {
            if (this.api.do && typeof this.api.do === 'function') {
                return this.api.sendSuccess(text, descr, lifetime, hideClose);
            } 

            throw new Error('Remote method api.sendSuccess() not available.');
        } else {
            throw new Error('Remote api not available.');
        }
    }

    async sendInfo(text = null, descr = null, lifetime = 10, hideClose = false) {
        if (this.api) {
            if (this.api.do && typeof this.api.do === 'function') {
                return this.api.sendInfo(text, descr, lifetime, hideClose);
            } 

            throw new Error('Remote method api.sendInfo() not available.');
        } else {
            throw new Error('Remote api not available.');
        }
    }
}

export default UShellAPIGate;
