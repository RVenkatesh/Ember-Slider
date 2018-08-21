# ember-slider [![Build Status](https://travis-ci.org/RVenkatesh/Ember-Slider.svg?branch=master)](https://travis-ci.org/RVenkatesh/Ember-Slider) [![npm version](https://badge.fury.io/js/%40love-open-source%2Fember-slider.svg)](https://badge.fury.io/js/%40love-open-source%2Fember-slider)

This slider is built as an addon for ember applications. This also supports [likert scale](https://en.wikipedia.org/wiki/Likert_scale). Follow the instructions in the [demo](https://github.com/RVenkatesh/Ember-slider#demo) section to see it in action.

## Screenshots
##### Basic slider
![Basic slider](screenshots/slider.png)
##### Likert scale slider
![Likert scale slider](screenshots/likert-slider.png)
## Demo

The demo for this addon is available at https://rvenkatesh.github.io/Ember-Slider/

or alternatively you can also clone the repository and run it locally by following the below instructions

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
Note: This addon uses [compass](http://compass-style.org/) for compiling the styles. If you are not using it already, please follow [this link](http://compass-style.org/install/) to install it before installing addon.
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

The component provides different parameters as mentioned below. These can be used as ```{{ember-slider initialValue=50 config=options onChange=(action 'onChangeAction')}}```

| Params | Default value | Description |
| --- | --- | --- |
| initialValue | ```0``` | To load the slider with value other than min value. |
| config | ```null``` | General settings for the slider like range, likert and more. Refer [Configurations options](https://github.com/RVenkatesh/Ember-slider#configuration-options) section for details about the different options available. |

##### Callback parameters

Apart from the above parameters, following are the callbacks provided by the addon.

| Function | Params | Description |
| --- | --- | --- |
| onChange | ```( oldValue, newValue )``` | This is called when the value of the slider changes. |

## Options under _'config'_ options

These are the different options available under 'config' parameter of the slider.

| Option | Default value | Description |
| --- | --- | --- |
| type | 'sleek' | Changes the look and feel of the slider. Currently it supports only 'sleek' and 'closed'. |
| range | { min: 0, max: 100 } | This object can be used to change the min and max of the slider. This can be of following format. ```{ min: `min_value`, max: `max_value` }``` |
| hideValue | false | Boolean to show or hide the value of the slider. ```true``` hides the value. |
| likert | {} | Settings for likert scale. Refer section [Likert scale options](https://github.com/RVenkatesh/Ember-Slider#likert-scale-options) to know more about likert configuration. |

##### Likert scale options

The 'likert' property under config option provides the settings for likert scale. Likert scale can be enabled by passing the following to 'config' parameter of the slider 
```
{
    likert: {
        enabled: true
    }
}
```

Just enabling likert scale would provide a 3-point likert scale slider with values ranging from 0 to 2. It can be customised by the following configuration options available.

| Option | Default | Description |
| --- | --- | --- |
| enabled | false | Enable or disable likert scale |
| points | 3 | Number of likert points to be shown. As of now ```ember-slider``` supports 3, 5 and 7 points. |
| labels | [] | Label text to be displayed under each likert point of the slider. If nothing has to be displayed, pass ```null``` |


## Updating ember-slider
If you are updating one version of ember slider to other, please check out the [Release notes](https://github.com/RVenkatesh/Ember-Slider/wiki/Release-notes) page for any breaking changes (which are usually rare). 
