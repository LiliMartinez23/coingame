function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const player = document.querySelector( '#player' );
const coin = document.querySelector( '#coin' );

// Player
window.addEventListener( 'keyup', function( e ) {
    // Down
    if ( e.key === 'ArrowDown' || e.key === 'Down' ) {
        moveVertical( player, 50 );
    } 
    // Up
    else if ( e.key === 'ArrowUp' || e.key === 'Up' ) {
        moveVertical( player, -50 );
    }
    // Right
     else if ( e.key === 'ArrowRight' || e.key === 'Right' ) {
        moveHorizontal( player, 50 );
        player.style.transform = 'scale( 1, 1 )';
    }
    // Left
    else if ( e.key === 'ArrowLeft' || e.key === 'Left' ) {
        moveHorizontal( player, -50 );
       player.style.transform = 'scale( -1, 1 )';
    }

    if ( isTouching( player, coin ) ) {
        moveCoin();
        updateScore();
    };
} );

// Move Vertical
const moveVertical = ( element, amount ) => {
    const currTop = extractPos( element.style.top );
    element.style.top = `${ currTop + amount }px`;

    const minTop = 80;
    const maxTop = window.innerHeight - element.height;

    if (newTop >= minTop && newTop <= maxTop) {
        element.style.top = `${newTop}px`;
    }
};

// Move Horizontal
const moveHorizontal = ( element, amount ) => {
    const currLeft = extractPos( element.style.left );
    element.style.left = `${ currLeft + amount }px`;
};

const extractPos = ( pos ) => {
    if ( !pos ) return 100;
    return parseInt(pos.slice( 0, -2 ));
};

// Coin Movement
const moveCoin = (  ) => {
    const x = Math.floor( Math.random() * (window.innerWidth - coin.width));
    const y = Math.floor( Math.random() * (window.innerHeight - coin.height - 80) + 80 );

    coin.style.top = `${ y }px`;
    coin.style.left = `${ x }px`;
};
moveCoin();

// Score Board
let score = 0;
const scoreBoard = document.querySelector( '#scoreBoard' );
function updateScore() {
    score += 1;
    scoreBoard.innerHTML = `<h1>SCORE: ${score}</h1>`;
};