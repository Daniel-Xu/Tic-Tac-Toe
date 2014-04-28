require.config({
　  baseUrl: "src/",
     
    paths: {
        'underscore': 'lib/underscore',
        'jasmine' : '../lib/jasmine-2.0.0/jasmine',
        'jasmine-html' : '../lib/jasmine-2.0.0/jasmine-html',
        'jasmine-boot' : '../lib/jasmine-2.0.0/boot',
        'share-function': '../spec/share_function',
        'blanket': "../lib/blanket.min",
        'jasmine-blanket': "../lib/jasmine-blanket", 
        'spec': '../spec'
    },

    //paths: {
        //'underscore': 'src/lib/underscore',
        //'jasmine' : 'lib/jasmine-2.0.0/jasmine',
        //'jasmine-html' : 'lib/jasmine-2.0.0/jasmine-html',
        //'jasmine-boot' : 'lib/jasmine-2.0.0/boot',
        //'share-function': 'spec/share_function',
        //'blanket': "lib/blanket.min",
        //'jasmine-blanket': "lib/jasmine-blanket", 
    //},
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

        'jasmine-blanket' : {
            deps: ["jasmine-boot", "blanket"], 
            exports: "blanket"
        
        }
    }

});

require(['jasmine-boot'], function(jasmine) {

    //blanket.options('debug', true);
    //////include filter
    ////blanket.options('filter', '');
    ////// exclude filter
    //blanket.options('antifilter', [ 'src/lib', 'src/setting.js', 'src/main.js' ]);
    //blanket.options('branchTracking', true); 
    //var jasmineEnv = jasmine.getEnv();
    //jasmineEnv.addReporter(new jasmine.BlanketReporter());
    //jasmineEnv.updateInterval = 1000;

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
