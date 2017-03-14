const context = require.context('.', true, /\.test\.jsx?|\.spec\.jsx?$/);

context.keys().forEach(context);
