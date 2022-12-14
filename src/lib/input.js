
const refreshButtons = () => {
  const btns = document.getElementById("btns");
  const state = getState();
  const input = g$.input;
  btns.innerHTML = '';
  if (c$[state][input]) {
    const options = c$[state][input];
    options.map(o => {
        const button = document.createElement("button");
        const buttonText = document.createElement("div");
        const [text, callback] = o;
        buttonText.innerText = text;
        buttonText.className = 'buttonText';
        button.onclick = () => {
            clearScreen();
            createPage();
            showInput();
            if (typeof callback === 'string') {
                msg(callback);
            } else {
                callback();
            }
        };
        button.appendChild(buttonText);
        btns.appendChild(button);
    })
  }
}


const showInput = () => {
  g$.input = "";
  const input = document.getElementById("input");
  input.innerHTML = '';
  const inputBox = document.createElement("input");
  const pageCache = document.getElementById("page").innerHTML;
  inputBox.type = "text";
  inputBox.name = "inp";
  inputBox.placeholder = "Enter here";
  inputBox.class = "inp";
  inputBox.id = "inputBox";
  inputBox.autofocus = true;
  inputBox.oninput = () => {
    const page = document.getElementById("page");
    g$.input = inputBox.value.toLowerCase();
    refreshButtons();
    if (g$.input) {
        page.innerHTML = '';
    } else {
        page.innerHTML = pageCache;
    }
  }
  input.appendChild(inputBox);  
};
