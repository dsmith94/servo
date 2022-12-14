/**
 * Gets the active description for a character.
 * @param {Character} [character] Optional. String identifier of character. This isn't necessary if you're talking to the character presently.
 * @returns {string} Text string for character description.
 */
const getDesc = (character) => {
  if (!character) {
    character = g$.isTalking;
  }
  const [name, a, the] = getName(character);
  const s = g$[character].state ?? "talk";
  if (!hasMet(character)) {
    if (g$[character][s]["notMet"]) {
      if (typeof g$[character][s]["notMet"] === "function") {
        return g$[character][s]["notMet"]();
      } else if (typeof g$[character][s]["notMet"] === "object") {
      }
      return g$[character]["notMet"] ?? capitalize(`${the} ${name} is here.`);
    }
  }
  if (g$[character][s]["desc"]) {
    if (typeof g$[character][s]["desc"] === "function") {
      return g$[character][s]["desc"]();
    } else if (typeof g$[character][s]["desc"] === "string") {
      return g$[character][s]["desc"];
    }
  }
  return g$[character][s]["desc"] ?? capitalize(`${the} ${name} is here.`);
};

/**
 * Get reference articles and name of character for screen printing.
 * @param {Character} [character] String identifier of character. This isn't necessary if you're talking to the character presently.
 * @returns {Array} Articles and current name of character, in form of [name a, the, that].
 */
const getName = (character) => {
  if (!character) {
    character = g$.isTalking;
  }
  if (hasMet(character)) {
    return [g$[character].name, "", "", ""];
  } else {
    return [g$[character].name, "a", "the", "that"];
  }
};

/**
 * Sets name of character, often after player has learned the name.
 * @param {string} name Screen-friendly name of character, ala "Lord Dimwit Flathead" instead of the internal game id.
 * @param {Character} [character] String identifier of character. This isn't necessary if you're talking to the character presently.
 */
const setName = (name, character) => {
  if (!character) {
    character = g$.isTalking;
  }
  g$[character]["name"] = name;
};

/**
 * Determines if player has yet encountered a character.
 * @param {Character} [character] String identifier of character. This isn't necessary if you're talking to the character presently.
 * @returns {boolean} True if player has met character in the narrative.
 */
const hasMet = (character) => {
  if (!character) {
    character = g$.isTalking;
  }
  return g$[character]["hasMet"];
};

/**
 *
 * Get location of character. If none is provided, the current focused character
 * will be used.
 *
 * @param {Character} [character] Name of character.
 * @returns {GameLocationID} Game location identifier.
 */
const getLocation = (character) => {
  const c = character ? g$[character] : c$;
  return c.location;
};

/**
 *
 * Set location of character.
 * If no character is provided, the current focused character
 * will be used.
 *
 * @param {GameLocationID} location Location to place character.
 * @param {Character} [character] Character to place.
 */
const setLocation = (location, character) => {
  const c = character ? g$[character] : c$;
  c.location = location;
};

const getState = (character) => {
  if (!character) {
    character = g$.isTalking;
  }
  if (!g$[character].state) {
    return "talk";
  } else {
    return g$[character].state;
  }
};

/**
 *
 * Set state of character. If no character argument is passed,
 * the current talking character is used.
 *
 * @param {*} state New state to apply to character.
 * @param {*} character Character on which to apply new state.
 */
const setState = (state, character) => {
  const s = state ?? "talk";
  if (!character) {
    character = g$.isTalking;
  }
  g$[character].state = s;
  if (g$.isTalking === character) {
    g$.lastNode = g$[character][s];
  }
};

/**
 * Get number of times player has visited a location.
 * @param {GameLocationID} [location] String identifier of location. If none is provided, the current location will be used.
 * @return {number} Number of times visited.
 */
const hasVisited = (location) => {
  if (!location) {
    location = g$.currentLocationName;
  }
  const v = g$[location].visited ?? 0;
  return v;
};

/**
 * Initiate new conversation with character.
 * @param {Character} character String identifier of character you wish to initiate conversation.
 */
const talk = (character) => {
  g$.isTalking = character;
  c$ = g$[character];
  c$["hasMet"] = true;
  const s = c$?.state ?? "talk";
  //addToMap()
  /*
    if (g$?.map?.length === 1) {
      if (!g$.showFastTravelTip) {
        g$.showFastTravelTip = 1
      }
    }
    */
  g$.lastNode = g$[character][s];
  document.getElementById("main").classList.add(`outFade`);
  setTimeout(() => {
    clearScreen();
    createPage();
    handleCharacterLook();
    showInput();
  }, 450);
};

const handleCharacterLook = () => {
  const state = c$?.state ?? "talk";
  if (!c$[state].look) {
    throw `Node has no desc property: ${nodeIdentifier}`;
  } else {
    if (typeof c$[state].look === "function") {
      c$[state].look();
    } else {
      msg(c$[state].look);
    }
  }
};

const setTopic = (topic) => {
  const inputBox = document.getElementById("inputBox");
  if (inputBox) {
    inputBox.value = topic;
    g$.input = topic;
    refreshButtons();
  }
};


const suggestTopics = () => {
  msg(`
  
  <div class="suggested-topics">[You could discuss ${c$.topics.map(t => `#${t}`).join(', ')} or just say #bye for now.]</div>
  
  `, {skipSkylight: true})
};


const characterLink = (character, content) => `
    
    <div onclick="talk('${character}')">${skylight(content)}</div>
    
`;
