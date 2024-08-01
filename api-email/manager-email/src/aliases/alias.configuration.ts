import 'module-alias/register';
const moduleAlias = require('module-alias');
const _dir = __dirname + '/..';

moduleAlias.addAlias('@DB', _dir + '/database');
moduleAlias.addAlias('@Commons', _dir + '/commons');
moduleAlias.addAlias('@App', _dir + '/app.ts');