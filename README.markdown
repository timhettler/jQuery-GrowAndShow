# jQuery - GrowAndShow

A jQuery plug-in that opens a container then fades in a selected element. It's a custom animation that's easier to show than tell, so just check out the demo.

## Demo

[http://timhettler.github.io/jQuery-GrowAndShow/demo/demo.html](http://timhettler.github.io/jQuery-GrowAndShow/demo/demo.html)

## Getting Started

### Bower Install

 ```
 bower install jQuery-GrowAndShow
 ```

### Usage

To start the animation, invoke the method on the parent container:

```javascript
$('.parent')
    .growAndShow();
```

This will reveal the first child of the parent node.

### Options

The following parameters can be passed:

**selector**: String | default: **':first-child'**

The element (relative to the parent node) to be revealed.

**speed**: Integer | default: **200**

The speed of each piece of the animation (in milliseconds). **Note:** The entire animation will be 2 or 3 times as long (child a fade-out, parent resize, child b fade-in)

**action**: String | default: **'toggle'**

The action to take on the selected element. **Available options:** 'open', 'close', 'toggle'.

**callback**: Function

A function to call once the animation is complete.

## Requirements

This plug-in requires jQuery 1.4.2 or higher. It has been tested with jQuery 2.0.3.