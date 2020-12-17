var curprice = 0;
var buyusd = '--';
var buyeth = '--';
var trades = '--';

function precise2(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:2});
}

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


function color(x) {
  if(x<0) {
     return '<span class="red">'+precise2(x)+'% &#x2193;</span>';
  } else {
    return '<span class="green">+'+precise2(x)+'% &#x2191;</span>';
  }
}


function fetch()
{
  var num = Math.floor(Math.random() * 10000);

	ajax_get('https://api.covalenthq.com/v1/pricing/tickers/?tickers=UNi&key=ckey_49efd764b1204840a690e6e004c', function(data) {


    // ajax_get('https://api.covalenthq.com/v1/pricing/tickers/?tickers=api3&key=ckey_49efd764b1204840a690e6e004c',function(data1) {
	
        	//buyusd = data['market_data']['current_price']['usd'];
          // var data1 = JSON.parse(JSON.stringify(data));

 console.log(data);
          buyusd = data.data.items[0].quote_rate;
          contract_address = data.data.items[0].contract_address;
          contract_name = data.data.items[0].contract_name;
          contract_ticker_symbol = data.data.items[0].contract_ticker_symbol;
          rank = data.data.items[0].rank;
          logo = data.data.items[0].logo_url;
          uniswaplink = "https://app.uniswap.org/#/swap?outputCurrency="+contract_address
          console.log(buyeth);
             // document.getElementById("type").innerHTML = 'Bought';
             //  document.getElementById("buysell").classList.add('green');
             //  document.getElementById("buysell").classList.remove('red');
             //  document.getElementById("quantity").innerHTML = precise3(parseFloat(data[data.length-1]['quote_volume'].substring(0, 11)))+' $ACID';
          // if(data[data.length-1]['type']=='sell'){
          //     document.getElementById("type").innerHTML = 'Bought';
          //     document.getElementById("buysell").classList.add('green');
          //     document.getElementById("buysell").classList.remove('red');
          //     document.getElementById("quantity").innerHTML = precise3(parseFloat(data[data.length-1]['quote_volume'].substring(0, 11)))+' $ACID';
          // } else {
          //     document.getElementById("type").innerHTML = 'Sold';
          //     document.getElementById("buysell").classList.add('red');
          //     document.getElementById("buysell").classList.remove('green');
          //     document.getElementById("quantity").innerHTML = precise3(parseFloat(data[data.length-1]['quote_volume'].substring(0, 11)))+' $ACID';
          // }
        	//document.getElementById("USD").innerHTML = buyusd;
          document.getElementById("logoticker").src = logo
          document.getElementById("USD").innerHTML = precise3(buyusd);
          document.getElementById("contract_address").innerHTML = contract_address;

          document.getElementById("contract_name").innerHTML =contract_name;
          document.getElementById("contract_ticker_symbol").innerHTML = contract_ticker_symbol;
          document.getElementById("rank").innerHTML = rank;
          document.getElementById("uniswaplink").href = uniswaplink;
          //document.getElementById("staked").innerHTML = precise2(500000);
          //document.getElementById("stakepercent").innerHTML = precise2(500000/770000*100);
        // });

  }); 
}


function pricerefresh(){
  var x = setInterval(function() {
  fetch(); 
  
}, 25000);
}

fetch();
pricerefresh();