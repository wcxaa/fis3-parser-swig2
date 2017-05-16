fis.set('project.ignore', fis.get('project.ignore').concat(['package.json', 'conf/**']));

fis.match('*.tpl', {
    rExt: '.html',
    parser: fis.plugin('swig2', {
        globalStatics: require('./conf')
    })
});