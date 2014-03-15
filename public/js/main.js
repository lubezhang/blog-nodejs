require.config({
    baseUrl: "/js",
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        // jquery: "base/jquery-1.8.3",
        // juicer: "base/juicer"
    },
    shim: {
        'juicer': {
            exports: 'juicer'
        }
    }
});

require([''],function(menu) {
});