var rows = [
    ["Name", "Position"]
];

var limit_rotations = 0;

var no_of_employees = 10; // change this to no of pages you need to scrap 


//i know im not using this function anywhere but i have it just in case if i changed by mind
async function getEmployeeNumber() {


  let employeenumberpromis = new Promise((res, rej) => {
    
    window.scrollBy(0, 500);
    setTimeout(function(){ window.scrollBy(0, 500);}, 1000); 
    setTimeout(function(){ window.scrollBy(0, 500);}, 2000); 
    
    setTimeout(() => res("Now it's done!"), 5000) 
  });

  let result = await employeenumberpromis;
  
  pagination_length = document.getElementsByClassName("artdeco-pagination__indicator artdeco-pagination__indicator--number ember-view").length - 1

  no_of_employees = document.getElementsByClassName("artdeco-pagination__indicator artdeco-pagination__indicator--number ember-view")[pagination_length].innerText - 1

  return no_of_employees

}


//function to update the get request parameters
function update_query_parameters(key, val) {
  uri = window.location.href
     .replace(RegExp("([?&]"+key+"(?=[=&#]|$)[^#&]*|(?=#|$))"), "&"+key+"="+encodeURIComponent(val))
     .replace(/^([^?&]+)&/, "$1?");
  return uri;
}

function getData() {

  window.scrollBy(0, 500);
  setTimeout(function(){ window.scrollBy(0, 500);}, 1000); //intervals can be changed according to the network speeds
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
        setTimeout(() => res("Now it's done!"), 5000) 
    });

    // wait until the promise returns us a value
    let result = await promise;

    // "Now it's done!"
    // document.getElementById('ember320').click();

    //2021-08-23 updated click class
    try {

        document.getElementsByClassName("artdeco-pagination__button artdeco-pagination__button--next artdeco-button artdeco-button--muted artdeco-button--icon-right artdeco-button--1 artdeco-button--tertiary ember-view")[0].click()

    } catch (error) {
      
    
      try {
       
        var getCurrentPage = new URLSearchParams(window.location.href);
        var currentPageNo = parseInt(getCurrentPage.get("page"))
        var NextPageNo = currentPageNo + 1
        var NextURL = update_query_parameters("page", NextPageNo)

        window.history.replaceState(NextURL); //I know this line is wrong but dont think about it for now 

      } catch (error) {
      
            let csvContent = "data:text/csv;charset=utf-8,";

            rows.forEach(function(rowArray) {
                let row = rowArray.join(",");
                csvContent += row + "\r\n";
            });

            var encodedUri = encodeURI(csvContent);

            console.log(encodedUri)

            return;

      }

    } //adding a try catch to give the output upto the point incase of error 
    

    if (limit_rotations < no_of_employees) {

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
