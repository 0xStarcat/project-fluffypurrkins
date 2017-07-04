# Prepping the ASCII for DOM manipulation



Basically, the ASCII is just a big wall of text. To do cool stuff with it, we need to prepare it for DOM manipulation by wrapping the right parts of it with the right HTML elements.

The obvious thing to do here would be to hard code in all the HTML elements. That's perfectly fine and safe. But we don't like safe here! We like things to be dynamic and wild and random!

What we have are two main bits of text:
1. The huge ASCII text
2. The sentence text

What we want to do is combine the two in a couple of interesting ways.
1. Break the sentence apart and randomly replace characters in the ASCII text with all the letters in the sentence.
2. Create an invisible element that contains the entire sentence so that we can do stuff with it after all the letters have done their cool animation stuff. 

So what these functions do are:

1. Replaces random characters in the ASCII with the letters in the sentence.
2. Wraps entire rows of the ASCII in <spans> with a class name of 'ascii-band'
3. Wraps the letters in different <spans> with a class name of 'ascii-letter'
4. Adds the sentence to the page invisibly and wraps each letter with a <span> and class name of 'sentence-letter'
