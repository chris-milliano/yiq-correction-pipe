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
