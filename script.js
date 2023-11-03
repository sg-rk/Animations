const worker = new Worker('worker.js');

const calcSumEle = document.getElementById("calcSum");
const changeBgEle = document.getElementById("changeBg");

calcSumEle.addEventListener('click', (e) => {
  console.log(e);
  console.log(worker.postMessage('Start'));
});

worker.onmessage = (message) => {
  alert(`Total value ${message.data}`);
}

changeBgEle.onclick = e => {
  console.log(e);
  document.body.style.background =
    document.body.style.background == "blue"
      ? "green"
      : "blue";
};
