'use strict';

const colors = require('colors');
const application = require('./application');

const app = application();

require('./helpers')(app);               console.log('[Init]' . magenta, 'loading helpers...' . cyan);
require('./outputs')(app);               console.log('[Init]' . magenta, 'loading outputs...' . cyan);

// Run the application
app.run();