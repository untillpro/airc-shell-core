
class API {
    static init() {
        if (iframeApi && typeof iframeApi === 'function') {
            iframeApi({}).then(function (api) {
                api.changePath(window.location.href);
            });
        } else {
            throw new Error('Ushell API error: iframeApi is not defined!');
        }
    }

    static async sendRequest(action, params) {
        if (iframeApi && typeof iframeApi === 'function') {
            iframeApi({}).then(function (api) {
                const token = api.getToken();

                if (token) {
                    return fetch(action, {})
                        .then((response) => response.json());
                } else {
                    throw new Error('SendRequest error: token is ' + token);
                }
            });
        } else {
            throw new Error('Ushell API error: iframeApi is not defined!');
        }
    }

    static sendError(text = null, descr = null, lifetime = 10, hideClose = false) {
        if (iframeApi && typeof iframeApi === 'function') {
            iframeApi({}).then(function (api) {
                api.sendError(text, descr, lifetime, hideClose);
            });
        }
    }

    static sendWarning(text = null, descr = null, lifetime = 10, hideClose = false) {
        if (iframeApi && typeof iframeApi === 'function') {
            iframeApi({}).then(function (api) {
                api.sendWarning(text, descr, lifetime, hideClose);
            });
        }
    }

    static sendSuccess(text = null, descr = null, lifetime = 10, hideClose = false) {
        if (iframeApi && typeof iframeApi === 'function') {
            iframeApi({}).then(function (api) {
                api.sendSuccess(text, descr, lifetime, hideClose);
            });
        }
    }

    static sendInfo(text = null, descr = null, lifetime = 10, hideClose = false) {
        if (iframeApi && typeof iframeApi === 'function') {
            iframeApi({}).then(function (api) {
                api.sendInfo(text, descr, lifetime, hideClose);
            });
        }
    }
}


$(() => {
    try {
        API.init();
    } catch (e) {
        console.error(e);
    }
});