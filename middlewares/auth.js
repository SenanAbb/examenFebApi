const { OAuth2Client } = require("google-auth-library");

function verify(token) {
  if (token) {
    const client = new OAuth2Client(token);
    const CLIENT_ID =
      "355043429392-p0keh6com6lldp10dkdificgl44f2unc.apps.googleusercontent.com";

    let isVerified = true;
    client
      .verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      })
      .then((response) => {
        const payload = response.payload;
        if (
          !payload.aud === CLIENT_ID ||
          !payload.iss.includes("accounts.google.com") ||
          payload.exp < Date.now()
        ) {
          isVerified = false;
        }
      })
      .catch((error) => {
        console.log(error);
        isVerified = false;
      });
    return isVerified;
  }
}

module.exports = { verify };
