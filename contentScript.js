/*
Author: 
Date:3/18/2021
Description: This progam is designed to fix the zoom issue with the Viz shonen jump reader, the zoom the user has is not saved is not carried when a page is changed, 
            the goal is of this is to maintain the current zoom throughout the reading experience on the VIZ website, 
            Main methodology: get the initial zoom of the canvas containter and whenever the users zooms in record those values, when the page changes check if the inital zoom 
            matches the saved zoom values if not modify the canvas css to reflect the changed zoom values 

*/
//THIS IS A GIT TEST
//event listeners, tell the user if they zoomed in or out
const zoomInButton = document.querySelector('#reader_tools > a.reader-icon.pad-sm.type-rg.line-solid.hover-red.reader-zoom.zoom-in');
const zoomOutButton = document.querySelector('#reader_tools > a.reader-icon.pad-sm.type-rg.line-solid.hover-red.reader-zoom.zoom-out');
const pageModeDouble = document.querySelector('#reader_tools > a.reader-icon.pad-sm.type-rg.line-solid.hover-red.reader-page-mode.double-page');
const pageModeSingle = document.querySelector('#reader_tools > a.reader-icon.pad-sm.type-rg.line-solid.hover-red.reader-page-mode.single-page');
const pageChange = document.querySelector('#pages_left');
//page state variables 
const doublePage = "double";
const singlePage = "single";
let pageMode = doublePage;

//initial state values 
let initialSinglePageWidth;
let initialSinglePageHeight;
let dynamicSinglePageWidth; //dynamicSinglePageWidth: get the single page width css, this one is to change depending on the users zoom level 
let dynamicSinglePageHeight; //dynamicSinglePageHeight: get the single page hright css, this one is to change depending on the users zoom level 

//constants
const containterRatio = 1.999997643 // the VIZ canvas for a double page needs to be split by this ratio for both left and right page canvases 

//when the zoom in button is clicked get the canvas's zoom  value and record it
zoomInButton.addEventListener('click', event => {
  console.log("you zoomed in");
  if (pageMode == singlePage) {
    console.log("Single page mode");
    let currentPage = document.querySelector('#canvas_single_current');
    console.log(` Current Page State:
    current width: ${currentPage.style.width} 
    current height: ${currentPage.style.height}
    `);
    dynamicSinglePageWidth = parseInt(currentPage.style.width, 10);
    dynamicSinglePageHeight = parseInt(currentPage.style.height, 10);

    /// BUG HERE the values this spit out do not reflect the canvas css style height and width, it records the values before the zoom not after 
    console.log(`Dynamic Page State:
    current width: ${dynamicSinglePageWidth} 
    current height: ${dynamicSinglePageHeight}
    `);




  }

  if (pageMode == doublePage) {
    console.log("Double page mode ");
    const currentPageLeft = document.querySelector('#canvas_left_current');
    const currentPageRight = document.querySelector('#canvas_right_current');
    console.log(` Current Left Page State:
    current width: ${currentPageLeft.style.width} 
    current height: ${currentPageLeft.style.height}
    `);
    console.log(` Current Right Page State:
    current width: ${currentPageRight.style.width} 
    current height: ${currentPageRight.style.height}
    `);
    //modify values for double page
    //TO CODE LATER AFTER SINGLE PAGE ZOOM FIX WORKS 
  }

  //stop event bubbling
  event.stopPropagation();

});
////when the zoom out button is clicked get the canvas's zoom  value and record it
zoomOutButton.addEventListener('click', event => {
  console.log("you zoomed out");
  //console.log("Caputuring site data");
  if (pageMode == singlePage) {
    setTimeout(() => {

    }, 1000);
    let currentPage = document.querySelector('#canvas_single_current');
    console.log(`Current Page State:
    current width: ${currentPage.style.width} 
    current height: ${currentPage.style.height}
    `);

    dynamicSinglePageWidth = parseInt(currentPage.style.width, 10);
    dynamicSinglePageHeight = parseInt(currentPage.style.height, 10);

    //ADD IN CONSOLE VALUES FOR THE ZOOM OUT FOR THE dynamicSinglePageWidth/Height


  }



  if (pageMode == doublePage) {

    console.log("Double page mode ");
    const currentPageLeft = document.querySelector('#canvas_left_current');
    const currentPageRight = document.querySelector('#canvas_right_current');
    console.log(` Current Left Page State:
    current width: ${currentPageLeft.style.width} 
    current height: ${currentPageLeft.style.height}
    `);
    console.log(` Current Right Page State:
    current width: ${currentPageRight.style.width} 
    current height: ${currentPageRight.style.height}
    `);
  }

  console.log(`Dynamic Page State:
    current width: ${dynamicSinglePageWidth} 
    current height: ${dynamicSinglePageHeight}
    `);
  //stop event bubbling
  event.stopPropagation();

});
//detect when the site switches from  a single to double page viewer 
pageModeDouble.addEventListener('click', event => {
  console.log("page mode changed to double");
  pageMode = doublePage;
  //stop event bubbling
  event.stopPropagation();
});
//detect when the site switches from  double page viewer 
pageModeSingle.addEventListener('click', event => {
  console.log("page mode changed to single");
  pageMode = singlePage;
  //stop event bubbling
  event.stopPropagation();
});

