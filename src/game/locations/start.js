Game.start = {

   desc: `
   
   Lying close to the edge of a cliff is your ship, presently more of an accordion than a spacecraft. Straight left
   the airlock hangs open, and a winding path leads down to a little village in the valley below.
   
   `,

   swipeUp: `Going that way would send you directly over the cliff.`,

   swipeLeft: () => go('insideShip')

}
