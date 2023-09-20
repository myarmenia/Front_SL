//  search Blog functon //
const filterBlock = document.querySelectorAll(".table tr th i");
const block = document.getElementById("searchBlock");
let left = null;
let test = null;
let open = false
console.log(filterBlock);

filterBlock.forEach((el) => {
  el.addEventListener("click", (e) => {
    el.setAttribute('data','filter')
    open = !open
    if(open){
      createDivSearch(e)
    }else{
      searchBlogNone(e)
    }
  });
});

function searchBlogNone (){
  block.style = `
       transform: rotateX(90deg);
       top: 210px;
       left:${left}px;
     `
}

function createDivSearch(e){
  const filterBlock = e.target;
  const rect = filterBlock.getBoundingClientRect();
  const th =document.querySelector('.table th')
  let t = th.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  left = rect.left + scrollLeft;
  let card = document.querySelector('.card-body')
  if(card.offsetWidth < left || card.offsetWidth - left  <  block.offsetWidth ){
    left = card.offsetWidth + block.offsetWidth
    block.style = `
    top:${t.top + 40}px;
    right: 40px;
    transform: rotateX(0deg);
  `;
  }else if(card.offsetWidth > left){
    block.style = `
    top:${t.top + 40}px;
    left:${left}px;
    transform: rotateX(0deg);
    `
  }
 
}

// document.body.addEventListener('click',(e) => {
//   console.dir(e.target.innerText);
//     if(e.target.data !=='filter'){
//       searchBlogNone()
//       open = !open
//     }

// })

// resiz Function //

document.addEventListener("DOMContentLoaded", (e) => {
  onMauseScrolTh();
});

function onMauseScrolTh(e) {
  const createResizableTable = function (table) {
    const cols = table.querySelectorAll("th");
    [].forEach.call(cols, function (col) {
      const resizer = document.createElement("div");
      resizer.classList.add("resizer");
      resizer.style.height = table.offsetHeight + "px";
      col.appendChild(resizer);
      createResizableColumn(col, resizer);
    });
  };
  const createResizableColumn = function (col, resizer) {
    let x = 0;
    let w = 0;
    const mouseDownHandler = function (e) {
      x = e.clientX;
      const styles = window.getComputedStyle(col);
      w = parseInt(styles.width, 10);
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
      const dx = e.clientX - x;
      col.style.width = w + dx + "px";
    };

    const mouseUpHandler = function (e) {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    resizer.addEventListener("mousedown", mouseDownHandler);
  };

  createResizableTable(document.getElementById("resizeMe"));
}




