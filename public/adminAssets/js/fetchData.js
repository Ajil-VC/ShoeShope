function fetchData(btnValue){
    console.log("Fetchdata Function working")
    console.log(user[btnValue]);
    console.log(user);

    const userID = user[btnValue]._id;
    
    fetch(`http://localhost:2000/admin/customers/?id=${userID}`, {method : 'PATCH'})
    .then(response => {
    if(!response.ok){
        throw new Error("Network response was not ok")
    }
   
    return response.json();  
})
.then(data => {
    console.log('data recieved : ',data)
                             
})
.catch(error => {
    console.log("There was a problem with the fetch operation",error)
});

}



document.querySelectorAll('.BlockBtn').forEach(button => {

    button.addEventListener('click',(event) => {

        event.preventDefault();
        const blockBtn = event.currentTarget.dataset.blockBtn; 
        console.log(blockBtn)

        fetchData(blockBtn);
    })
})








// function clearExistingRows() {
//     $('#UsersTable').empty(); // Remove all child elements from the element with ID 'Users'
//     //This is JQUERY
// }



// function fetchData(page){
//     console.log("Hellloo",page)
//     fetch(`http://localhost:2000/admin/customers/?page=${page}`)
//     .then(response => {
//     if(!response.ok){
//         throw new Error("Network response was not ok")
//     }
   
//     return response.json();  
// })
// .then(data => {
//     console.log('data recieved : ',data)
                             
// })
// .catch(error => {
//     console.log("There was a problem with the fetch operation",error)
// });

// }

// document.addEventListener('DOMContentLoaded',() => {
//     console.log("How are you")
//     fetchData(1);
// });

// const customerSearch = document.getElementById('customerSearch');
// customerSearch.addEventListener('input',(event) => {

//     const query = event.target.value;
//     fetchData(query)
// })

