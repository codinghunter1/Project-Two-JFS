/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const linkedList  = document.getElementsByClassName('link-list')[0]; 
const studentList = document.getElementsByClassName('student-list')[0];
let newData = data; //get data from data.js file

function showPage(list, page) {

   let startPage = (page * 9) - 9; //what number student is on the start of the wanted page  
   let endPage   = (page * 9); //what number student is on the end of the wanted page 
   
   studentList.innerHTML = '';

   let studentInfo = '';

   if (studentList.length === 0) { //empty list 
      studentInfo += `<p class="no-results">404 / Results not Found</p>`;
   }
   else { //list not empty   
      for (let i = 0; i < list.length; i++) { //loop through length of list
         if (i >= startPage && i < endPage) { //if student position is within the range of positions for the given page
            //html structer for each student with ith picture, first name and last name from list 
            studentInfo +=  ` 
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>    
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`;
         }
      }
   }
   studentList.insertAdjacentHTML("beforeend", studentInfo); //upload html structure info to html 
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function paginationButtons(list) {

   let pageNumber = Math.ceil(list.length / 9);  //round up 
   linkedList.innerHTML = '';

   for (let i = 1; i <= pageNumber; i++) { //page number starts at 1, loop to range of pageNumber
      //add button for each page number
      linkedList.insertAdjacentHTML("beforeend",
      `<li>
         <button type="button">${i}</button>
      </li>`
      );
   }

   const firstButton = document.querySelector("button"); //create button
   firstButton.setAttribute("class", "active");

   linkedList.addEventListener('click', (event) => { //add event of click on each linkedList button

      if (event.target.tagName == 'BUTTON') { //create event for when clicked

         const removeButton = document.querySelector('.active');
         removeButton.className = '';

         const newButton = event.target;
         newButton.className = 'active';

         const showButton = newButton.textContent;

         showPage(list, showButton);
      }
   });
}
//search bar
function searchBar() {
   const header = document.querySelector('.header'); //create search bar 
   //html search structure
   html = `
         <label for= "search" class= "student-search">
            <span>Search Name</span>
            <input id= "search" placeholder = "Search...">
            <button type= "button" class= "submit">
               <img src="img/icn-search.svg" alt = "Search icon"> 
            </button>
         </label>`;
   header.insertAdjacentHTML('beforeend', html); //add search structure to html
}
//call functions 
showPage(data, 1); //call show page with data from data file and starting on page 1
paginationButtons(data); //call button maker with data file for seeing how many pages are needed
searchBar(); //call search bar function

const searchBox = document.getElementById('search');
const searchButton  = document.querySelector('button.submit');

searchBox.addEventListener('keyup', () => { //create event for each time a keyboard key is reliesed on the searchBox
   let searchText = searchBox.value.toUpperCase();
   searchButton.onclick = () => {
      searchBox.value = ''; //store entered value
   }

   const newList = data.filter(student =>  { //replace data list with names that fit search method
      return(student.name.first.toUpperCase().includes(searchText) || student.name.last.toUpperCase().includes(searchText));
   });

   newData = newList;
   showPage(newData, 1); //call new page 
   paginationButtons(newData); //create new page buttons 
});