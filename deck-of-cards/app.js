let baseURL = 'https://deckofcardsapi.com/api/deck'

// 1. Make a request to the [Deck of Cards API](http://deckofcardsapi.com/) to request a single card from a newly shuffled deck. Once you have the card, ***console.log*** the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

async function oneCardConsoleLog(){
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    console.log(`${data.cards[0].value.toLowerCase()} of ${data.cards[0].suit.toLowerCase()}`);
}

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.  
//Once you have both cards, ***console.log*** the values and suits of both cards.

async function twoCardsConsoleLog(){
   let firstCardData =  await $.getJSON(`${baseURL}/new/draw/`);
   let deckId = firstCardData.deck_id;

   let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`)

   [firstCardData, secondCardData].forEach(card => {
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
   });

}


// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.


async function setup(){
    const $drawCardBtn = $(`#draw-card-btn`);
    const $currCardImg = $(`#current-card-image`);
    
    let newDeck = await $.getJSON(`${baseURL}/new/shuffle`);

    $drawCardBtn.on('click', async function(){
        let data = await $.getJSON(`${baseURL}/${newDeck.deck_id}/draw`);

        card = data.cards[0];
        $currCardImg.attr('src', card.image);
        $currCardImg.attr('alt', `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);

        if (data.remaining === 0) $drawCardBtn.remove(); 
    });
}