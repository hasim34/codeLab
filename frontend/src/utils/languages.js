export const languageMap = {
  'Python': 71,
  'C': 50,
  'C++': 54,
  'Java': 62,
  'JavaScript': 63,
  'Ruby': 72,
  'Go': 60,
  'Rust': 73
};

export const getLanguageId = (languageName) => {
  return languageMap[languageName];
};