class SiteController {
    static getHomePage(req, res) {
        return res.render('index', {
            title: 'Home Page',
        });
    }
}

module.exports = SiteController;
