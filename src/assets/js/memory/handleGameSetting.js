import { computed, ref } from 'vue';
import _ from 'lodash'

export default function handleGameSetting(deck,attempts) {
  const newGame = ref(true);

  const startGame = () => {
    newGame.value = false;
    restartGame();
  };

  const restartGame = () => {
    attempts.value = 0;
    console.log(attempts.value);
    deck.value = _.shuffle(deck.value);

    deck.value = deck.value.map((card, index) => {
      return {
        ...card,
        matched: false,
        position: index,
        visible: false,
      };
    });
    
  };

  const status = computed(() => {
    if (remainingPairs.value === 0) {
      return "Player wins!";
    } else {
      return `Remaining Pairs: ${remainingPairs.value}`;
    }
  });

  const remainingPairs = computed(() => {
    const remainingCards = deck.value.filter(
      (card) => card.matched === false
    ).length;

    return remainingCards / 2;
  });

  return {
    remainingPairs,
    status,
    newGame,
    startGame,
    restartGame,
    attempts
  }
}