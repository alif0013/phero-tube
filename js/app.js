
const handleCategories = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
  const response = await res.json();

  const tabContainer = document.getElementById('tab_container');
  const allTabs = response.data;

  allTabs.forEach((category) => {

    const div = document.createElement('div');
    div.innerHTML = `
        <a onclick = "handleLoadVideos('${category?.category_id}')" class="tab bg-[#25252533] mr-2 rounded"> ${category.category} </a> 
        `
    tabContainer.appendChild(div);

  });

}

const handleLoadVideos = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
  const data = await res.json();

  const videosCardContainer = document.getElementById("videos_card_container");
  videosCardContainer.innerHTML = "";

  const noDataFound = document.getElementById('no_data_container');
  noDataFound.innerHTML = "";

  if (data.data.length === 0) {
    // No data found for the selected category
    const noDataFoundImage = document.createElement('img');
    noDataFoundImage.src = "../image/icon.png";
    const h1 = document.createElement('h1');
    h1.innerText = "Oops!! Sorry, There is no content here";
    noDataFound.appendChild(noDataFoundImage);
    noDataFound.appendChild(h1);
  }
  else {
    data.data.forEach((videos) => {

    
        const allTimeInSecond = videos?.others?.posted_date;
        const hours = Math.floor(allTimeInSecond / 3600);
        const remindingSecond = allTimeInSecond % 3600;
        const minutes = Math.floor(remindingSecond / 60);
        const convertingHourMinute =  `${hours} hour ${minutes} min ago`;
     
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
        <figure><img class = "md:h-[180px] w-[300px]"
            src="${videos?.thumbnail}"
            alt="thumbnail img" /></figure>
            <p class="sm:-mt-8 ml-40 md:ml-5 lg:ml-28 text-center -mt-8 rounded w-[180px] bg-[#171717] text-white ">${allTimeInSecond? convertingHourMinute : '' }</p>
            
        <div class="flex py-5">
          <div class="pr-5 px-2 py-2">
            <img class="w-[40px] h-[40px] mt-5 rounded-full" src="${videos?.authors?.[0]?.profile_picture}" alt="author">
          </div>
         
          <div>
            <h2 class="card-title mt-5">${videos?.title}</h2>
            <p class="pt-2">${videos?.authors?.[0]?.profile_name} <span>

            ${videos?.authors?.[0]?.verified ? '<i class="fa-solid text-[blue] fa-circle-check"></i>' : " "}
            </span></p>
            <p class="pt-1 pb-2">${videos?.others?.views}</p>
          </div>
        </div>
      </div>

        `
      videosCardContainer.appendChild(div);

    });
  }
}

handleCategories();
handleLoadVideos("1000");