# Making this responsive

- Keep track of where the text-row is for the letters to find the right spot.
- Keep the ascii face sized right no matter the screen size.


Keep the AsciiFace centered on the screen and resize it according to the screen size.

- Doing it all with CSS
- Using percents
- Using offsetTop and offsetLeft for pixel-perfect animations

Since the AsciiFace is composed entirely of text, the way we resize it is by adjusting :
- ```font-size```
- ```line-height```
- using Calc() in CSS with view width
- using REMs
