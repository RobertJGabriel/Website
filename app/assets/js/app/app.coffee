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
              #console.log 'Service worker installing'
            else if registration.waiting
              #console.log 'Service worker installed'
            else if registration.active
              #console.log 'Service worker active'
              #console.log registration
              #console.log 'Service Worker Registered'
              _this.subscribe registration
            return
        )(this))['catch'] (err) ->
          #console.log 'Service Worker Failed to Register', err
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





SNAKE = SNAKE or {}

###*
* @method addEventListener
* @param {Object} obj The object to add an event listener to.
* @param {String} event The event to listen for.
* @param {Function} funct The function to execute when the event is triggered.
* @param {Boolean} evtCapturing True to do event capturing, false to do event bubbling.
###

SNAKE.addEventListener = do ->
  if window.addEventListener
    return (obj, event, funct, evtCapturing) ->
      obj.addEventListener event, funct, evtCapturing
      return

  else if window.attachEvent
    return (obj, event, funct) ->
      obj.attachEvent 'on' + event, funct
      return

  return

###*
* @method removeEventListener
* @param {Object} obj The object to remove an event listener from.
* @param {String} event The event that was listened for.
* @param {Function} funct The function that was executed when the event is triggered.
* @param {Boolean} evtCapturing True if event capturing was done, false otherwise.
###

SNAKE.removeEventListener = do ->
  if window.removeEventListener
    return (obj, event, funct, evtCapturing) ->
      obj.removeEventListener event, funct, evtCapturing
      return

  else if window.detachEvent
    return (obj, event, funct) ->
      obj.detachEvent 'on' + event, funct
      return

  return

###*
* This class manages the snake which will reside inside of a SNAKE.Board object.
* @class Snake
* @constructor
* @namespace SNAKE
* @param {Object} config The configuration object for the class. Contains playingBoard (the SNAKE.Board that this snake resides in), startRow and startCol.
###

