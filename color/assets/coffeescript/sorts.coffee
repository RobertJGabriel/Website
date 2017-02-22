

#Used for small to medium array datasets
bubbleSort = (unsortedList) ->
  loop
    swapped = false
    i = 0
    while i < unsortedList.length - 1
      if unsortedList[i] > unsortedList[i + 1]
        temp = unsortedList[i]
        unsortedList[i] = unsortedList[i + 1]
        unsortedList[i + 1] = temp
        swapped = true
      i++
    unless swapped
      break
  return unsortedList
    


#Used for small to medium array datasets
insertionSort = (unsortedList) ->
  len = unsortedList.length
  i = 0
  while i < len
    tmp = unsortedList[i]
    #Copy of the current element. 

    #Check through the sorted part and compare with the number in tmp. 
    #If large, shift the number

    j = i - 1
    while j >= 0 and unsortedList[j] > tmp
      #Shift the number
      unsortedList[j + 1] = unsortedList[j]
      j--
    #Insert the copied number at the correct position
    #in sorted part. 
    unsortedList[j + 1] = tmp
    i++
  return unsortedList

       
    
selectionSort = (array) ->
  i = 0
  while i < array.length
    #set min to the current iteration of n (i in this case)
    min = i
    j = i + 1
    while j < array.length
      if array[j] < array[min]
        min = j
      j++
    temp = array[i]
    array[i] = array[min]
    array[min] = temp
    i++
  return array
    
binarySearch = (array, target) ->
  startIndex = 0
  stopIndex = array.length - 1
  middle = undefined
  count = 0
  while startIndex < stopIndex
    count++
    middle = ~ ~((stopIndex + startIndex) / 2)
    # adjust search area
    if target < array[middle]
      stopIndex = middle - 1
    else if target > array[middle]
      startIndex = middle + 1
    else
      break
  if array[middle] == target then return middle else return -1
  
  
binarySearch_event = () ->
  sort = document.getElementById("inputBi").value.split ''
  document.getElementById("selectionResult").value = selectionSort sort
  return    
  
selection_event = () ->
  sort = document.getElementById("inputSelection").value.split ''
  document.getElementById("selectionResult").value = selectionSort sort
  return    
    
    
    
insertion_event = () ->
  sort = document.getElementById("inputInsertion").value.split ''
  document.getElementById("insertionResult").value = insertionSort sort
  return
    
    
    
bubble_event = () ->
  sort = document.getElementById("inputBubble").value.split ''
  document.getElementById("bubbleResult").value = bubbleSort sort
  return