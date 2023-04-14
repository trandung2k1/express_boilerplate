import site from './site.route.js';
import auth from './auth.route.js';
const routes = (app) => {
    app.use('/', site);
    app.use('/api/auth', auth);
};

export default routes;
