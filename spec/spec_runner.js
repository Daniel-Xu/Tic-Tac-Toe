require.config({
　  baseUrl: "src/",

    paths: {
        'underscore': 'lib/underscore',
        'jasmine' : '../lib/jasmine-2.0.0/jasmine',
        'jasmine-html' : '../lib/jasmine-2.0.0/jasmine-html',
        'jasmine-boot' : '../lib/jasmine-2.0.0/boot',
        'spec': '../spec'
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
    specs.push('spec/test_cell')
    specs.push('spec/test_board')
    specs.push('spec/engine')

    require(specs, function(spec) {
        window.onload();
    })
})
