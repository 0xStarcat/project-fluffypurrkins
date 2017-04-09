the ```updateDimensions``` function

vs

using ```state```

The ```updateDimensions``` function takes the window width and heightOffset and resizes various styles inside the ```code``` accordingly.

The whole point of this is to keep the AsciiFace centered on the screen and resize it according to the screen size.

Setting the inline style of text-box
- using percents for position, offsetTop/offsetLeft for pixel perfect aiming.
- ```position: absolute```
- ```top```
- ```left```

Since the AsciiFace is composed entirely of text, the way we resize it is by adjusting :
- ```font-size```
- ```line-height```
