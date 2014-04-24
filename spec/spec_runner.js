require.config({
　  baseUrl: "lib/",

    paths: {
        'underscore': '../src/lib/underscore',
        'jasmine' : 'jasmine-2.0.0/jasmine',
        'jasmine-html' : 'jasmine-2.0.0/jasmine-html',
        'jasmine-boot' : 'jasmine-2.0.0/boot',
        'spec' : '../spec',
        'src': '../src'
    },

    shim: {
        'underscore':{ 
            exports: '_'
        },
        'jasmine-boot' : {
            deps : [ 'jasmine', 'jasmine-html' ],
            exports : 'jasmine'
        },
        'jasmine-html' : {
            deps : [ 'jasmine' ]
        },
    }

});

require(['jasmine-boot'], function(jasmine) {
    var specs = [];
    specs.push('spec/test')
    specs.push('spec/test_cell')

    require(specs, function(spec) {
        window.onload();
    })
})
