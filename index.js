let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./utils/db');

let profileRoutes = require('./routes/profileRoute');
let postRoutes = require('./routes/postRoute');

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));

// !! FOR REFERENCE - When you create a route, please use this template to add it.
// let peopleRoutes = require('./routes/peoples');
// app.use(peopleRoutes);

// !! Change the render page name to your view name to test your view.
// Change the variables to your view variables.
app.get('/', function (req,res) {
    // res.render('homeView', { pageTitle: 'People App', heading: 'Welcome to People App', searchBarText: 'Search'});
    res.render('sendMessageView', { 
      pageTitle: 'Send a Message',
      searchResultCSS: true,
      sendmsgCSS: true
    });
});


app.use(profileRoutes);
app.use(postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready @ port ${PORT}`))


