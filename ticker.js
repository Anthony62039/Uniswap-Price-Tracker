var curprice = 0;
var buy = '--';

function precise3(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:3});
}

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function fetch()
{
  var random = Math.floor(Math.random() * 10000);

  ajax_get('https://api.covalenthq.com/v1/pricing/tickers/?tickers=UNi&key=ckey_49efd764b1204840a690e6e004c', function(data) {
  
      console.log(data);
      // ajax_get('https://api.coinpaprika.com/v1/tickers/eth-ethereum',function(data1) {
    	buyeth = data.data.items[0].quote_rate;
      etprice = data.data.items[0].quote_rate;
      // buy = precise3(etprice/buyeth);
    	chrome.browserAction.setBadgeText({text: String(buyeth)});
      // }); 

  });
}


function pricerefresh(){
  var x = setInterval(function() {
  fetch(); 
  
}, 50000);
}


pricerefresh();
fetch();


chrome.browserAction.setBadgeBackgroundColor({ color: [83, 77, 82, 255] });
chrome.browserAction.setBadgeText({text: buy});