
const baseURL = 'http://numbersapi.com';
const favNum = 9;

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the ***json*** query key, specific to this API. [Details](http://numbersapi.com/#json).
async function favNumFacts(){
   let res = await $.getJSON(`baseURL/${favNum}?json`);
   console.log(res);
}
favNumFacts();

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
let nums = [1, 5, 7];
async function numsFacts(){
    let res = await $.getJSON(`${baseURL}/${nums}?json`);
    console.log(res)
}
numsFacts();

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats. *(Note: You’ll need to make multiple requests for this.)*

async function fourFactsFavNum(){
    let res = await Promise.all(
        Array.from({length: 4}, () => 
        $.getJSON(`${baseURL}/${favNum}?json`))
    );
    facts.forEach(data => {
        $("body").append(`<p>${data.text}</p>`);
    });
}
fourFactsFavNum();