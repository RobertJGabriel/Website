window.robertjames = {}
header = $('.clearHeader')
navText = $('#logo1')
bannerText = $('#logo2')

robertjames.easterEgg = ->

  cheet '↑ ↑ ↓ ↓ ← → ← → b a', ->
    console.log 'hi'
    $('#easteregg').modal 'show'
    return

  return

robertjames.events = ->

  $('.menu-button').click (e) ->
    $('.menu-bar').addClass 'open'
    $('.grey').addClass 'show'
    $('.overlay').show()
    e.stopPropagation()
    return


  $(document).click (e) ->
    if !$(e.target).is('.menu-bar *,.menu-bar')
      $('.menu-bar').removeClass 'open'
      $('.grey').removeClass 'show'
      $('.overlay').hide()
    return

  return


robertjames.colors = ->

  if bannerText.length > 0
    h1Elements = document.getElementsByTagName('h1')
    hrElements = document.getElementsByTagName('hr')
    h3Elements = document.getElementsByTagName('h3')
    aTagsElements = document.getElementsByTagName('a')

  if typeof h1Elements != 'undefined'
    i = 1
    while i < h1Elements.length
      h1Elements[i].style.color = color
      i++


  if typeof h3Elements != 'undefined'
    i = 0
    while i < h3Elements.length
      h3Elements[i].style.color = color
      i++

  if typeof hrElements != 'undefined'
    i = 0
    while i < hrElements.length
      hrElements[i].style.background = color
      i++

  if typeof aTagsElements != 'undefined'
    i = 6
    while i < aTagsElements.length
      aTagsElements[i].style.color = color
      i++

  return


robertjames.init = ->

  robertjames.events()
  robertjames.easterEgg()
  robertjames.colors()
  navText.addClass 'show'
  navText.text 'Robert James Gabriel'

  return


robertjames.init() # Attach events

