# ember-slider [![Build Status](https://travis-ci.org/RVenkatesh/Ember-Slider.svg?branch=master)](https://travis-ci.org/RVenkatesh/Ember-Slider) [![npm version](https://badge.fury.io/js/%40love-open-source%2Fember-slider.svg)](https://badge.fury.io/js/%40love-open-source%2Fember-slider)[![Rate on Openbase](https://badges.openbase.io/js/rating/@love-open-source/ember-slider.svg)](https://openbase.io/js/@love-open-source/ember-slider?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)

This slider is built as an addon for ember applications. This also supports [likert scale](https://en.wikipedia.org/wiki/Likert_scale). Follow the instructions in the [demo](https://github.com/RVenkatesh/Ember-slider#demo) section to see it in action.

## Screenshots
##### Basic slider

| type="closed" | type="sleek" |
| --- | --- |
| ![Basic slider](https://rvenkatesh.github.io/Ember-Slider/screenshots/slider.png) | ![Basic sleek slider](https://rvenkatesh.github.io/Ember-Slider/screenshots/slider-sleek.png) |

##### Likert scale slider

| type="closed" | type="sleek" |
| --- | --- |
| ![Likert scale slider](https://rvenkatesh.github.io/Ember-Slider/screenshots/likert-slider.png) | ![Likert scale slider](https://rvenkatesh.github.io/Ember-Slider/screenshots/likert-slider-sleek.png) |

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
Note that versions below v1.2.0 used [compass](http://compass-style.org/) for compiling the styles. If you do not have it already, please follow [this link](http://compass-style.org/install/) to install it before installing addon.
## How to use
Include the ember slider component in the template like any other normal ember component
```
{{ember-slider config=options}}

or 

<EmberSlider @config={{options}}/>
```
Add configuration options if necessary in the corresponding route's controller or component's class
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

## Generating custom slider theme color

Ember slider provides a blueprint, using which you can change the look and feel (colors & size) of the slider within minutes. Run the blueprint with your preferred color values and the amount of scaling you need, it will give you the scss file with autogenerated code. To make use of the generator, you must have [ember-cli-compass-compiler](https://github.com/quaertym/ember-cli-compass-compiler) installed in your application.

##### Syntax
```
ember g custom-slider <name_of_the_scss_file> <options>
```
Following are the options available.
- --pathcolor - `<type:string>` Background color of the handle movement path
- --fillerColor - `<type:string>` Background color of the region selected
- --handleColor - `<type:string>` Background color of the handle
- --classList - `<type:string>` CSS classname to be given to the generated slider
- --scale - `<type:number>` Amount by which the entire slider needs to be scaled. Default is 1.

##### Examples
1. To generate a red colored slider, you can do
```
ember g custom-slider red-slider --pathColor="#f5f5f5" --classList="red" --fillerColor="rgba(#ff6b43, .3)" --handleColor="#ff6b43"
```
The above command will generate a file called `_red-slider.scss` inside `app/styles` directory of your application.

2. You can also generate 2 or more sliders at the same time.

```
ember g custom-slider all-sliders  --classList="red green" --pathColor="#f5f5f5 #f5f5f5" --fillerColor="rgba(#ff6b43, .3) rgba(#79c03b, .3)" --handleColor="#ff6b43 #79c03b" --scale="1 0.9"
```

## Updating ember-slider
If you are updating one version of ember slider to other, please check out the [Release notes](https://github.com/RVenkatesh/Ember-Slider/wiki/Release-notes) page for any breaking changes (which are usually rare). 
