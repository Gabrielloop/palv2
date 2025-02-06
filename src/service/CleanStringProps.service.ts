// Clean a string from special characters
export const cleanAString = (string: string) => {
    try {
        return string.replace(/[^a-zA-Z0-9 ]/g, "").trim();
    } catch (error) {
      console.error(error);
    }
  };
// Remove (content in brackets) from a string
export const removeContentInBrackets = (string: string) => {
    try {
        return string.replace(/\(.*?\)/g, "").trim();
    } catch (error) {
      console.error(error);
    }
  };
// Remove all after a / in a string
export const removeAfterSlash = (string: string) => {
    try {
        return string.split(" /")[0].trim();
    } catch (error) {
      console.error(error);
    }
  };
// Remove all after a ; in a string
export const removeAfterSemicolon = (string: string) => {
    try {
        return string.split(" ;")[0].trim();
    } catch (error) {
      console.error(error);
    }
  };
  // Remove all after the first ( in a string
export const removeAfterFirstParentheses = (string: string) => {
    try {
        return string.split(" (")[0].trim();
    } catch (error) {
      console.error(error);
    }
  };

  // Clean title from BNF API
export const cleanTitle = (title: string) => {
    try {
        const titleWithoutSlash = removeAfterSlash(title) || title;
        const titleWithoutSemicolon = removeAfterSemicolon(titleWithoutSlash) || titleWithoutSlash;
        return removeContentInBrackets(titleWithoutSemicolon);
    } catch (error) {
      console.error(error);
    }
  };

    // Clean creator name from BNF API
export const cleanCreatorName = (creator: string) => {
    try {
        const cleanedCreator = creator.replace(/. Auteur du texte/g, "").trim();
        return removeAfterFirstParentheses(cleanedCreator);
    } catch (error) {
      console.error(error);
    }
  }