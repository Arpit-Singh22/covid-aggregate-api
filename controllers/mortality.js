const mortality = async (req, res) => {
  try {
    const pipeline = [
      {
        $project: {
          state: "$state",
          infected: { $toInt: "$infected" },
          death: { $toInt: "$death" },
          mortality: {
            $round: [
              {
                $divide: ["$death", "$infected"],
              },
              5,
            ],
          },
        },
      },
      {
        $project: {
          state: "$state",
          mortality: {
            $cond: {
              if: { $lt: ["$mortality", 0.005] },
              then: "$mortality",
              else: null,
            },
          },
        },
      },
      {
        $match: {
          mortality: { $lt: 0.005 },
        },
      },
      {
        $project: {
          state: "$state",
          mortality: "$mortality",
        },
      },
    ];
    const result = await collection_connection.aggregate(pipeline).exec();
    console.log(result);
    const mortality = result.map((item) => ({
      state: item.state,
      rate: item.mortality,
    }));
    // console.log(mortality);
    res.json({
      result: mortality,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = mortality;
