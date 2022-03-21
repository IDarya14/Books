export const sortBooks = (currentBook, sort, searchTitle) => {
  const allBooks = currentBook.filter(
    (elem) =>
      elem.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
      elem.author.toLowerCase().includes(searchTitle.toLowerCase())
  );

  switch (sort) {
    case 1:
      return allBooks;
    case 2:
      const res2 = [...allBooks].sort((a, b) => {
        return a.rating - b.rating;
      });
      return res2;
    case 3:
      const res3 = [...allBooks].sort((a, b) => {
        return b.price - a.price;
      });
      return res3;
    case 4:
      const res4 = [...allBooks].sort((a, b) => {
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
      const res5 = [...allBooks].sort(sortArray);
      return res5;
    default:
      return allBooks;
  }
};
