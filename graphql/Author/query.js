const authors = [
  { id: 1, name: "kullanıcı1" },
  { id: 2, name: "kullanıcı2" }
];
const books = [
  { id: 1, title: "Kitap 1", author: 1 },
  { id: 2, title: "Kitap 2", author: 1 },
  { id: 3, title: "Kitap 3", author: 2 }
];

module.exports = {
  Query: {
    getAuthors: () => {
      return authors;
      // return books.map((v, i) => {
      //   return { ...v, author: authors.find(a => a.id === v.author) };
      // });
    }
  }
};
