const campgroundsRoutes = require("./routes/campgrounds"),
      commentRoutes     = require("./routes/comments"),
      methodOverride    = require("method-override"),
      LocalStrategy     = require("passport-local"),
      indexRoutes       = require("./routes/index"),
      User              = require("./models/user"),
      flash             = require("connect-flash"),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),
      passport          = require("passport"),
      express           = require("express"),
      app               = express();
      
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb+srv://kzeery:yelpcamp123@yelpcampcluster-8goad.mongodb.net/test?retryWrites=true");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "YelpCampSecret13245",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundsRoutes);


app.listen(3000, '127.0.0.1', function() {
    console.log("server started");
});