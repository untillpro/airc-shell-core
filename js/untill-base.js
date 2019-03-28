const initPassViewToggler = () => {
    $(".form-row-field-pass-tgl").on("click", function() {
        const passInput = $(this).prev('input');

        if (passInput) {
            $(this).toggleClass('active');
            const type = $(passInput).attr('type');
            $(passInput).attr('type', type === 'password' ? 'text' : 'password');
        }
    })
};

const initAPI = () => {
    var api = {
      location: function () {
        return window.location;
      }
    };
    
    if (iframeApi && typeof iframeApi === 'function') {
        iframeApi(api).then(function () {
            console.log('API loaded');
        });
    }
    
};

$(() => {
    initAPI();
    initPassViewToggler(); //init form password input toggler
});