export default async (req, res) => {
    // ..
    const authSession = await getAuthSession(ctx);
    // ..
    if (!authSession) {
      res.status(403).json({
        status: "Non-authenticated user.",
      });
    } else {
      // get the user data
      res.status(200).json({
        // user data goes here
      });
    }
  };