let menuShown = false;

const toggleMenu = () => {
  if (!menuShown) {
    const menuDiv = document.createElement("div");
    menuDiv.className = "menu";
    const innerMenu = document.createElement("div");
    innerMenu.style = `
      max-width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    `;
    let m = [];
    const closeButton = document.createElement("button");
    closeButton.style =
      "aspect-ratio: 1; font-size: 2em; font-weight: bold; padding-left: 0.99em; padding-right: 0.99em;";
    closeButton.innerText = "⤒";
    closeButton.onclick = () => {
      menuShown = false;
      menuDiv.remove();
      const outMenu = document.createElement("div");
      outMenu.className = "outMenu";
      outMenu.innerHTML = menuDiv.innerHTML;
      document.body.appendChild(outMenu);
      setTimeout(() => {
        outMenu.remove();
      }, 400);
    };
    innerMenu.appendChild(closeButton);
    menuDiv.appendChild(innerMenu);
    document.body.appendChild(menuDiv);
  }
};

const createMenu = () => {
  const topBar = document.createElement("div");
  topBar.className = "topBar";
  topBar.onclick = toggleMenu;
  document.body.appendChild(topBar);
};


const addNote = (category, content) => {

}

