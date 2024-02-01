let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//1. Access the list of toys from an API (mocked using JSON Server) and render
//   each of them in a "card" on the page
//additional--
/*### Fetch Andy's Toys
On the `index.html` page, there is a `div` with the `id` "toy-collection."
When the page loads, make a 'GET' request to fetch all the toy objects. With the
response data, make a `<div class="card">` for each toy and add it to the
toy-collection `div`.*/ //done
//----------------------------------
function fetchToy () {
  fetch(`http://localhost:3000/toys/`)
      .then((resp) => resp.json())
      .then((json) => displayToy(json));
};

function displayToy(toys) {
const toyCollection = document.getElementById("toy-collection");
  const toyCard = toys;

  Object.keys(toyCard).forEach((toy) => {
  //need a div with the following child elements h2, img w/ src, p, button w/ class "like-btn"
  
  //here is the div/card container
  const newDiv = document.createElement("div");
  newDiv.classList.add('card');
  newDiv.setAttribute("id", toys[toy].id)
  //the h2
  const h2 = document.createElement('h2');
  h2.innerHTML = toys[toy].name;
  newDiv.appendChild(h2);
  //img tag
  const img = document.createElement('img');
  img.src = toys[toy].image;
  img.classList.add("toy-avatar")
  newDiv.appendChild(img);
  //p tag
  const p = document.createElement('p');
  p.innerHTML = toys[toy].likes;
  newDiv.appendChild(p);
  //button
  const button = document.createElement('button');
  button.classList.add('like-btn');
  button.innerHTML = "Like";
  button.addEventListener("click", (event) => {
    const plusLikes = event.currentTarget.closest('.card');
    const likeTally = plusLikes.lastChild.previousSibling;
    const id = plusLikes.id;
    likeTally.innerHTML ++;
    /*
3. Create an event listener that gives users the ability to click a button to
   "like" a toy. When the button is clicked, the number of likes should be
   updated in the database and the updated information should be rendered to the
   DOM   */ 
    fetch('http://localhost:3000/toys/'+ id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: likeTally.innerText
     }),
    })
      .then((response) => response.json())
      .then((json) => {console.log(json)})
      .catch((error) => {
        // handle any errors
        console.log(error)
      });
    });
  newDiv.appendChild(button);
  toyCollection.appendChild(newDiv);
  });
}
//-----------------
/*2. Hook up a form that enables users to add new toys. Create an event listener
   so that, when the form is submitted, the new toy is persisted to the database
   and a new card showing the toy is added to the DOM---done
   */
function handleFormSubmit(event) {
  event.preventDefault(); // prevent the default form submission behavior
// const toyName = document.getElementById('toyName').value; // get the value of input1
//const toyImg = document.getElementById('toyImg').innerHTML; // get the value of input2
  const form = event.target; // get the form element
  const name = form.elements[0].value; // get the value of input1
  const image = form.elements[1].value; // get the value of input2

  fetch('http://localhost:3000/toys/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
    name,
    image,
    likes: 0
   }),
  })
    .then((response) => response.json())
    .then((json) => {console.log(json), fetchToy()})
    .catch((error) => {
      // handle any errors
      console.log(error)
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const toyform = document.getElementsByClassName("add-toy-form")[0];
  toyform.addEventListener("submit", handleFormSubmit); 
});

//need thing to run functions on page load
document.addEventListener("DOMContentLoaded", myInit, true); function myInit(){ fetchToy();
 
}

