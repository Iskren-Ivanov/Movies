const movieCategories = (arrayOfCategoryNumbs) => {
  const categories = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };
  const arrayOfCurrentCategories = arrayOfCategoryNumbs.map((cat) => {
    if (categories[cat] === undefined) {
      return 'unknown category';
    } else {
      return categories[cat];
    }
  });
  return arrayOfCurrentCategories.join(', ');
};

export default movieCategories;
