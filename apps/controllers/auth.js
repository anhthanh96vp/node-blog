
import express from "express"
const router = express.Router()
import userMxhMd from "../models/userMxh_md"

import passport from "passport";
import keyPassport from '../../config/keyPassport'
const FacebookStrategy = require("passport-facebook").Strategy;

router.get("/login/facebook", passport.authenticate("facebook"));
router.get(
    "/login/facebook/callback",
    passport.authenticate("facebook", {
        // successRedirect: "/admin",
        failureRedirect: "/admin/signin",
        scope: ["email"],
        session: true
    }),
    async function (req, res) {
        try {
            let checkUser = await userMxhMd.checkUserById(req.user.mxh)
            if (checkUser.length == 0) {
                let authMxh = await userMxhMd.addUser(req.user)
            }
            req.session.user = req.user
            req.session.status = "online";
            req.session.save();
            res.redirect("/admin/");
        } catch (error) {
            throw error
        }
    }
);

passport.use(
    new FacebookStrategy(
        {
            clientID: keyPassport.facebook.clientID,
            clientSecret: keyPassport.facebook.clientSecret,
            callbackURL: keyPassport.facebook.callbackURLHost,
            profileFields: keyPassport.facebook.profileFields,
            graphApiVersion: keyPassport.facebook.graphApiVersion
        },
        async function (accessToken, refreshToken, profile, done) {
            let user = {}
            user.mxh = profile.id
            user.access_token = accessToken
            user.password = accessToken;
            user.first_name = profile._json.first_name
            user.last_name = profile._json.last_name
            user.avatar = profile.photos[0]
                ? profile.photos[0].value
                : "/static/imgs/user.png";
            return done(null, user)
        }
    )
);
module.exports = router