SNAKE.Snake = SNAKE.Snake or do ->
  # -------------------------------------------------------------------------
  # Private static variables and methods
  # -------------------------------------------------------------------------
  instanceNumber = 0
  blockPool = []

  SnakeBlock = ->
    @elm = null
    @elmStyle = null
    @row = -1
    @col = -1
    @xPos = -1000
    @yPos = -1000
    @next = null
    @prev = null
    return

  # -------------------------------------------------------------------------
  # Contructor + public and private definitions
  # -------------------------------------------------------------------------

  ###
      config options:
          playingBoard - the SnakeBoard that this snake belongs too.
          startRow - The row the snake should start on.
          startCol - The column the snake should start on.
  ###

  # this function is adapted from the example at http://greengeckodesign.com/blog/2007/07/get-highest-z-index-in-javascript.html

  getNextHighestZIndex = (myObj) ->
    highestIndex = 0
    currentIndex = 0
    ii = undefined
    for ii of myObj
      `ii = ii`
      if myObj[ii].elm.currentStyle
        currentIndex = parseFloat(myObj[ii].elm.style['z-index'], 10)
      else if window.getComputedStyle
        currentIndex = parseFloat(document.defaultView.getComputedStyle(myObj[ii].elm, null).getPropertyValue('z-index'), 10)
      if !isNaN(currentIndex) and currentIndex > highestIndex
        highestIndex = currentIndex
    highestIndex + 1

  (config) ->
    # ----- private methods -----

    createSnakeElement = ->
      tempNode = document.createElement('div')
      tempNode.className = 'snake-snakebody-block'
      tempNode.style.left = '-1000px'
      tempNode.style.top = '-1000px'
      tempNode.style.width = playingBoard.getBlockWidth() + 'px'
      tempNode.style.height = playingBoard.getBlockHeight() + 'px'
      tempNode

    createBlocks = (num) ->
      tempBlock = undefined
      tempNode = createSnakeElement()
      ii = 1
      while ii < num
        tempBlock = new SnakeBlock
        tempBlock.elm = tempNode.cloneNode(true)
        tempBlock.elmStyle = tempBlock.elm.style
        playingBoard.getBoardContainer().appendChild tempBlock.elm
        blockPool[blockPool.length] = tempBlock
        ii++
      tempBlock = new SnakeBlock
      tempBlock.elm = tempNode
      playingBoard.getBoardContainer().appendChild tempBlock.elm
      blockPool[blockPool.length] = tempBlock
      return

    if !config or !config.playingBoard
      return
    # ----- private variables -----
    me = this
    playingBoard = config.playingBoard
    myId = instanceNumber++
    growthIncr = 5
    moveQueue = []
    currentDirection = 1
    columnShift = [
      0
      1
      0
      -1
    ]
    rowShift = [
      -1
      0
      1
      0
    ]
    xPosShift = []
    yPosShift = []
    snakeSpeed = 75
    isDead = false
    isPaused = false
    # ----- public variables -----
    me.snakeBody = {}
    me.snakeBody['b0'] = new SnakeBlock
    # create snake head
    me.snakeBody['b0'].row = config.startRow or 1
    me.snakeBody['b0'].col = config.startCol or 1
    me.snakeBody['b0'].xPos = me.snakeBody['b0'].row * playingBoard.getBlockWidth()
    me.snakeBody['b0'].yPos = me.snakeBody['b0'].col * playingBoard.getBlockHeight()
    me.snakeBody['b0'].elm = createSnakeElement()
    me.snakeBody['b0'].elmStyle = me.snakeBody['b0'].elm.style
    playingBoard.getBoardContainer().appendChild me.snakeBody['b0'].elm
    me.snakeBody['b0'].elm.style.left = me.snakeBody['b0'].xPos + 'px'
    me.snakeBody['b0'].elm.style.top = me.snakeBody['b0'].yPos + 'px'
    me.snakeBody['b0'].next = me.snakeBody['b0']
    me.snakeBody['b0'].prev = me.snakeBody['b0']
    me.snakeLength = 1
    me.snakeHead = me.snakeBody['b0']
    me.snakeTail = me.snakeBody['b0']
    me.snakeHead.elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/, '')
    me.snakeHead.elm.className += ' snake-snakebody-alive'
    # ----- public methods -----

    me.setPaused = (val) ->
      isPaused = val
      return

    me.getPaused = ->
      isPaused

    ###*
    * This method is called when a user presses a key. It logs arrow key presses in "moveQueue", which is used when the snake needs to make its next move.
    * @method handleArrowKeys
    * @param {Number} keyNum A number representing the key that was pressed.
    ###

    ###
        Handles what happens when an arrow key is pressed.
        Direction explained (0 = up, etc etc)
                0
              3   1
                2
    ###

    me.handleArrowKeys = (keyNum) ->
      if isDead or isPaused
        return
      snakeLength = me.snakeLength
      lastMove = moveQueue[0] or currentDirection
      #console.log("lastmove="+lastMove);
      #console.log("dir="+keyNum);
      switch keyNum
        when 37, 65
          if lastMove != 1 or snakeLength == 1
            moveQueue.unshift 3
            #SnakeDirection = 3;
        when 38, 87
          if lastMove != 2 or snakeLength == 1
            moveQueue.unshift 0
            #SnakeDirection = 0;
        when 39, 68
          if lastMove != 3 or snakeLength == 1
            moveQueue.unshift 1
            #SnakeDirection = 1;
        when 40, 83
          if lastMove != 0 or snakeLength == 1
            moveQueue.unshift 2
            #SnakeDirection = 2;
      return

    ###*
    * This method is executed for each move of the snake. It determines where the snake will go and what will happen to it. This method needs to run quickly.
    * @method go
    ###

    me.go = ->
      oldHead = me.snakeHead
      newHead = me.snakeTail
      myDirection = currentDirection
      grid = playingBoard.grid
      # cache grid for quicker lookup
      if isPaused == true
        setTimeout (->
          me.go()
          return
        ), snakeSpeed
        return
      me.snakeTail = newHead.prev
      me.snakeHead = newHead
      # clear the old board position
      if grid[newHead.row] and grid[newHead.row][newHead.col]
        grid[newHead.row][newHead.col] = 0
      if moveQueue.length
        myDirection = currentDirection = moveQueue.pop()
      newHead.col = oldHead.col + columnShift[myDirection]
      newHead.row = oldHead.row + rowShift[myDirection]
      newHead.xPos = oldHead.xPos + xPosShift[myDirection]
      newHead.yPos = oldHead.yPos + yPosShift[myDirection]
      if !newHead.elmStyle
        newHead.elmStyle = newHead.elm.style
      newHead.elmStyle.left = newHead.xPos + 'px'
      newHead.elmStyle.top = newHead.yPos + 'px'
      # check the new spot the snake moved into
      if grid[newHead.row][newHead.col] == 0
        grid[newHead.row][newHead.col] = 1
        setTimeout (->
          me.go()
          return
        ), snakeSpeed
      else if grid[newHead.row][newHead.col] > 0
        me.handleDeath()
      else if grid[newHead.row][newHead.col] == playingBoard.getGridFoodValue()
        grid[newHead.row][newHead.col] = 1
        me.eatFood()
        setTimeout (->
          me.go()
          return
        ), snakeSpeed
      return

    ###*
    * This method is called when it is determined that the snake has eaten some food.
    * @method eatFood
    ###

    me.eatFood = ->
      if blockPool.length <= growthIncr
        createBlocks growthIncr * 2
      blocks = blockPool.splice(0, growthIncr)
      ii = blocks.length
      index = undefined
      prevNode = me.snakeTail
      while ii--
        index = 'b' + me.snakeLength++
        me.snakeBody[index] = blocks[ii]
        me.snakeBody[index].prev = prevNode
        me.snakeBody[index].elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/, '')
        me.snakeBody[index].elm.className += ' snake-snakebody-alive'
        prevNode.next = me.snakeBody[index]
        prevNode = me.snakeBody[index]
      me.snakeTail = me.snakeBody[index]
      me.snakeTail.next = me.snakeHead
      me.snakeHead.prev = me.snakeTail
      playingBoard.foodEaten()
      return

    ###*
    * This method handles what happens when the snake dies.
    * @method handleDeath
    ###

    me.handleDeath = ->
      me.snakeHead.elm.style.zIndex = getNextHighestZIndex(me.snakeBody)
      me.snakeHead.elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-alive\b/, '')
      me.snakeHead.elm.className += ' snake-snakebody-dead'
      isDead = true
      playingBoard.handleDeath()
      moveQueue.length = 0
      return

    ###*
    * This method sets a flag that lets the snake be alive again.
    * @method rebirth
    ###

    me.rebirth = ->
      isDead = false
      return

    ###*
    * This method reset the snake so it is ready for a new game.
    * @method reset
    ###

    me.reset = ->
      if isDead == false
        return
      blocks = []
      curNode = me.snakeHead.next
      nextNode = undefined
      while curNode != me.snakeHead
        nextNode = curNode.next
        curNode.prev = null
        curNode.next = null
        blocks.push curNode
        curNode = nextNode
      me.snakeHead.next = me.snakeHead
      me.snakeHead.prev = me.snakeHead
      me.snakeTail = me.snakeHead
      me.snakeLength = 1
      ii = 0
      while ii < blocks.length
        blocks[ii].elm.style.left = '-1000px'
        blocks[ii].elm.style.top = '-1000px'
        blocks[ii].elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/, '')
        blocks[ii].elm.className += ' snake-snakebody-alive'
        ii++
      blockPool.concat blocks
      me.snakeHead.elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/, '')
      me.snakeHead.elm.className += ' snake-snakebody-alive'
      me.snakeHead.row = config.startRow or 1
      me.snakeHead.col = config.startCol or 1
      me.snakeHead.xPos = me.snakeHead.row * playingBoard.getBlockWidth()
      me.snakeHead.yPos = me.snakeHead.col * playingBoard.getBlockHeight()
      me.snakeHead.elm.style.left = me.snakeHead.xPos + 'px'
      me.snakeHead.elm.style.top = me.snakeHead.yPos + 'px'
      return

    # ---------------------------------------------------------------------
    # Initialize
    # ---------------------------------------------------------------------
    createBlocks growthIncr * 2
    xPosShift[0] = 0
    xPosShift[1] = playingBoard.getBlockWidth()
    xPosShift[2] = 0
    xPosShift[3] = -1 * playingBoard.getBlockWidth()
    yPosShift[0] = -1 * playingBoard.getBlockHeight()
    yPosShift[1] = 0
    yPosShift[2] = playingBoard.getBlockHeight()
    yPosShift[3] = 0
    return

