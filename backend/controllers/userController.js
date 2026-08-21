const getUser = async (req, res) => {
  try {
    res.status(200).json({
      id: req.user._id,
      email: req.user.email,
    });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUser,
};
