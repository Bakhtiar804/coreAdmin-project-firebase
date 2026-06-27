import { auth, onAuthStateChanged, db, setDoc, doc, collection, addDoc, onSnapshot, deleteDoc } from "./FireBaseConfig.js";


//  user info 

let userFullname = document.getElementById('user-fullname')
let userEmail = document.getElementById('user-email')
let userAge = document.getElementById('user-age')
let userCity = document.getElementById('user-city')
let userProfession = document.getElementById('user-profession')
let userId = document.getElementById('user-id')


//  Add User


let usersIdArray = JSON.parse(localStorage.getItem('usersIdArray')) || [];



let addUserBtn = document.getElementById('form-submit-btn')

const addUserInfo = async () => {

    const userObject = {
        userName: userFullname.value,
        userEmail: userEmail.value,
        userAge: userAge.value,
        userCity: userCity.value,
        userProfession: userProfession.value,
        userId: userId.value
    }

    let user_id = userId.value;

   

    try {
        await setDoc(doc(db, "users", userId.value), {
            ...userObject,
            userId: user_id

        });

         usersIdArray.push(user_id);

        localStorage.setItem('usersIdArray', JSON.stringify(usersIdArray));
        // getUserData(user_id)
    } catch (error) {
        console.log(error)
    }
    window.location.reload();
    document.getElementById('user-fullname').value = '';
    document.getElementById('user-email').value = '';
    document.getElementById('user-age').value = '';
    document.getElementById('user-city').value = '';
    document.getElementById('user-profession').value = '';
    document.getElementById('user-id').value = '';


}

addUserBtn.addEventListener('click', addUserInfo)




//    Get User Data 

const getUserData = () => {

    const tableBody = document.getElementById('users-table-body');

    tableBody.innerHTML = "";
    //  if (!localStorageUid) {
    //         return;
    //     }

    let localStorageUid = JSON.parse(localStorage.getItem('usersIdArray'))

console.log(localStorageUid);

localStorageUid.forEach(element => {
    


        try {


            onSnapshot(doc(db, "users", element), (doc) => {
                console.log("Current data: ", doc.data());

                const id = doc.id;
                const data = doc.data();

                //    Display Data

                const tr = document.createElement('tr');

                tr.innerHTML += `
        <td>${data.userName || 'N/A'}</td>
        <td>${data.userEmail || 'N/A'}</td>
        <td>${data.userAge || 'N/A'}</td>
        <td>${data.userCity || 'N/A'}</td>
        <td>${data.userProfession || 'N/A'}</td>
        <td>${data.userId || 'N/A'}</td>
        <td>
            <div class="action-btns">
                <button id="dltDataBtn" class="btn-tbl btn-delete" data-id="${id}"><i class="fas fa-trash"></i></button>
            </div>
        </td>
    `;

                tableBody.appendChild(tr);

                // dltData(element)
            });
        } catch (error) {
            console.log(error);
        }
    });



}
getUserData()




//    Delete Data



    setTimeout(() => {

        let dltDataBtn = document.getElementById('dltDataBtn')


const dltData = async (userSpecificId) => {

    console.log(userSpecificId);
    
    try {
        
        await deleteDoc(doc(db, "users", userSpecificId));
        localStorage.removeItem(userSpecificId)
        window.location.reload();
        // const tr = document.createElement('tr');
        // tr.innerHTML = ''

    } catch (error) {
        console.log(error);

    }


};



        dltDataBtn.addEventListener('click', dltData)
    }, 7000)





    // setTimeout(() => {


    // }, 9000);





//   FireBAse User Check



onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        let emailDisplay = document.getElementById('user-display-email')
        emailDisplay.innerText = user.email;
        // ...
    } else {
        // User is signed out
        // ...
    }
});