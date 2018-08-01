# ember-slider [![Build Status](https://travis-ci.org/RVenkatesh/Ember-Slider.svg?branch=master)](https://travis-ci.org/RVenkatesh/Ember-Slider) [![npm version](https://badge.fury.io/js/%40love-open-source%2Fember-slider.svg)](https://badge.fury.io/js/%40love-open-source%2Fember-slider)

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
    type: 'closed',
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
| config | ```null``` | General settings for the slider liker min & max, likert and more. Refer [Configurations options](https://github.com/RVenkatesh/Ember-slider#configuration-options) section for details about the different options available. |

##### Callback parameters

Apart the above parameters, the following are the callback function available for the slider.

| Function | Params | Description |
| --- | --- | --- |
| onChange | ```( oldValue, newValue )``` | This is called when the value of the slider changes. |

## Configuration options

| Option | Default | Description |
| --- | --- | --- |
| type | 'sleek' | Changes the look and feel of the slider. Currently it supports only 'sleek' and 'closed'. |
| range | { min: 0, max: 100 } | This object can be used to change the min and max of the slider. This can be of following format. ```{ min: `min_value`, max: `max_value` }``` |
| hideValue | false | Boolean to show or hide the display of value in the slider. ```true``` hides the value. |
| likert | {} | To enable slider as likert scale. Refer section [Likert scale options](https://github.com/RVenkatesh/Ember-Slider/tree/likert-scale-support#likert-scale-options) to know more about likert configuration. |

##### Likert scale options
The 'likert' configuration option allows the slider to function as likert scale. It can be enabled by passing the following to 'config' option 
```
{
    likert: {
        enabled: true
    }
}
```

Just enabling likert option would provide a 3-point likert scale slider with values ranging from 0 to 2. Likert scale can be customised by adding more settings inside likert. Following are the different likert config options available.

| Option | Default | Description |
| --- | --- | --- |
| enabled | false | Enable or disable likert scale |
| points | 3 | Number of likert points to be shown. As of now ```ember-slider``` supports 3, 5 and 7 points. |
| labels | [] | Label text to be displayed under each likert point of the slider. If nothing has to be displayed, pass ```null``` |


## Updating ember-slider
If you are updating one version of ember slider to other, please check out the [Release notes](https://github.com/RVenkatesh/Ember-Slider/wiki/Release-notes) page for any breaking changes (which are usually rare). 
