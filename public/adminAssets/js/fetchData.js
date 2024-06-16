
const users = document.getElementById('Users')

function fetchData(query){

    fetch(`http://localhost:2000/admin/customers/?query=${query}`)
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


const customerSearch = document.getElementById('customerSearch');
customerSearch.addEventListener('input',(event) => {

    const query = event.target.value;
    fetchData(query)
})

