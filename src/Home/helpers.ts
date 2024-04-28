export const shuffleArray = (array: string[]) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  // let's always put time as the first index
  const timeIndex = array.findIndex((value) => {
    if (value === 'time') {
      return true;
    }
    return false;
  });
  const itemToSwitchWithTime = array[0];
  array[0] = 'time';
  array[timeIndex] = itemToSwitchWithTime;
}