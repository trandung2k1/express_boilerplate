const site = require('./site.route');
const auth = require('./auth.route');
const routes = (app) => {
    app.use('/', site);
    app.use('/api/auth', auth);
};

module.exports = routes;
