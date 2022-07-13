require('./config/db.connection')
const { Review } = require("./models");

Review.deleteMany({}, function (error, deletedReviews) {
  if (error) {
    return console.log(error);
  }
  Review.insertMany(
    [
      {
        rating: 5,
        content: "Fast Delivery!",
        product: "626939ab3a901d3a7d917c79",
        user: "62681b2158212de6d23878fc",
      },
      {
        rating: 3,
        content: "Took awhile to get here, but the product is great.",
        product: "626939ab3a901d3a7d917c79",
        user: "62681b7258212de6d23878ff",
      },
      {
        rating: 4,
        content: "love the style of the products",
        product: "62695582a2b74d5ff8e9c74c",
        user: "62681b2158212de6d23878fc",
      },
    ],
    function (error, createdReviews) {
      if (error) {
        return console.log(error);
      }
      console.log("=== Seed Complete ===");
      console.log(createdReviews);
    }
  );
});