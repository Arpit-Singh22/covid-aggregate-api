const totalRecovered = async (req, res) => {
  try {
    const data = await collection_connection
      .aggregate([
        {
          $project: {
            _id: "total",
            recovered: "$recovered",
            recovered: { $sum: "$recovered" },
          },
        },
      ])
      .exec();
    const totalRecovered = data[0].recovered;
    res.status(200).json({
      data: {
        _id: "total",
        recovered: totalRecovered,
      },
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = totalRecovered