var bubbleSort, bubble_event, insertionSort, insertion_event, selectionSort, selection_event;

bubbleSort = function(unsortedList) {
  var i, swapped, temp;
  while (true) {
    swapped = false;
    i = 0;
    while (i < unsortedList.length - 1) {
      if (unsortedList[i] > unsortedList[i + 1]) {
        temp = unsortedList[i];
        unsortedList[i] = unsortedList[i + 1];
        unsortedList[i + 1] = temp;
        swapped = true;
      }
      i++;
    }
    if (!swapped) {
      break;
    }
  }
  return unsortedList;
};

insertionSort = function(unsortedList) {
  var i, j, len, tmp;
  len = unsortedList.length;
  i = 0;
  while (i < len) {
    tmp = unsortedList[i];
    j = i - 1;
    while (j >= 0 && unsortedList[j] > tmp) {
      unsortedList[j + 1] = unsortedList[j];
      j--;
    }
    unsortedList[j + 1] = tmp;
    i++;
  }
  return unsortedList;
};

selectionSort = function(array) {
  var i, j, min, temp;
  i = 0;
  while (i < array.length) {
    min = i;
    j = i + 1;
    while (j < array.length) {
      if (array[j] < array[min]) {
        min = j;
      }
      j++;
    }
    temp = array[i];
    array[i] = array[min];
    array[min] = temp;
    i++;
  }
  return array;
};

selection_event = function() {
  var sort;
  sort = document.getElementById("inputSelection").value.split('');
  document.getElementById("selectionResult").value = selectionSort(sort);
};

insertion_event = function() {
  var sort;
  sort = document.getElementById("inputInsertion").value.split('');
  document.getElementById("insertionResult").value = insertionSort(sort);
};

bubble_event = function() {
  var sort;
  sort = document.getElementById("inputBubble").value.split('');
  document.getElementById("bubbleResult").value = bubbleSort(sort);
};
