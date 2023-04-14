import { engine } from 'express-handlebars';
import express from 'express';
const viewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.engine('.hbs', engine({ extname: '.hbs' }));
    app.set('view engine', '.hbs');
    app.set('views', './src/views');
};

export default viewEngine;