###*
* This class manages the food which the snake will eat.
* @class Food
* @constructor
* @namespace SNAKE
* @param {Object} config The configuration object for the class. Contains playingBoard (the SNAKE.Board that this food resides in).
###

SNAKE.Food = SNAKE.Food or do ->
  # -------------------------------------------------------------------------
  # Private static variables and methods
  # -------------------------------------------------------------------------
  instanceNumber = 0
  # -------------------------------------------------------------------------
  # Contructor + public and private definitions
  # -------------------------------------------------------------------------

  ###
      config options:
          playingBoard - the SnakeBoard that this object belongs too.
  ###

  getRandomPosition = (x, y) ->
    Math.floor(Math.random() * (y + 1 - x)) + x

  (config) ->
    if !config or !config.playingBoard
      return
    # ----- private variables -----
    me = this
    playingBoard = config.playingBoard
    fRow = undefined
    fColumn = undefined
    myId = instanceNumber++
    elmFood = document.createElement('div')
    elmFood.setAttribute 'id', 'snake-food-' + myId
    elmFood.className = 'snake-food-block'
    elmFood.style.width = playingBoard.getBlockWidth() + 'px'
    elmFood.style.height = playingBoard.getBlockHeight() + 'px'
    elmFood.style.left = '-1000px'
    elmFood.style.top = '-1000px'
    playingBoard.getBoardContainer().appendChild elmFood
    # ----- public methods -----

    ###*
    * @method getFoodElement
    * @return {DOM Element} The div the represents the food.
    ###

    me.getFoodElement = ->
      elmFood

    ###*
    * Randomly places the food onto an available location on the playing board.
    * @method randomlyPlaceFood
    ###

    me.randomlyPlaceFood = ->
      # if there exist some food, clear its presence from the board
      if playingBoard.grid[fRow] and playingBoard.grid[fRow][fColumn] == playingBoard.getGridFoodValue()
        playingBoard.grid[fRow][fColumn] = 0
      row = 0
      col = 0
      numTries = 0
      maxRows = playingBoard.grid.length - 1
      maxCols = playingBoard.grid[0].length - 1
      while playingBoard.grid[row][col] != 0
        row = getRandomPosition(1, maxRows)
        col = getRandomPosition(1, maxCols)
        # in some cases there may not be any room to put food anywhere
        # instead of freezing, exit out
        numTries++
        if numTries > 20000
          row = -1
          col = -1
          break
      playingBoard.grid[row][col] = playingBoard.getGridFoodValue()
      fRow = row
      fColumn = col
      elmFood.style.top = row * playingBoard.getBlockHeight() + 'px'
      elmFood.style.left = col * playingBoard.getBlockWidth() + 'px'
      return

    return

