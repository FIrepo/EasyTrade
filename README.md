# Easy Trade
### Web application for posting advertisements for selling, buying, renting, and leasing in various areas like real estates, cars, etc.

## Application structure
![Folder structure](https://rawgit.com/KonstantinAdamu/EasyTrade/master/app_structure.jpg)

### Users and roles
The website offers different accessibility options and functionality for admins, users or visitors. Anyone can browse the site and view the home page, login and register screens, various ad details. Visitors can also search by different criteria.

Registered and logged in users have access to their profiles that can be updated or deleted. They can also create new ads, and edit and delete the ones that they have published.

Admin users can create, update or delete other users and also to change their roles.

### Cars and Real Estates
Cars and Real Estates ads have many properties that offer users various filters when searching. 

There are several views, showing details, search options, the paged and sorted results of various searches, etc.
All ads provide detailed and thorough information and photos.

## Routes and functionality
```Javascript
// USERS
    app.get('/api/all-users', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).getAllUsers);
    app.get('/register', controllers['users-controller'](app, services['users-data-service']).getRegister);
    app.post('/register', controllers['users-controller'](app, services['users-data-service']).postRegister);
    app.get('/login', controllers['users-controller'](app, services['users-data-service']).getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.isAuthenticated, auth.logout);
    app.get('/all-users', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).getAllUsers);
    app.get('/profile', auth.isAuthenticated, function (req, res) {
        res.render('users/profile');
    });
    app.post('/profile', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).updateUser);
    app.get('/profile/:username', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).getAllUsers);
    app.post('/profile/:username', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).updateUser);
    app.get('/profile/delete/:id', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).deleteUser);
    app.get('/admin-panel', auth.isAuthenticated, function (req, res) {
        res.render('users/admin-panel');
    });
// REAL ESTATES
    app.get('/real-estates/search', controllers['realestates-controller'](app).getSearch);
    app.get('/real-estates/create', controllers['realestates-controller'](app).getCreateForm);
    app.post('/real-estates/create', upload.single('image'), controllers['realestates-controller'](app).create);
    app.get('/real-estates', controllers['realestates-controller'](app).getSearch);
    app.post('/real-estates/delete/:id', controllers['realestates-controller'](app).deleteEstate);
    app.get('/real-estates/:id', controllers['realestates-controller'](app).getRealEstate);
    app.get('/real-estates/:id/edit', controllers['realestates-controller'](app).getEditView);
    app.post('/real-estates/:id', controllers['realestates-controller'](app).edit);
// CARS
    app.get('/cars', controllers['cars-controller'](app, services['cars-data-service']).getMainView);
    app.get('/cars/create', auth.isAuthenticated, controllers['cars-controller'](app, services['cars-data-service']).getCreate);
    app.post('/cars/create', auth.isAuthenticated, controllers['cars-controller'](app, services['cars-data-service']).postCreate);
    app.get('/cars/update/:id', auth.isAuthenticated, controllers['cars-controller'](app, services['cars-data-service']).getUpdate);
    app.post('/cars/update/:id', auth.isAuthenticated, controllers['cars-controller'](app, services['cars-data-service']).postUpdate);
    app.get('/cars/all', controllers['cars-controller'](app, services['cars-data-service']).getAllCars);
    app.get('/cars/search', controllers['cars-controller'](app, services['cars-data-service']).getSearch);
    app.get('/cars/delete/:id', controllers['cars-controller'](app, services['cars-data-service']).deleteCar);
    app.get('/cars/details/:id', controllers['cars-controller'](app, services['cars-data-service']).getCar);
// HOME
    app.get('/', controllers['home-controller'](app, services['cars-data-service'], services['realestates-data-service']).getLast);

    app.get('*', function (req, res) {
        res.redirect('/');
    });
```
There are several controllers that use the data-services for the corresponding type, which communicate with the data-layer that makes the actual requests to the database.
The application provides server-side paging, sorting, and filtering.
There are several levels of validation of data - at the client, in some of the controllers, and in the data-base models.
## Presentation
The site presents the relevant information in an intuitive, easy to use way. The good user experience is enhanced by several tables and a Kendo UI Grid that offer multiple searching, sorting, paging and filtering options.
Every important user action results in a user-friendly success or error notification.