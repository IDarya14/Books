export const sortBooks = (currentBook, sort, searchTitle) => {
  const AllBooks = currentBook.filter(
    (elem) =>
      elem.title.toLowerCase().includes(searchTitle) ||
      elem.author.toLowerCase().includes(searchTitle)
  );

  switch (sort) {
    case 1:
      return AllBooks;
    case 2:
      const res2 = [...AllBooks].sort((a, b) => {
        return a.rating - b.rating;
      });
      return res2;
    case 3:
      const res3 = [...AllBooks].sort((a, b) => {
        return b.price - a.price;
      });
      return res3;
    case 4:
      const res4 = [...AllBooks].sort((a, b) => {
        return a.price - b.price;
      });
      return res4;
    case 5:
      const sortArray = (a, b) => {
        if (a.author < b.author) {
          return -1;
        }
        if (a.author > b.author) {
          return 1;
        }
        return 0;
      };
      const res5 = [...AllBooks].sort(sortArray);
      return res5;
    default:
      return AllBooks;
  }
};
