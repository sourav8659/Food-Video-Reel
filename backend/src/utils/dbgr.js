const debug=require('debug');

const dbgr=debug('development');

dbgr.mongoose=debug("development: mongoose");
dbgr.server=debug("development: server");

module.exports=dbgr;