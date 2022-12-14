const touchResolution = 10;

// clear screen function - will be called after button is pressed
const clearScreen = () => {
  const e = document.getElementById("main");
  e.remove();
  g$.buttonCount = 0;
};

const getDistance = (from, to) => {
  const distance = Math.sqrt(
    Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)
  );
  return distance;
};

const getAngle = (from, to) => {
  const deltaX = from.x - to.x;
  const deltaY = from.y - to.y;
  const radians = Math.atan2(deltaY, deltaX);
  let degrees = Math.floor((radians * 4) / Math.PI);
  switch (degrees) {
    case -1:
      return "right";
    case 0:
      return "right";
    case 1:
      return "down";
    case 2:
      return "down";
    case 3:
      return "left";
    case -4:
      return "left";
    case -2:
      return "up";
    case -3:
      return "up";
    default:
      return undefined;
  }
};

// create page - called on game start
const createPage = () => {
  let startPoint = { x: 0, y: 0 };
  let endPoint = { x: 0, y: 0 };
  let topRoot = document.getElementsByClassName("topRoot")[0];
  const main = document.createElement("div");
  const page = document.createElement("div");
  const input = document.createElement("div");
  const btns = document.createElement("div");
  const swipe = document.createElement("div");
  if (!topRoot) {
    topRoot = document.createElement("div");
    topRoot.className = "topRoot";
    document.body.appendChild(topRoot);
  }
  topRoot.appendChild(main);
  main.className = "main";
  main.id = "main";
  page.className = "page";
  page.id = "page";
  input.id = "input";
  btns.className = "btns";
  btns.id = "btns";
  swipe.className = "swipeArea";
  swipe.id = "btns";
  swipe.addEventListener("touchstart", (event) => {
    startPoint = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  });
  swipe.addEventListener("touchend", (event) => {
    endPoint = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };
    if (getDistance(startPoint, endPoint) > touchResolution) {
      const direction = getAngle(startPoint, endPoint);
      if (direction) {
        handleDirection(direction);
      }
    } else {
      if (g$.singleTap) {
        g$.singleTap();
      }
    }
  });

  // add elements to active DOM
  topRoot.appendChild(main);
  main.appendChild(page);
  main.appendChild(input);
  main.appendChild(btns);
  main.appendChild(swipe);
};