###*
* This class manages playing board for the game.
* @class Board
* @constructor
* @namespace SNAKE
* @param {Object} config The configuration object for the class. Set fullScreen equal to true if you want the game to take up the full screen, otherwise, set the top, left, width and height parameters.
###

SNAKE.Board = SNAKE.Board or do ->
  # -------------------------------------------------------------------------
  # Private static variables and methods
  # -------------------------------------------------------------------------
  instanceNumber = 0
  # -------------------------------------------------------------------------
  # Contructor + public and private definitions
  # -------------------------------------------------------------------------
  # this function is adapted from the example at http://greengeckodesign.com/blog/2007/07/get-highest-z-index-in-javascript.html

  getNextHighestZIndex = (myObj) ->
    highestIndex = 0
    currentIndex = 0
    ii = undefined
    for ii of myObj
      `ii = ii`
      if myObj[ii].elm.currentStyle
        currentIndex = parseFloat(myObj[ii].elm.style['z-index'], 10)
      else if window.getComputedStyle
        currentIndex = parseFloat(document.defaultView.getComputedStyle(myObj[ii].elm, null).getPropertyValue('z-index'), 10)
      if !isNaN(currentIndex) and currentIndex > highestIndex
        highestIndex = currentIndex
    highestIndex + 1

  ###
      This function returns the width of the available screen real estate that we have
  ###

  getClientWidth = ->
    myWidth = 0
    if typeof window.innerWidth == 'number'
      myWidth = window.innerWidth
      #Non-IE
    else if document.documentElement and (document.documentElement.clientWidth or document.documentElement.clientHeight)
      myWidth = document.documentElement.clientWidth
      #IE 6+ in 'standards compliant mode'
    else if document.body and (document.body.clientWidth or document.body.clientHeight)
      myWidth = document.body.clientWidth
      #IE 4 compatible
    myWidth

  ###
      This function returns the height of the available screen real estate that we have
  ###

  getClientHeight = ->
    myHeight = 0
    if typeof window.innerHeight == 'number'
      myHeight = window.innerHeight
      #Non-IE
    else if document.documentElement and (document.documentElement.clientWidth or document.documentElement.clientHeight)
      myHeight = document.documentElement.clientHeight
      #IE 6+ in 'standards compliant mode'
    else if document.body and (document.body.clientWidth or document.body.clientHeight)
      myHeight = document.body.clientHeight
      #IE 4 compatible
    myHeight

  (inputConfig) ->
    # --- private variables ---
    me = this
    myId = instanceNumber++
    config = inputConfig or {}
    MAX_BOARD_COLS = 250
    MAX_BOARD_ROWS = 250
    blockWidth = 20
    blockHeight = 20
    GRID_FOOD_VALUE = -1
    myFood = undefined
    mySnake = undefined
    boardState = 1
    myKeyListener = undefined
    isPaused = false
    elmContainer = undefined
    elmPlayingField = undefined
    elmAboutPanel = undefined
    elmLengthPanel = undefined
    elmWelcome = undefined
    elmTryAgain = undefined
    elmPauseScreen = undefined
    # --- public variables ---
    # ---------------------------------------------------------------------
    # private functions
    # ---------------------------------------------------------------------

    createBoardElements = ->
      elmPlayingField = document.createElement('div')
      elmPlayingField.setAttribute 'id', 'playingField'
      elmPlayingField.className = 'snake-playing-field'
      SNAKE.addEventListener elmPlayingField, 'click', (->
        elmContainer.focus()
        return
      ), false
      elmPauseScreen = document.createElement('div')
      elmPauseScreen.className = 'snake-pause-screen'
      elmPauseScreen.innerHTML = '<div style=\'padding:10px;\'>[Paused]<p/>Press [space] to unpause.</div>'
      elmAboutPanel = document.createElement('div')
      elmAboutPanel.className = 'snake-panel-component'
      elmAboutPanel.innerHTML = '<a href=\'http://patorjk.com/blog/software/\' class=\'snake-link\'>more apps</a> - <a href=\'https://github.com/patorjk/JavaScript-Snake\' class=\'snake-link\'>source code</a> - <a href=\'https://www.instagram.com/patorjk/\' class=\'snake-link\'>follow me on instagram!</a>'
      elmLengthPanel = document.createElement('div')
      elmLengthPanel.className = 'snake-panel-component'
      elmLengthPanel.innerHTML = 'Length: 1'
      elmWelcome = createWelcomeElement()
      elmTryAgain = createTryAgainElement()
      SNAKE.addEventListener elmContainer, 'keyup', ((evt) ->
        `var evt`
        if !evt
          evt = window.event
        evt.cancelBubble = true
        if evt.stopPropagation
          evt.stopPropagation()
        if evt.preventDefault
          evt.preventDefault()
        false
      ), false
      elmContainer.className = 'snake-game-container'
      elmPauseScreen.style.zIndex = 10000
      elmContainer.appendChild elmPauseScreen
      elmContainer.appendChild elmPlayingField
      elmContainer.appendChild elmAboutPanel
      elmContainer.appendChild elmLengthPanel
      elmContainer.appendChild elmWelcome
      elmContainer.appendChild elmTryAgain
      mySnake = new (SNAKE.Snake)(
        playingBoard: me
        startRow: 2
        startCol: 2)
      myFood = new (SNAKE.Food)(playingBoard: me)
      elmWelcome.style.zIndex = 1000
      return

    maxBoardWidth = ->
      MAX_BOARD_COLS * me.getBlockWidth()

    maxBoardHeight = ->
      MAX_BOARD_ROWS * me.getBlockHeight()

    createWelcomeElement = ->
      tmpElm = document.createElement('div')
      tmpElm.id = 'sbWelcome' + myId
      tmpElm.className = 'snake-welcome-dialog'
      welcomeTxt = document.createElement('div')
      fullScreenText = ''
      if config.fullScreen
        fullScreenText = 'On Windows, press F11 to play in Full Screen mode.'
      welcomeTxt.innerHTML = 'JavaScript Snake<p></p>Use the <strong>arrow keys</strong> on your keyboard to play the game. ' + fullScreenText + '<p></p>'
      welcomeStart = document.createElement('button')
      welcomeStart.appendChild document.createTextNode('Play Game')

      loadGame = ->
        SNAKE.removeEventListener window, 'keyup', kbShortcut, false
        tmpElm.style.display = 'none'
        me.setBoardState 1
        me.getBoardContainer().focus()
        return

      kbShortcut = (evt) ->
        `var evt`
        if !evt
          evt = window.event
        keyNum = if evt.which then evt.which else evt.keyCode
        if keyNum == 32 or keyNum == 13
          loadGame()
        return

      SNAKE.addEventListener window, 'keyup', kbShortcut, false
      SNAKE.addEventListener welcomeStart, 'click', loadGame, false
      tmpElm.appendChild welcomeTxt
      tmpElm.appendChild welcomeStart
      tmpElm

    createTryAgainElement = ->
      tmpElm = document.createElement('div')
      tmpElm.id = 'sbTryAgain' + myId
      tmpElm.className = 'snake-try-again-dialog'
      tryAgainTxt = document.createElement('div')
      tryAgainTxt.innerHTML = 'JavaScript Snake<p></p>You died :(.<p></p>'
      tryAgainStart = document.createElement('button')
      tryAgainStart.appendChild document.createTextNode('Play Again?')

      reloadGame = ->
        tmpElm.style.display = 'none'
        me.resetBoard()
        me.setBoardState 1
        me.getBoardContainer().focus()
        return

      kbTryAgainShortcut = (evt) ->
        `var evt`
        if boardState != 0 or tmpElm.style.display != 'block'
          return
        if !evt
          evt = window.event
        keyNum = if evt.which then evt.which else evt.keyCode
        if keyNum == 32 or keyNum == 13
          reloadGame()
        return

      SNAKE.addEventListener window, 'keyup', kbTryAgainShortcut, true
      SNAKE.addEventListener tryAgainStart, 'click', reloadGame, false
      tmpElm.appendChild tryAgainTxt
      tmpElm.appendChild tryAgainStart
      tmpElm

    me.grid = []
    # ---------------------------------------------------------------------
    # public functions
    # ---------------------------------------------------------------------

    me.setPaused = (val) ->
      isPaused = val
      mySnake.setPaused val
      if isPaused
        elmPauseScreen.style.display = 'block'
      else
        elmPauseScreen.style.display = 'none'
      return

    me.getPaused = ->
      isPaused

    ###*
    * Resets the playing board for a new game.
    * @method resetBoard
    ###

    me.resetBoard = ->
      SNAKE.removeEventListener elmContainer, 'keydown', myKeyListener, false
      mySnake.reset()
      elmLengthPanel.innerHTML = 'Length: 1'
      me.setupPlayingField()
      return

    ###*
    * Gets the current state of the playing board. There are 3 states: 0 - Welcome or Try Again dialog is present. 1 - User has pressed "Start Game" on the Welcome or Try Again dialog but has not pressed an arrow key to move the snake. 2 - The game is in progress and the snake is moving.
    * @method getBoardState
    * @return {Number} The state of the board.
    ###

    me.getBoardState = ->
      boardState

    ###*
    * Sets the current state of the playing board. There are 3 states: 0 - Welcome or Try Again dialog is present. 1 - User has pressed "Start Game" on the Welcome or Try Again dialog but has not pressed an arrow key to move the snake. 2 - The game is in progress and the snake is moving.
    * @method setBoardState
    * @param {Number} state The state of the board.
    ###

    me.setBoardState = (state) ->
      boardState = state
      return

    ###*
    * @method getGridFoodValue
    * @return {Number} A number that represents food on a number representation of the playing board.
    ###

    me.getGridFoodValue = ->
      GRID_FOOD_VALUE

    ###*
    * @method getPlayingFieldElement
    * @return {DOM Element} The div representing the playing field (this is where the snake can move).
    ###

    me.getPlayingFieldElement = ->
      elmPlayingField

    ###*
    * @method setBoardContainer
    * @param {DOM Element or String} myContainer Sets the container element for the game.
    ###

    me.setBoardContainer = (myContainer) ->
      if typeof myContainer == 'string'
        myContainer = document.getElementById(myContainer)
      if myContainer == elmContainer
        return
      elmContainer = myContainer
      elmPlayingField = null
      me.setupPlayingField()
      return

    ###*
    * @method getBoardContainer
    * @return {DOM Element}
    ###

    me.getBoardContainer = ->
      elmContainer

    ###*
    * @method getBlockWidth
    * @return {Number}
    ###

    me.getBlockWidth = ->
      blockWidth

    ###*
    * @method getBlockHeight
    * @return {Number}
    ###

    me.getBlockHeight = ->
      blockHeight

    ###*
    * Sets up the playing field.
    * @method setupPlayingField
    ###

    me.setupPlayingField = ->
      if !elmPlayingField
        createBoardElements()
      # create playing field
      # calculate width of our game container
      cWidth = undefined
      cHeight = undefined
      if config.fullScreen == true
        cTop = 0
        cLeft = 0
        cWidth = getClientWidth() - 5
        cHeight = getClientHeight() - 5
        document.body.style.backgroundColor = '#FC5454'
      else
        cTop = config.top
        cLeft = config.left
        cWidth = config.width
        cHeight = config.height
      # define the dimensions of the board and playing field
      wEdgeSpace = me.getBlockWidth() * 2 + cWidth % me.getBlockWidth()
      fWidth = Math.min(maxBoardWidth() - wEdgeSpace, cWidth - wEdgeSpace)
      hEdgeSpace = me.getBlockHeight() * 3 + cHeight % me.getBlockHeight()
      fHeight = Math.min(maxBoardHeight() - hEdgeSpace, cHeight - hEdgeSpace)
      elmContainer.style.left = cLeft + 'px'
      elmContainer.style.top = cTop + 'px'
      elmContainer.style.width = cWidth + 'px'
      elmContainer.style.height = cHeight + 'px'
      elmPlayingField.style.left = me.getBlockWidth() + 'px'
      elmPlayingField.style.top = me.getBlockHeight() + 'px'
      elmPlayingField.style.width = fWidth + 'px'
      elmPlayingField.style.height = fHeight + 'px'
      # the math for this will need to change depending on font size, padding, etc
      # assuming height of 14 (font size) + 8 (padding)
      bottomPanelHeight = hEdgeSpace - me.getBlockHeight()
      pLabelTop = me.getBlockHeight() + fHeight + Math.round((bottomPanelHeight - 30) / 2) + 'px'
      elmAboutPanel.style.top = pLabelTop
      elmAboutPanel.style.width = '450px'
      elmAboutPanel.style.left = Math.round(cWidth / 2) - Math.round(450 / 2) + 'px'
      elmLengthPanel.style.top = pLabelTop
      elmLengthPanel.style.left = cWidth - 120 + 'px'
      # if width is too narrow, hide the about panel
      if cWidth < 700
        elmAboutPanel.style.display = 'none'
      else
        elmAboutPanel.style.display = 'block'
      me.grid = []
      numBoardCols = fWidth / me.getBlockWidth() + 2
      numBoardRows = fHeight / me.getBlockHeight() + 2
      row = 0
      while row < numBoardRows
        me.grid[row] = []
        col = 0
        while col < numBoardCols
          if col == 0 or row == 0 or col == numBoardCols - 1 or row == numBoardRows - 1
            me.grid[row][col] = 1
            # an edge
          else
            me.grid[row][col] = 0
            # empty space
          col++
        row++
      myFood.randomlyPlaceFood()
      # setup event listeners

      myKeyListener = (evt) ->
        `var evt`
        if !evt
          evt = window.event
        keyNum = if evt.which then evt.which else evt.keyCode
        if me.getBoardState() == 1
          if !(keyNum >= 37 and keyNum <= 40) and !(keyNum == 87 or keyNum == 65 or keyNum == 83 or keyNum == 68)
            return
          # if not an arrow key, leave
          # This removes the listener added at the #listenerX line
          SNAKE.removeEventListener elmContainer, 'keydown', myKeyListener, false

          myKeyListener = (evt) ->
            `var evt`
            `var keyNum`
            if !evt
              evt = window.event
            keyNum = if evt.which then evt.which else evt.keyCode
            #console.log(keyNum);
            if keyNum == 32 and me.getBoardState() != 0
              me.setPaused !me.getPaused()
            mySnake.handleArrowKeys keyNum
            evt.cancelBubble = true
            if evt.stopPropagation
              evt.stopPropagation()
            if evt.preventDefault
              evt.preventDefault()
            false

          SNAKE.addEventListener elmContainer, 'keydown', myKeyListener, false
          mySnake.rebirth()
          mySnake.handleArrowKeys keyNum
          me.setBoardState 2
          # start the game!
          mySnake.go()
        evt.cancelBubble = true
        if evt.stopPropagation
          evt.stopPropagation()
        if evt.preventDefault
          evt.preventDefault()
        false

      # Search for #listenerX to see where this is removed
      SNAKE.addEventListener elmContainer, 'keydown', myKeyListener, false
      return

    ###*
    * This method is called when the snake has eaten some food.
    * @method foodEaten
    ###

    me.foodEaten = ->
      elmLengthPanel.innerHTML = 'Length: ' + mySnake.snakeLength
      myFood.randomlyPlaceFood()
      return

    ###*
    * This method is called when the snake dies.
    * @method handleDeath
    ###

    me.handleDeath = ->
      index = Math.max(getNextHighestZIndex(mySnake.snakeBody), getNextHighestZIndex(tmp: elm: myFood.getFoodElement()))
      elmContainer.removeChild elmTryAgain
      elmContainer.appendChild elmTryAgain
      elmTryAgain.style.zIndex = index
      elmTryAgain.style.display = 'block'
      me.setBoardState 0
      return

    # ---------------------------------------------------------------------
    # Initialize
    # ---------------------------------------------------------------------
    config.fullScreen = if typeof config.fullScreen == 'undefined' then false else config.fullScreen
    config.top = if typeof config.top == 'undefined' then 0 else config.top
    config.left = if typeof config.left == 'undefined' then 0 else config.left
    config.width = if typeof config.width == 'undefined' then 400 else config.width
    config.height = if typeof config.height == 'undefined' then 400 else config.height
    if config.fullScreen
      SNAKE.addEventListener window, 'resize', (->
        me.setupPlayingField()
        return
      ), false
    me.setBoardState 0
    if config.boardContainer
      me.setBoardContainer config.boardContainer
    return
  # end return function







if window.addEventListener
  window.addEventListener 'load', autorun, false
else if window.attachEvent
  window.attachEvent 'onload', autorun
else
  window.onload = autorun


do ->
  WebP = new Image
  WebP.onload =
  WebP.onerror = ->
    if WebP.height != 2
      sc = document.createElement('script')
      sc.type = 'text/javascript'
      sc.async = true
      s = document.getElementsByTagName('script')[0]
      sc.src = 'assets/js/webpjs.min.js'
      s.parentNode.insertBefore sc, s
    return

  WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  return
