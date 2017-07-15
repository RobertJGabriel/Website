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
      #h1Elements[i].style.color = color
      i++


  if typeof h3Elements != 'undefined'
    i = 0
    while i < h3Elements.length
      #h3Elements[i].style.color = color
      i++

  if typeof hrElements != 'undefined'
    i = 0
    while i < hrElements.length
      #hrElements[i].style.background = color
      i++

  if typeof aTagsElements != 'undefined'
    i = 6
    while i < aTagsElements.length
      #aTagsElements[i].style.color = color
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


autorun = ->
  ServiceWorker = undefined
  ServiceWorker = do ->
    `var ServiceWorker`

    ServiceWorker = ->
      if 'serviceWorker' of navigator
        navigator.serviceWorker.register('./serviceWorker.js').then(((_this) ->
          (registration) ->
            if registration.installing
              console.log 'Service worker installing'
            else if registration.waiting
              console.log 'Service worker installed'
            else if registration.active
              console.log 'Service worker active'
              console.log registration
              console.log 'Service Worker Registered'
              _this.subscribe registration
            return
        )(this))['catch'] (err) ->
          console.log 'Service Worker Failed to Register', err
          return
      return

    ServiceWorker::unsubscribe = (serviceWorkerReg) ->
      if 'serviceWorker' of navigator
        serviceWorkerReg.pushManager.getSubscription().then (subscription) ->
          subscription.unsubscribe()
          return
      return

    ServiceWorker::subscribe = (serviceWorkerReg) ->
      if 'serviceWorker' of navigator
        serviceWorkerReg.pushManager.subscribe(userVisibleOnly: true).then (subscription) ->
        return
      return

    ServiceWorker
  new ServiceWorker

if window.addEventListener
  window.addEventListener 'load', autorun, false
else if window.attachEvent
  window.attachEvent 'onload', autorun
else
  window.onload = autorun
