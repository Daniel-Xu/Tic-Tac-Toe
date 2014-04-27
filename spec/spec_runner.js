require.config({
　  baseUrl: "src/",

    paths: {
        'underscore': 'lib/underscore',
        'jasmine' : '../lib/jasmine-2.0.0/jasmine',
        'jasmine-html' : '../lib/jasmine-2.0.0/jasmine-html',
        'jasmine-boot' : '../lib/jasmine-2.0.0/boot',
        'share-function': '../spec/share_function',
        'spec': '../spec'
    },

    shim: {
        'underscore':{ 
            exports: '_'
        },
        'jasmine-boot' : {
            deps : [ 'jasmine', 'jasmine-html', "share-function" ],
            exports : 'jasmine'
        },
        'jasmine-html' : {
            deps : [ 'jasmine' ]
        },
    }

});

require(['jasmine-boot'], function(jasmine) {
    var specs = [];

    specs.push('spec/test_control')
    specs.push('spec/test_cell')
    specs.push('spec/test_board')
    specs.push('spec/test_game')
    specs.push('spec/test_engine')

    require(specs, function(spec) {
        window.onload();
    })
})
