module.exports = {
  Book: {
    id: parent => {
      console.log(parent);
      return "2";
      // return [{ title: "asd" }];
      // return books.map((v, i) => {
      //   return { ...v, author: authors.find(a => a.id === v.author) };
      // });
    },
    author: () => {
      return { name: "Furkna" };
    }
  }
};
