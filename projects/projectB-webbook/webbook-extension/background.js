console.log("this is background script");

//for storing visit count of the tabs
let historyVisit = [];

//for storing the windowY position of the tabs
let historyPosition = [];


//when a new website has been visited, send visit count information to content script
chrome.history.onVisited.addListener(function(data) {
    historyVisit.push(data)
    console.log("website data info: " + historyVisit)

// the following is for getting window scroll position of the active tab
//when tab is active
  chrome.tabs.query({
      active: true,
      currentWindow: true
  }, function(tabs) {

//store website visitCount data and send it to content script
      let visitCount = {
          historyVisit: historyVisit,
          thisPageVisitCount: data.visitCount
      }

    chrome.tabs.sendMessage(tabs[0].id, visitCount);

    //for bookmark function: when revisit a page, scroll to the stored position
      for (let i = 0; i < historyPosition.length; i++) {
          if (tabs[0].url == historyPosition[i].storedURL) {
              console.log('this website has a bookmark record')
              chrome.tabs.sendMessage(tabs[0].id, {
                  bookmarkPos: "bookmarkPos",
                  posY: historyPosition[i].windowY,
              })
          }
      }

     //Receive two messages: pageloaded and get scroll position
      chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

          if (message.loaded == 'pageLoaded') {

            //check if bookmark button has been clicked
            let whetherBookmark = false;

              for (let i = 0; i < historyPosition.length; i++) {
                  if (tabs[0].url == historyPosition[i].storedURL) {
                      whetherBookmark = true;
                      posY = historyPosition[i].windowY
                  }
              }

              //send both window position and visit count information when bookmark is clicked
              //else only send visit count information
              if (whetherBookmark == true) {
                  chrome.tabs.sendMessage(tabs[0].id, {
                      thisPageVisitCount: data.visitCount,
                      posY: posY,
                      historyVisit: historyVisit,
                      whetherBookmark: "bookmarkTrue"
                  })
              } else {
                  chrome.tabs.sendMessage(tabs[0].id, {
                      thisPageVisitCount: data.visitCount,
                      historyVisit: historyVisit,
                      whetherBookmark: "bookmarkFalse"
                  })

              }
          }

          //when the bookmark has been clicked, get scroll position and send it to content script (message from content script)
          if (message.type = "getScrollPosition") {
              //send tabID to content script
              //(tabs.sendmessage: specific for sending message to content script)
              chrome.tabs.sendMessage(tabs[0].id,{type:"currentScrollPosition"}

                  //get current window scrolling position
                  , (response) => {
                      console.log("X: " + response.scrollX + " , " + "Y: " + response.scrollY);

                      //store window Y position and urls
                      var windowY = response.scrollY;

                      //store window scrolling position and url info
                      let positionInfo = {
                          windowY: windowY,
                          storedURL: data.url
                      }

                      //store most updated history position information in historyPosition array
                      let revisit = false;

                      for (let i = 0; i < historyPosition.length; i++) {
                          if (historyPosition[i].storedURL == data.url) {
                              historyPosition[i].windowY = windowY
                              revisit = true
                          }
                      }

                      if (revisit == false) {
                          historyPosition.push(positionInfo);
                      }

                    console.log(historyPosition);

                  })
          }

      })
  })


})
