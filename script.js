let arr = [];

/*
let response = fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");

response.then((data) => {
    let promise = data.json();

    promise.then((info) => {
        addDatatoTable(info);
        arr = info;
    });
});
response.catch(() => {
    alert("Somenthing went wrong");
})
*/

async function loadData(){

    let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");

    let promise = await response.json();

    return promise;

}

let x = loadData();

x.then((data) => {
    arr = data;
    addDatatoTable(arr);
});

function addDatatoTable(arr) {

    let container = document.getElementById("table-body");
    container.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {

        let tr = document.createElement("tr");
        tr.className = "table-row";

        let logo = document.createElement('td');
        logo.id = "logo";
        let img = document.createElement("img");
        img.src = arr[i].image;
        logo.append(img);
        tr.append(logo);

        let name = document.createElement('td');
        name.id = "name";
        name.innerText = arr[i].name;
        tr.append(name);

        let symbol = document.createElement('td');
        symbol.id = "symbol";
        symbol.innerText = arr[i].symbol.toUpperCase();
        tr.append(symbol);

        let current_price = document.createElement('td');
        current_price.id = "current_price";
        current_price.innerText = "$" + numberWithCommas(arr[i].current_price);
        tr.append(current_price);

        let volume = document.createElement('td');
        volume.id = "volume";
        volume.innerText = "$" + numberWithCommas(arr[i].total_volume);
        tr.append(volume);

        let change = document.createElement('td');
        change.id = "change";
        change.innerText = arr[i].price_change_percentage_24h.toFixed(2) + "%";
        if (arr[i].price_change_percentage_24h >= 0) {
            change.style.color = "green";
        }
        else {
            change.style.color = "red";
        }
        tr.append(change);

        let mkt_cap = document.createElement('td');
        mkt_cap.id = "mkt_cap";
        mkt_cap.innerText = "Mkt Cap: " + "$" + numberWithCommas(arr[i].market_cap);
        tr.append(mkt_cap);

        container.append(tr);

    }



}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

let sort_by_percentage_button = document.getElementById("sort-by-per-change-button");

let sort_by_mktcap_button = document.getElementById("ssort-by-mkt-cap-button");

let input = document.getElementById("search_input");

function sortByPercentage() {
    sortByPercentageClicked(arr);
}

function sortByMkt() {
    sortByMktClicked(arr);
}

function sortByPercentageClicked(arr) {
    let ans = [];
    ans = [...arr];

    for (let i = 0; i < ans.length; i++) {

        for (let j = i; j < ans.length; j++) {

            if (ans[i].price_change_percentage_24h < ans[j].price_change_percentage_24h) {

                let temp = ans[i];
                ans[i] = ans[j];
                ans[j] = temp;
            }
        }
    }

    addDatatoTable(ans);
}

function sortByMktClicked(arr) {

    let ans = [];
    ans = [...arr];

    for (let i = 0; i < ans.length; i++) {

        for (let j = i; j < ans.length; j++) {

            if (ans[i].market_cap < ans[j].market_cap) {

                let temp = ans[i];
                ans[i] = ans[j];
                ans[j] = temp;
            }
        }
    }

    addDatatoTable(ans);

}

function inputChanged() {
    inputChangeDetected(arr);
}

function inputChangeDetected(arr) {

    let ans = [];

    let filter = input.value;
    filter = filter.toUpperCase();

    let n = filter.length;

    for (let i = 0; i < arr.length; i++) {

        let name = arr[i].name.toUpperCase().substring(0, n);
        let symbol = arr[i].symbol.toUpperCase().substring(0, n);

        if (filter == name || filter == symbol) {
            ans.push(arr[i]);
        }

    }

    addDatatoTable(ans);


}
