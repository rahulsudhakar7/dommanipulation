const ITEM_PER_PAGE=4;

let rawData;

const calculatePageCount = (totalRecords, ITEM_PER_PAGE) => {
    return Math.ceil(totalRecords / ITEM_PER_PAGE);
  }
  const calculateRemainder = (totalRecords, recordsPerPage) => {
    return totalRecords - Math.floor(totalRecords / recordsPerPage) * recordsPerPage;
  }
  
  function renderHtml(startIndex, endIndex) {
    document.getElementById('container').innerHTML=' '
    for (let i = startIndex; i < endIndex; i++) {
        document.getElementById('container').innerHTML +=  `<div class="box" id="box${i+1}"><img src=${rawData[i].image} alt="image"/><h4>${rawData[i].title}</h4><div class="details"><p>${rawData[i].price}</p><button class="action" id="action${i+1}">Show Details</button></div><div class="descriptionNone" id="description${i+1}"><h4>${rawData[i].description}</h4><p>${rawData[i].category}</p><p>Ratings : <span>${rawData[i].rating.rate}</span></p><p>Ratings Count : <span>${rawData[i].rating.count}</span></p></div></div>`
    }
   // document.getElementById('container').innerHTML = html;
  }

  fetch("https://fakestoreapi.com/products")
  .then((data) => data.json())
  .then((data) => {

    rawData = data;
    const pageCount = calculatePageCount(data.length, ITEM_PER_PAGE);
    const remainder = calculateRemainder(data.length, ITEM_PER_PAGE);

    // Initial population 
    if (ITEM_PER_PAGE > data.length) renderHtml(0, data.length);
    else renderHtml(0, ITEM_PER_PAGE);

    // Add pagination buttons if records need more than 1 page
    if (pageCount > 1) {
        document.body.innerHTML += `<div class="pagination" id="pagination1"></div>`;
        let p = '<div class="pagination">';
      for (let j = 0; j < pageCount - 1; j++) {
        p += `<button onclick="renderHtml(${j*ITEM_PER_PAGE},${j*ITEM_PER_PAGE+ITEM_PER_PAGE})">${parseInt(j + 1)}</button>`;
      }
      // Add the last page button which might have less row records
      if (remainder !== 0) {
        p += `<button onclick="renderHtml(${(pageCount-1)*ITEM_PER_PAGE},${(pageCount-1)*ITEM_PER_PAGE+remainder})">${pageCount}</button>`;
      } else {
        p += `<button onclick="renderHtml(${(pageCount-1)*ITEM_PER_PAGE},${(pageCount-1)*ITEM_PER_PAGE+ITEM_PER_PAGE})">${pageCount}</button>`;
      }
      p += '</div>';
      document.getElementById('pagination1').innerHTML = p;
    }

  })
  const buttonClasss = document.getElementsByClassName('action');
  //console.log(buttonClasss);
  for(let i = 0; i < buttonClasss.length; i++){
      buttonClasss[i].addEventListener('click', (e)=>{
          handleToggel(document.getElementById(e.target.id).parentElement.nextElementSibling.id, e.target.id);
         
      })
  }
  function handleToggel(dId, bId){
      const descriptionId = document.getElementById(dId);
      const buttonId = document.getElementById(bId);
      
       if(buttonId.innerHTML == 'Show Details'){
           descriptionId.classList.add('descriptionDisplay')
           descriptionId.classList.remove('descriptionNone')
           buttonId.innerHTML = 'Show Less'
       }else{
           descriptionId.classList.add('descriptionNone')
           descriptionId.classList.remove('descriptionDisplay')
           buttonId.innerHTML = 'Show Details'
       }
  } 