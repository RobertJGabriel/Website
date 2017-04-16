
window.app = {}



app.convert = (a,b,c) ->
  answer = a + b * c
  return answer

app.batman = () ->
  answer = "is the best"
  return answer


console.log app.convert 1,2,2
console.log app.batman 1,2,2

