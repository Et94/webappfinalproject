let express = require('express')
let app = express();
let session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./utils/db');

let profileRoutes = require('./routes/profileRoute');

const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      partialsDir: 'views/partials/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

app.use(session({
  secret: 'mysecret'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));

// !! FOR REFERENCE - When you create a route, please use this template to add it.
// let peopleRoutes = require('./routes/peoples');
// app.use(peopleRoutes);

let postRoutes = require('./routes/postRoutes');
app.use(postRoutes);

// !! Change the render page name to your view name to test your view.
// Change the variables to your view variables.
app.get('/posts', function (req,res) {
    res.render('homeView', { 
      pageTitle: 'People App', 
      heading: 'Welcome to People App',
      homeCSS: true,
      loginCSS: true,
      registerCSS: true,
      searchResultCSS: true
    });
});

app.use(profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready @ port ${PORT}`))
