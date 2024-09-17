export const renderInputColor = (wordsAttempt, index, secretWord) => {
  const letter = wordsAttempt[index];
  let secretOccurrences = secretWord.split("").reduce((acc, l) => {
    acc[l] = (acc[l] || 0) + 1;
    return acc;
  }, {});

  let colors = wordsAttempt.map(() => "bg-gray-300");

  // Première passe : identifier les lettres correctement positionnées
  wordsAttempt.forEach((attemptLetter, attemptIndex) => {
    if (attemptLetter === secretWord[attemptIndex]) {
      colors[attemptIndex] = "bg-green-200";
      secretOccurrences[attemptLetter]--;
    }
  });

  // Deuxième passe : identifier les lettres mal positionnées
  wordsAttempt.forEach((attemptLetter, attemptIndex) => {
    if (
      secretWord.includes(attemptLetter) &&
      secretOccurrences[attemptLetter] > 0 &&
      colors[attemptIndex] !== "bg-green-200"
    ) {
      colors[attemptIndex] = "bg-orange-200";
      secretOccurrences[attemptLetter]--;
    }
  });

  return colors[index];
};
