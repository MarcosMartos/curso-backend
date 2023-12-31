import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import userManager from "../dao/DB/UserManager.js";
import cartManager from "../dao/DB/CartManager.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: "Iv1.d704ab64b5927e21",
      clientSecret: "0e7d9fa3410293977531a487282b6a46e0edec09",
      callbackURL: "http://localhost:8080/api/sessions/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let foundUser = await userManager.getByFilter({
          email: profile._json.email,
        });

        if (!foundUser) {
          let newUser = {
            email: profile._json.email,
            first_name: profile._json.name,
            oauthUser: true,
          };

          const result = await userManager.create(newUser);

          const userCreated = await userManager.getByFilter({
            email: result.email,
          });

          await cartManager.create({
            userId: userCreated._id,
          });

          return done(null, userCreated);
        } else {
          return done(null, foundUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userManager.getById(id);

  done(null, user);
});
