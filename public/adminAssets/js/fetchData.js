
function clearExistingRows() {
    $('#UsersTable').empty(); // Remove all child elements from the element with ID 'Users'
    //This is JQUERY
}


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
    
    const users = document.getElementById('UsersTable')

    clearExistingRows()//Clearing existing tabledata to prevent add to the existing
    data.forEach(user => {
        
        const tr = document.createElement('tr');
        const tdAvatar = document.createElement('td');
        tdAvatar.style.width = '40%';

        tdAvatar.innerHTML = `
        
            <a href="#" class="itemside">
                  <div class="left">
                    <img src="/adminAssets/imgs/people/avatar1.jpg" class="img-sm img-avatar" alt="Userpic">
                </div>
                <div class="info pl-3">

                    <h6 class="mb-0 title">${user.firstName} ${user.lastName}</h6>
                                             
                    <small class="text-muted">Seller ID: #439</small>
                </div>
            </a>

        `

        tr.appendChild(tdAvatar)

        users.appendChild(tr)
    });


/* <tr>
                                    <td width="40%">
                                        
                                    </td>


                                    <td>eleanor2022@example.com</td>
                                 
                                    <td>08.07.2022</td>
                                    <td class="text-end">
                                        <a href="#" class="btn btn-sm btn-brand rounded font-sm mt-15">Block</a>
                                        <a href="#" class="btn btn-sm btn-brand rounded font-sm mt-15 DangerRed">Delete</a>
                                    </td>
                                </tr> */
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
