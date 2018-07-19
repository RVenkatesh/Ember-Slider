# ember-slider

This slider is built as an addon for ember applications. Follow the instructions in the [demo](/#demo) section to see it in action.

## Demo

* `git clone <repository-url>` this repository
* `cd ember-slider`
* `npm install`
* `ember serve`
* Demo will be available at [http://localhost:4200](http://localhost:4200).

## Installation
```
ember install ember-slider
```
## How to use
Include the ember slider component in the template like any other normal ember component
```
{{ember-slider config=options}}
```
Add configuration options if necessary in the corresponding route's controller or component's object
```
{
    type: {
        closed: true
    },
    range: {
        min: 0,
        max: 100
    }
}
```
Refer [Configurations options](/#configuration-options) section for details about how different options available.

## Configuration options

| Option | Default | Description |
| --- | --- | --- |
| type | 'sleek' | Changes the look and feel of the slider. Currently it supports only 'sleek' and 'closed' |
| range | { min: 0, max: 100 } | This object can be used to change the min and max of the slider. This can be of following format. ```{ min: `min_value`, max: `max_value` }``` |