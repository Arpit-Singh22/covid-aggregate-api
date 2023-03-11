const hotspotStates = async (req, res) => {
  try {
    const pipeline = [
      {
        $project: {
          state: "$state",
          infected: { $toInt: "$infected" },
          recovered: { $toInt: "$recovered" },
          hotSpots: {
            $round: [
              {
                $divide: [
                  {
                    $subtract: [
                      { $toInt: "$infected" },
                      { $toInt: "$recovered" },
                    ],
                  },
                  "$infected",
                ],
              },
              5,
            ],
          },
        },
      },
      {
        $project: {
          state: "$state",
          hotSpots: "$hotSpots",
        },
      },
    ];
    const result = await collection_connection.aggregate(pipeline).exec();
    console.log(result);
    const hotSpots = result.map((item) => ({
      state: item.state,
      rate: item.hotSpots,
    }));
    // console.log(hotSpots);
    res.json({
      result: hotSpots,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = hotspotStates