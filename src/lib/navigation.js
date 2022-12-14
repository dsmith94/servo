const handleCharactersInLocations = () => {
  Object.keys(g$).map((dir) => {
    if (g$[dir]?.location) {
      if (g$.location === g$[dir]?.location) {
        const d = getDesc(dir);
        msg(characterLink(dir, d), { skipSkylight: true });
      }
    }
  });
};

const handleDirection = (direction) => {
  direction = capitalize(direction);
  const callback = `swipe${direction}`;
  setDefaultSingleTap();
  if (l$[callback]) {
    if (l$[callback]?.verify) {
      const verify = l$[callback].verify();
      if (verify) {
        l$[callback].execute();
      }
    } else {
      if (typeof g$[callback] === "string") {
        msg(l$[callback]);
      } else {
        document.getElementById("main").classList.add(`out${direction}`);
        setTimeout(() => {
          clearScreen();
          createPage();
          if (typeof l$[callback] === "string") {
            msg(l$[callback]);
          } else {
            l$[callback]();
          }
        }, 450);
      }
    }
  }
};

const setDefaultSingleTap = () => {
  g$.singleTap = () => {
    document.getElementById("main").classList.add(`outFade`);
    setTimeout(() => {
      clearScreen();
      createPage();
      handleDesc();
    }, 450);
  };
};

const handleDesc = () => {
  if (!l$.desc) {
    throw `Node has no desc property: ${nodeIdentifier}`;
  } else {
    const state = l$?.state;
    if (state) {
      if (typeof l$.desc === "function") {
        l$[state].desc();
      } else {
        msg(l$[state].desc);
      }
    } else {
      if (typeof l$.desc === "function") {
        l$.desc();
      } else {
        msg(l$.desc);
      }
    }
  }
  g$.singleTap = undefined;
  handleCharactersInLocations();
};

/**
 * Capitalize first character of string.
 * @param {string} str String to operate on.
 * @returns {string} String with first letter capitalized.
 */
const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const go = (nodeIdentifier) => {
  if (!g$[nodeIdentifier]) {
    throw `Node identifier (GameLocationID) does not exist: ${nodeIdentifier}`;
  }

  g$.isTalking = '';
  l$ = g$[nodeIdentifier];
  g$.location = nodeIdentifier;
  l$.name = nodeIdentifier;

  handleDesc();
};

const endConversation = () => {
  const input = document.getElementById('input');
  const btns = document.getElementById('btns');
  input.innerHTML = '';
  btns.innerHTML = '';
  g$.singleTap = () => {
    document.getElementById("main").classList.add(`outFade`);
    setTimeout(() => {
      clearScreen();
      createPage();
      handleDesc();
    }, 450);
  };
}