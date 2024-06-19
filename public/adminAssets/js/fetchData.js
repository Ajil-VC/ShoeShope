

function blockUser(userID){
    
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



function deletUser(userID){

    console.log("Inside delete user");

    if(confirm("Are you sure you want to delete this user??")){
        
        fetch( `http://localhost:2000/admin/customers/?id=${userID}`, {method : 'delete'} )
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
            console.log("There was a problem with the Deleting fetch operation",error)
        });
       
    }  
}


const btnForAddBrand = document.getElementById('btnForAddBrand');
if(btnForAddBrand){

    btnForAddBrand.addEventListener('click',() => {
    
        const inputForBrand = document.getElementById('inputForBrand').value ;
        if(inputForBrand){
            
            fetch(`http://localhost:2000/admin/category/?brand=${inputForBrand}`, {method : 'post'})
            .then(response => {
    
                if(!response.ok){
                    throw new Error("Network reponse was not ok")
                }
    
                return response.json();
            })
            .then(data => {
    
                console.log('data recieved : ',data)
                                 
            })
            .catch(error => {
                console.log("There was a problem while adding brand fetch operation",error)
            });
        
        }
    })
    


}




function listCategory(categoryID){

        fetch(`http://localhost:2000/admin/category/?categoryID=${categoryID}`, {method : 'PATCH'})
        .then(response => {
            if(!response.ok){

                throw new Error("Network response was no ok for patch request of listcategory")
            }
            return response.json();
        })
        .then(data => {

            console.log('data recieved : ',data)
                             
        })
        .catch(error => {
            console.log("There was a problem while performing listcategory fetch operation",error)
        });
}




//Open modal and cropping interface from here
document.addEventListener('DOMContentLoaded', function() {

    var openModalBtn = document.getElementById('openModalBtn');
    openModalBtn.style.display = 'none'
    var imageElement =  document.getElementById('addFirstProductImage');
    var imageCroper = document.getElementById('imageCroper');
    
    console.log(openModalBtn);
    console.log(imageElement)
    
    document.getElementById('addFirstProductImage').addEventListener('change',(e) =>{

        
            var file = e.target.files[0];
            if(!file){
           
                return;
            }
            var reader = new FileReader();
            reader.onload = (event) => {
                
                var imageUrl = event.target.result;
                imageElement.src = imageUrl;
                openModalBtn.click();

                const imageCroperContainer = document.getElementById('imageCroperContainer');
                const imageCroper = document.createElement('img');
                imageCroper.id = "imageCroper";
                imageCroper.src = imageUrl;
                imageCroper.style.width = "600px";
                imageCroperContainer.appendChild(imageCroper)
                
                // This is for Cropper

                const cropper = new Cropper(imageCroper,{
                aspectRatio: 1,
                full: true, // Cover the whole image
                autoCropArea: false // Allow free expansion
                })
    
                document.querySelector('#btn-crop').addEventListener('click',() => {
    
                var croppedImages = cropper.getCroppedCanvas().toDataURL('image/png');
                document.getElementById('output').src = croppedImages;
                document.querySelector(".cropped-container").style.display = 'flex';
                })

                // Cropper Croper ends here
            }
            reader.readAsDataURL(file);


    })

})







    const publishBtnForAddProduct = document.getElementById('publishBtnForAddProduct');
    if(publishBtnForAddProduct){

        const form = document.getElementById('formForAddNewProduct');

        publishBtnForAddProduct.addEventListener('click',() => {

            const category = document.getElementById('category').value;
            const brand = document.getElementById('brand').value;

            //Creating a hidden field to add to the form.
            const hiddenCategory = document.createElement('input');
            const hiddenBrand = document.createElement('input');

            //Adding the hidden field to the form.
            hiddenCategory.type = 'hidden';
            hiddenCategory.name = 'category';
            hiddenCategory.value = category;
            form.appendChild(hiddenCategory);

            hiddenBrand.type = 'hidden';
            hiddenBrand.name = 'brand';
            hiddenBrand.value = brand;
            form.appendChild(hiddenBrand);

            form.submit();
        })
    
    }
    











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

