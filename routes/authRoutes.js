const passport = require("passport");

module.exports = app => {
  /////// prashtam zapitwane kum google za profile + email
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  /////// poluchawam kod ot google sudurjasht dannite na usera,sled kato izpulnq tazi funkciq google api razpoznawa koda i go prewrushta w danni koito moga da polzwam
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );
  app.get("/api/logout", (req, res) => {
    req.logout();

    res.redirect("/");
  });
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
