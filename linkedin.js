var rows = [
    ["Name", "Position"]
];

var limit_rotations = 0;

function getData() {

  window.scrollBy(0, 500);
  setTimeout(function(){ window.scrollBy(0, 500);}, 1000);
  setTimeout(function(){ window.scrollBy(0, 500);}, 2000);

  setTimeout(function(){

  var i = document.getElementsByClassName("entity-result__title-text t-16").length;
  for (a=0 ; a <i ; a++){

    var username = document.getElementsByClassName("entity-result__title-text t-16")[a].innerText.split('\n')[0];
    var usr_position = document.getElementsByClassName("entity-result__primary-subtitle t-14 t-black t-normal")[a].innerText;
    console.log(username)
    console.log(usr_position)
    rows.push([username , usr_position])

  }

}, 3000);

}

async function firstAsync() {
    let promise = new Promise((res, rej) => {
        getData()
        setTimeout(() => res("Now it's done!"), 4000)
    });

    // wait until the promise returns us a value
    let result = await promise;

    // "Now it's done!"
    // document.getElementById('ember320').click();

    //2021-08-23 updated click class
    document.getElementsByClassName("artdeco-pagination__button artdeco-pagination__button--next artdeco-button artdeco-button--muted artdeco-button--icon-right artdeco-button--1 artdeco-button--tertiary ember-view")[0].click()
    

    if (limit_rotations < 20) {
        firstAsync();
        limit_rotations++
    }else{

      let csvContent = "data:text/csv;charset=utf-8,";

      rows.forEach(function(rowArray) {
          let row = rowArray.join(",");
          csvContent += row + "\r\n";
      });

      var encodedUri = encodeURI(csvContent);

      console.log(encodedUri)
    }

}

firstAsync();
