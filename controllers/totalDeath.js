const totalDeath = async (req, res) => {
  try {
    const data = await collection_connection
      .aggregate([
        {
          $project: {
            _id: "total",
            death: "$death",
            death: { $sum: "$death" },
          },
        },
      ])
      .exec();
    const totalDeath = data[0].death;
    res.status(200).json({
      data: {
        _id: "total",
        death: totalDeath,
      },
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = totalDeath;
