const msg = (content, options) => {
  // private function to handle array printing in msg
  const incrementPrint = (arr) => {
    const showFirst = arr[0];
    const stringToHash = () => {
      let hash = 0;
      if (showFirst.length == 0) {
        return hash;
      }
      for (i = 0; i < showFirst.length; i++) {
        const char = showFirst.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return hash;
    };
    const id = `i${stringToHash()}`;
    const value = g$[id] ?? 0;
    if (value) {
      msg(arr[value]);
      if (value < arr.length - 1) {
        g$[id] = value + 1;
      }
    } else {
      g$[id] = 1;
      msg(showFirst);
    }
  };

  let str = typeof content === "string" ? content : content();
  if (!options?.skipSkylight) {
    str = skylight(str, options?.skipParagraphTags);
  }


  const synonymCheck = (keyword) => {
    const lwrStr = str.toLowerCase();
    for (const top of Object.keys(Game.topics)) {
      for (const word of Game.topics[top]) {
        const index = lwrStr.indexOf(`#${word}`.toLowerCase());
        if (index > -1 && keyword === top) {
          return [top, `#${word}`, index];
        }
      }
      if (keyword.toLowerCase() === top.toLowerCase()) {
        const index = lwrStr.indexOf(`#${top}`.toLowerCase());
        if (index > -1) {
          return [top, `#${top}`, index];
        }
      }
    }
    const index = lwrStr.indexOf(`#${keyword}`.toLowerCase());
    if (index > -1) {
      return [keyword, `#${keyword}`, index];
    }
    return ['', '', -1];
  };


  // process in-message commands
  if (g$.isTalking) {
    const states = Object.keys(c$);
    const endKeyword = "@end";
    const setNameKeyword = "@set-name";
    const suggestTopicsKeyword = "@suggest";
    const setLocationKeyword = "@set-loc";
    if (str.indexOf(endKeyword) > -1) {
      endConversation();
      str = str.replace(endKeyword, "");
    }
    if (str.indexOf(suggestTopicsKeyword) > -1) {
      str = str.replace(suggestTopicsKeyword, suggestTopics());
    }
    if (str.indexOf(setNameKeyword) > -1) {
      const tokens = str.split("@set-name {");
      const t1 = tokens[1].split("}");
      const name = t1[0];
      str = str.replace(`@set-name {${name}}`, "");
      setName(name);
    }
    if (str.indexOf(setLocationKeyword) > -1) {
      const tokens = str.split("@set-loc {");
      const t1 = tokens[1].split("}");
      const name = t1[0];
      str = str.replace(`@set-loc {${name}}`, "");
      setLocation(name);
    }
    for (const state of states) {
      const keyword = `$${state}`;
      if (str.indexOf(keyword) > -1) {
        str = str.replace(keyword, "");
        setState(state);
      }
    }
    for (const state of states) {
      const topics = Object.keys(c$[state]);
      for (const topic of topics) {
        const [keyword, label, tokenIndex] = synonymCheck(topic);
        if (tokenIndex > -1) {
          const replaceToken = str.slice(
            tokenIndex,
            tokenIndex + label.length
          );
          const trimmedLabel = replaceToken.slice(1);
          str = str.replace(
            replaceToken,
            `<span class="topic" onclick="setTopic('${keyword}')">${trimmedLabel}</span>`
          );
        }
      }
    }
  }

  const page = document.getElementById("page");
  if (page) {
    page.innerHTML += str;
  }
};
