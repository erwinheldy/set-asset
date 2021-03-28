# set-asset
Set html files to use minified or non-minified assets

## Installation
`npm i set-asset -g`

## Features
Set from\
`<link rel="stylesheet" href="assets/css/main.css">`\
`<script src="assets/js/main.js"></script>`\
to\
`<link rel="stylesheet" href="assets/css/main.min.css">`\
`<script src="assets/js/main.min.js"></script>`\
and vice versa

## Example
`set-asset --src=dist/html --minified`

`set-asset --src=dist/html --non-minified`

## Options
- `--src=[dir]`     Source directory
- `--minified`      Set to use minified assets
- `--non-minified`  Set to use non-minified assets
