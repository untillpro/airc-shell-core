
class UShellAPIGate {
    constructor(dispatch = null) {
        this.api = null;
        this.dispatch = dispatch; // dispatch function
    }

    init(iframeApi) {
        if (iframeApi && typeof iframeApi === 'function') {
            iframeApi({
                dispatch: (action) => { this.dispatch(action) }
            }).then(function (api) {
                console.log('iframeApi loaded in plugin');
                console.log(api);
                this.api = api;

                if (api.onModuleLoad) {
                    api.onModuleLoad();
                }
            });
        } else {
            throw new Error('Ushell API error: iframeApi is not defined!');
        }
    }

    async dispatch(action) {
        if (this.dispatch && typeof this.dispatch === 'function') {
            this.dispatch(action);
        }
    }
    

    async do(queueId, path, params) {
        if (this.api) {
            if (this.api.do && typeof this.api.do === 'function') {
                return this.api.do(queueId, path, params);
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

window.UApi = new UShellAPIGate().init(iframeApi);