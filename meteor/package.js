var _ = Npm.require("underscore")
var glob = Npm.require("glob")
var path = Npm.require('path');

Package.describe({
  name: 'maxkferg:pdfjs',
  version: '0.0.1',
  summary: 'Wraps nitrolabs:pdfjs in a meteor package',
  git: '',
  documentation: 'README.md'
});

Npm.depends({'glob':'4.3.5'});

// XXX: We need to find a better way of listing assets
var base = path.resolve('packages/meteor-pdfjs/');
var images = glob.sync(path.join(base,"meteor/images/*.*"));
var cmaps = glob.sync(path.join(base,"meteor/cmaps/*.bcmap"));
var lang = glob.sync(path.join(base,"meteor/locale/*/*.properties"));
var local = path.join(base,"meteor/locale/locale.properties");

var assets = _.map(_.union(images,cmaps,lang,local),function(abspath){
  return path.relative(base,abspath);
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.export('LuminViewer','client');
  api.use(['templating'], 'client');
  api.addFiles('meteor/pdf.js','client');
  api.addFiles('meteor/l10n.js','client');
  api.addFiles('meteor/debugger.js','client');
  api.addFiles('meteor/compatibility.js','client');
  api.addFiles('meteor/pdf.worker.js', 'client', {isAsset:true});

  api.addFiles('meteor/viewer.html','client');
  api.addFiles('meteor/viewer.js','client');
  api.addFiles('meteor/viewer.css','client',{isAsset:true});
  api.addFiles(assets,'client',{isAsset:true});
});

Package.onTest(function(api) {
  api.use(['tinytest','templating'], 'client');
});




// options is optional
//, options, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
//})