//does not work yet 
pageChange.addEventListener('change', event => {
  console.log("The page changed");
  event.stopPropagation();
})
//when the page changes calibrate the zoom
document.onkeydown = function (event) {

  //const page2 = document.querySelector('#canvas_single_next');
  switch (event.keyCode) {
    case 37:
      console.log('Left key pressed');
      zoomChange(dynamicSinglePageHeight, dynamicSinglePageWidth);
      
      break;
    case 39:
      console.log('Right key pressed');
      zoomChange(dynamicSinglePageHeight, dynamicSinglePageWidth);
      
      break;
    default:
      break;
  }
};

function zoomChange(height, width) {
  let page = document.querySelector('#canvas_single_current');
  if (pageMode == singlePage) {
    console.log("sinlge page zoom mode");

    console.log(dynamicSinglePageHeight, initialSinglePageHeight);
    sleep(300).then(() => {
      if (dynamicSinglePageHeight != initialSinglePageHeight) 
      {
        console.log("Zoom adjustment");
        page = document.querySelector('#canvas_single_current');
        console.log(height);
        page.style.setProperty('height', height + "px");
        page.style.setProperty('width', width + "px");
        
        //
        if(initialSinglePageHeight < dynamicSinglePageHeight)
        {
          zoomInButton.click();
        }
        else if (initialSinglePageHeight >= dynamicSinglePageHeight-10)
        {
          zoomOutButton.click();
        }
       
        
      }

    });




  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//main////////

//when the VIZ site first loads get the inital state of the page's css values 
//BUG: every now and then this cannot get the css style values and returns NaN for the width values and " " for the height
window.onload = function WindowLoad(event) {
  //#canvas_single_partner_current
  //document.querySelector('#reader_tools > a.reader-icon.pad-sm.type-rg.line-solid.hover-red.reader-page-mode.double-page > i').click();
  sleep(1000).then(() => {
    //document.querySelector('#reader_tools > a.reader-icon.pad-sm.type-rg.line-solid.hover-red.reader-page-mode.single-page > i').click();
    let initalState = document.querySelector('#reader_page_container');
    console.log('initialState = ' + initalState);

    //convert the number string into an int then back to string (needs to be in pixels for the css style change)
    let stringToIntconversion = Math.floor(parseInt(initalState.style.width, 10) / containterRatio);
    let intToStringConversion = stringToIntconversion.toString();


    //initialize all inital states here then revert back
    initialSinglePageWidth = Math.floor(parseInt(initalState.style.width, 10) / containterRatio);
    initialSinglePageHeight = parseInt(initalState.style.height);
    dynamicSinglePageWidth = Math.floor(parseInt(initalState.style.width, 10) / containterRatio);
    dynamicSinglePageHeight = parseInt(initalState.style.height);

    console.log("finished inital state");
    console.log('initialSinglePageWidth:' + initialSinglePageWidth);
    console.log('initialSinglePageHeight:' + initialSinglePageHeight);
    console.log('dynamicSinglePageWidth:' + dynamicSinglePageWidth);
    console.log('dynamicSinglePageHeight:' + dynamicSinglePageHeight);

  });

}
