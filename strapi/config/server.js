module.exports = ({ env }) => ({
  host: env("HOST", "104.248.39.83"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "4453748abc265688d91f77a32f63c338"),
    },
  },
});
