import { auth, onAuthStateChanged, db, setDoc, doc, collection, addDoc, onSnapshot, deleteDoc , signOut } from "./FireBaseConfig.js";

//  user info 
let userFullname = document.getElementById('user-fullname')
let userEmail = document.getElementById('user-email')
let userAge = document.getElementById('user-age')
let userCity = document.getElementById('user-city')
let userProfession = document.getElementById('user-profession')
let userId = document.getElementById('user-id')

//  Add User
let usersIdArray = JSON.parse(localStorage.getItem('usersIdArray')) || [];

// Helper functions SweetAlert ke liye
const showLoader = (message) => {
    Swal.fire({
        title: message,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
};

const showErrorAlert = (message) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    });
};

let addUserBtn = document.getElementById('form-submit-btn')

const addUserInfo = async () => {
    if (!userId.value || !userFullname.value) {
        showErrorAlert("Please fill in the required fields (User ID & Name).");
        return;
    }

    const userObject = {
        userName: userFullname.value,
        userEmail: userEmail.value,
        userAge: userAge.value,
        userCity: userCity.value,
        userProfession: userProfession.value,
        userId: userId.value
    }

    let user_id = userId.value;

    // Loader Shuru
    showLoader('Saving user data...');

    try {
        await setDoc(doc(db, "users", userId.value), {
            ...userObject,
            userId: user_id
        });

        usersIdArray.push(user_id);
        localStorage.setItem('usersIdArray', JSON.stringify(usersIdArray));

        Swal.fire({
            icon: 'success',
            title: 'Saved!',
            text: 'User added successfully.',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            window.location.reload();
        });

    } catch (error) {
        console.log(error);
        showErrorAlert(error.message);
    }
    
    document.getElementById('user-fullname').value = '';
    document.getElementById('user-email').value = '';
    document.getElementById('user-age').value = '';
    document.getElementById('user-city').value = '';
    document.getElementById('user-profession').value = '';
    document.getElementById('user-id').value = '';
}

addUserBtn.addEventListener('click', addUserInfo)


//    Get User Data (With Loader)
const getUserData = () => {
    const tableBody = document.getElementById('users-table-body');
    tableBody.innerHTML = "";
    
    let localStorageUid = JSON.parse(localStorage.getItem('usersIdArray'))
    console.log(localStorageUid);

    // Agar local storage me koi IDs nahi hain, to loader dikhane ki zaroorat nahi
    if (!localStorageUid || localStorageUid.length === 0) {
        console.log('No users found');
        return;
    }
    
    // 1. DATA GET/SHOW KARTE WAQT LOADER SHURU
    showLoader('Fetching users data...');

    let loadedCount = 0; // Yeh track rakhne ke liye ke saare users load ho chuke hain ya nahi

    localStorageUid.forEach(element => {
        try {
            onSnapshot(doc(db, "users", element), (docSnap) => {
                console.log("Current data: ", docSnap.data());
                
                // Har user ke load hone par count barhayenge
                loadedCount++; 

                // 2. JAB SAARE USERS KA DATA AA JAYE, TO LOADER BAND KAR DEIN
                if (loadedCount === localStorageUid.length) {
                    Swal.close();
                }

                if (!docSnap.exists()) return;

                const id = docSnap.id;
                const data = docSnap.data();
                
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${data.userName || 'N/A'}</td>
                    <td>${data.userEmail || 'N/A'}</td>
                    <td>${data.userAge || 'N/A'}</td>
                    <td>${data.userCity || 'N/A'}</td>
                    <td>${data.userProfession || 'N/A'}</td>
                    <td>${data.userId || 'N/A'}</td>
                    <td>
                        <div class="action-btns">
                            <button class="btn-tbl btn-delete dltDataBtnClass" data-id="${id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                `;
                
                setTimeout(() => {
                    let dltBtn = tr.querySelector('.dltDataBtnClass');
                    if (dltBtn) {
                        dltBtn.addEventListener('click', async () => {
                            
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!'
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    
                                    showLoader('Deleting user...');
                                    
                                    try {
                                        await deleteDoc(doc(db, "users", element));
                                        tr.remove();
                                        usersIdArray = usersIdArray.filter(id => id !== element);
                                        localStorage.setItem('usersIdArray', JSON.stringify(usersIdArray));
                                        
                                        Swal.fire(
                                            'Deleted!',
                                            'User has been deleted.',
                                            'success'
                                        ).then(() => {
                                            window.location.reload();
                                        });

                                    } catch (error) {
                                        console.log(error);
                                        showErrorAlert(error.message);
                                    }
                                }
                            });
                        });
                    }
                }, 500);
                
                tableBody.appendChild(tr);
            });
        } catch (error) {
            console.log(error);
            Swal.close(); // Error aane par bhi loader band ho jaye
        }
    });
}
getUserData()


//  sign Out 
let logOutBtn = document.getElementById('logout-btn')
logOutBtn.addEventListener('click' , () => {
    showLoader('Logging out...');
    signOut(auth).then(() => {
        Swal.close();
        window.location.replace("index.html");
    }).catch((error) => {
        showErrorAlert(error.message);
    });
})


//   FireBAse User Check
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        let emailDisplay = document.getElementById('user-display-email')
        if(emailDisplay) emailDisplay.innerText = user.email;
    } else {
        // ...
    }
});