# ember-slider

This slider is built as an addon for ember applications. Follow the instructions in the [demo](https://github.com/RVenkatesh/Ember-slider#demo) section to see it in action.

## Demo

* `git clone <repository-url>` this repository
* `cd ember-slider`
* `npm install`
* `ember serve`
* Demo will be available at [http://localhost:4200](http://localhost:4200).

## Installation
```
npm install @love-open-source/ember-slider --save
```
or
```
ember install @love-open-source/ember-slider
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
Refer [Configurations options](https://github.com/RVenkatesh/Ember-slider#configuration-options) section for details about the different options available.

## Parameters

The component provides different parameters as mentioned below.

| Params | Default value | Description |
| --- | --- | --- |
| initialValue | ```0``` | To load the slider with value other than min value. |
| config | ```null``` | General settings for the slider. Refer [Configurations options](https://github.com/RVenkatesh/Ember-slider#configuration-options) section for details about the different options available. |

##### Callback parameters

Apart the above parameters, the following are the callback function available for the slider.

| Function | Params | Description |
| --- | --- | --- |
| onChange | ```( oldValue, newValue )``` | This is called when the value of the slider changes. |

## Configuration options

| Option | Default | Description |
| --- | --- | --- |
| type | 'sleek' | Changes the look and feel of the slider. Currently it supports only 'sleek' and 'closed' |
| range | { min: 0, max: 100 } | This object can be used to change the min and max of the slider. This can be of following format. ```{ min: `min_value`, max: `max_value` }``` |
| noValue | false | Boolean to show or hide the display of value in the slider. ```true``` hides the value. |
