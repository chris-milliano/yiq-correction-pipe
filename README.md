# YiqPipe

YIQ correction pipe is a tool built for Angular to ensure a high enough color
contrast between an element it's background color.

The motivation behind this tool came about when I was working on a project where
both the text color and the background color of some elements were both variables
that where predetermined (e.g. school colors). As new clients were added to
the project (e.g. schools), a problem emerged that some clients had brand colors
conflicted with our UI. Specifically, some brand colors had similar contrasts and
were not meant to be used to stand out on top of one another.

The solution was to write a function (actually a pipe since the motivating
project written in Angular) that would take in the selected inner color and
background color, then determine if their YIQ values were far enough apart to
allow easy reading for the user. If not, an optional 3rd input is an array of
inner color options to use as a backup (if no options are provided black and
white are added automatically) each is run thru the function until a suitable
option is found.

Learn more about [YIQ color space](https://en.wikipedia.org/wiki/YIQ) or see the  
[elementary code](https://stackoverflow.com/questions/9600295/automatically-change-text-color-to-assure-readability#answer-36904232) I expanded from.

## Run locally

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

Pull down the repo and run `npm install`.

Next change directory into the project.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## About the core function

The core logic of this pipe is handled by the function [colorVSBkgdColorYIQ](https://github.com/chris-milliano/yiq-correction-pipe/blob/master/src/app/yiq-correction.pipe.ts).

```typescript
colorVSBkgdColorYIQ (hexColor, hexBkgdColor): boolean {
    // returns true
    // if the difference in the input YIQ values
    // is outside the arbitrary tolerance value
}
```

There is an arbitrary constant set within this function:
* __YIQ_RATIO_TOLERANCE__
    * This ratio is to determine how far apart the YIQ values must be to be accepted
    * Currently set to 0.4
    * MIN: 0.0 -> All values are excepted (always returns true)
    * MAX: 1.0 -> No values are excepted (always returns false)

The above function will calculate a YIQ value for each color (hexColor and
hexBkgdColor).

Then a ratio is taken using both YIQ values.

That ratio is then compared to the the __YIQ_RATIO_TOLERANCE__ to determine if
the colors have a large enough difference.


## Usage instructions

#### Include the pipe

After including this pipe into your Angular app module, you can use it in
your component.html or component inline html.

#### Use pipe (Default)

###### In component.ts
```
innerColor: string = '#ff0000';
backgroundColor: string = '#0000ff';
```

###### In component.html
```
<div class="box display__box"
    [style.backgroundColor]="backgroundColor">
    <h3 [style.color]="innerColor | yiq : backgroundColor">
        DEFAULT YIQ CORRECTION
    </h3>
</div>
```


#### Use pipe (w/ fallback options)

###### In component.ts
```
innerColor: string = '#ff0000';
backgroundColor: string = '#0000ff';
colorOptions: string[] = [
    '#ff0000',
    '#ff7f00',
    '#ffff00',
    '#00ff00',
    '#0000ff',
    '#8b00ff'
];
```

###### In component.html
```
<div class="box display__box"
    [style.backgroundColor]="backgroundColor">
    <h3 [style.color]="innerColor | yiq : backgroundColor : colorOptions">
        YIQ CORRECTION WITH OPTIONS
    </h3>
</div>
```
