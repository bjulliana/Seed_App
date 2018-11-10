# Seed_App
Seed! A Plant Monitoring App

## Installations Instructions
Clone Repo `git clone https://github.com/bjulliana/Seed_Website.git`    
Run `npm install --global gulp-cli`    
Run `npm install`    
Run `gulp watch` to view changes in browser and compile sass  

## Guide for Classes Usage  
Row Class `row`    
Column Classes (Must be used as direct child of row) `column-SIZE-NUMBER`  
  Example: `column-small-12` - To add a container with 12 column on small sizes.  
Card Container: `card`  
Card Title Container: `card-title`  

### Helper Classes
Display None  
`hidden`  

Text  
`text-center`  
`text-left`  
`text-right`  
`text-uppercase`  

Align Center Container Block  
`align-center`  

Align Flex Containers  
`flex-a-center`  
`flex-j-center`  

Show in Specific Viewports  
`show-for-small`  
`show-for-medium`  
`show-for-large`  
`show-for-xlarge`  
`show-for-xxlarge`  
`padding-v-xxs`  

Margins (Just Bottom)  
`no-margin-bottom`  
`margin-b-xxs`  
`margin-b-xs`  
`margin-b-sm`  
`margin-b-md`  
`margin-b-lg`  
`margin-b-xl`  

Paddings (Top and Bottom)  
`no-padding-bottom`  
`padding-v-xs`  
`padding-v-sm`  
`padding-v-md`  
`padding-v-lg`  
`padding-v-xl`  

## Mixins & Functions
Auto Calculate REM Values  
`rem-calc(NUM_PX)`  
  Code Example: `font-size: rem-calc(30)`  
 
Media Queries  
`@include breakpoint (SIZE)`  
  Code Example: `@include breakpoint (large)`  

Set Color  
`set-color(COLOR_NAME)`  
  Code Example: `set-color('black')`  
  Based on the Name of Color Variables  
  
## Variables  
Colors  
    `black`: #000000,  
    `grey-900`: #101010,  
    `grey-700`: #3c3c3c,  
    `grey-500`: #7e7e7e,  
    `grey-300`: #dadada,  
    `off-white`: #f5f5f5,  
    `light-green`: #cfe7e1,  
    `medium-green`: #66c4ad,  
    `white`: #ffffff,  
    `accent-1`: #307367,  
    `accent-2`: #7486ae,  
    `green-overlay`: #14483a,   
    `dark-green`: #2b655b,  

Typography:  
    `$primary-font`: 'Playfair Display', 'Times New Roman', serif;  
    `$secondary-font`: 'Lato', Arial, sans-serif;  

Usage of Images Paths on SCSS Files  
  `$img-path`  
  Code Example: `background-image: url('#{$img-path}/cover.jpg')`  
  
