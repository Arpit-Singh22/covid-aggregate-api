const totalActive = async (req, res) => {
  try {
    const data = await collection_connection
      .aggregate([
        {
          $project: {
            _id: "total",
            infected: "$infected",
            recovered: "$recovered",
            active: { $subtract: ["$infected", "$recovered"] },
          },
        },
      ])
      .exec();
    // console.log(data);
    const totalActive = data[0].active;
    res.status(200).json({
      data: {
        _id: "total",
        recovered: totalActive,
      },
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = totalActive;
