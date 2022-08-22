export const newsReducer = (state, action) => {
  switch (action.type) {
    case "AXIOS_SUCCESS":
      return {
        ...state,
        articles: [...state.articles, ...action.payload],
        isLoading: false,
      };

    case "AXIOS_ERROR":
      return state;

    case "ADD_TO_SAVE":
      const { title, note, category, isSharable, _id } = action.payload;
      const articleIndex = state.articles.findIndex(
        (article) => article._id === _id
      );
      const newArticles = [...state.articles];
      newArticles[articleIndex].saved = true;

      const saveIndex = state.save.findIndex((item) => item._id === _id);

      return {
        ...state,
        save:
          saveIndex !== -1
            ? state.save.map((item) =>
                item._id === _id
                  ? { ...item, title, note, category, isSharable }
                  : item
              )
            : [...state.save, action.payload],
        articles: [...newArticles],
      };

    case "REMOVE_FROM_SAVE":
      const removeIndex = state.articles.findIndex(
        (article) => article._id === action.payload
      );
      const freshArticles = [...state.articles];
      freshArticles[removeIndex].saved = false;

      return {
        ...state,
        save: state.save.filter((item) => item._id !== action.payload),
        article: [...freshArticles],
      };

    default:
      return state;
  }
};
