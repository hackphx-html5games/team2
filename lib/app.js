var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var Schema = mongoose.Schema;


// Get config from env variables.
var TWITTER_CONSUMER_KEY = process.env.TWITTER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_SECRET;
var MONGO_URI = process.env.MONGO_URI;
var HOST = process.env.NODE_ENV === 'production'
  ? 'asteroids.jit.su' : 'localhost:3000';


var UserSchema = new Schema({
  provider: String,
  uid: String,
  name: String,
  image: String,
  created: {type: Date, default: Date.now}
});

mongoose.connect(MONGO_URI);
mongoose.model('User', UserSchema);

var User = mongoose.model('User');

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://' + HOST + '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({uid: profile.id}, function(err, user) {
      if(user) {
        done(null, user);
      } else {
        user = new User();
        user.provider = 'twitter';
        user.uid = profile.id;
        user.name = profile.displayName;
        user.image = profile._json.profile_image_url;
        user.save(function(err) {
          if(err) { throw err; }
          done(null, user);
        });
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({uid: uid}, function (err, user) {
    done(err, user);
  });
});

var app = express();


// Configure Express.
app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieSession({
    secret: 'pikapika',
    cookie: { maxAge: 60 * 60 * 1000 }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/game', function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);


// Start the app.
server.listen(3000, function() {
  console.log('team2 started on ' + HOST);
});

io.sockets.on('connection', require('./onconnection'));
