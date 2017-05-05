colors = new Array([62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0])

step = 0
#color table indices for:
# current color left
# next color left
# current color right
# next color right
colorIndices = [0, 1, 2, 3]
#transition speed
gradientSpeed = 0.002

updateGradient = ->
  if $ == undefined
    return
  c0_0 = colors[colorIndices[0]]
  c0_1 = colors[colorIndices[1]]
  c1_0 = colors[colorIndices[2]]
  c1_1 = colors[colorIndices[3]]
  istep = 1 - step
  r1 = Math.round(istep * c0_0[0] + step * c0_1[0])
  g1 = Math.round(istep * c0_0[1] + step * c0_1[1])
  b1 = Math.round(istep * c0_0[2] + step * c0_1[2])
  color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')'
  r2 = Math.round(istep * c1_0[0] + step * c1_1[0])
  g2 = Math.round(istep * c1_0[1] + step * c1_1[1])
  b2 = Math.round(istep * c1_0[2] + step * c1_1[2])
  color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')'
  $('#navBarId').css(background: '-webkit-gradient(linear, left top, right top, from(' + color1 + '), to(' + color2 + '))').css background: '-moz-linear-gradient(left, ' + color1 + ' 0%, ' + color2 + ' 100%)'

  step += gradientSpeed
  if step >= 1
    step %= 1
    colorIndices[0] = colorIndices[1]
    colorIndices[2] = colorIndices[3]
    #pick two new target color indices
    #do not pick the same as the current one
    colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length
    colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length
  return

setInterval updateGradient, 10
