const loadPhone = async (searchText) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);

}



const displayPhones = phones => {
    //  console.log(phones)

    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 10 phone
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length >10){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    // display only first 12 phones
    phones=phones.slice(0,10)

    phones.forEach(phone => {
        console.log(phone);

        // 2.create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl p-4 m-4`

        //3. set inner html
        phoneCard.innerHTML = `<figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-neutral">Show details</button>
        </div>
    </div>`

        // 4.appendChild
        phoneContainer.appendChild(phoneCard)

    })

    // hide loading spinner
    loadingSpinner(false);

}

// phone show details

const handleShowDetails =async (id)=> {
//  load single phone data
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
const data = await res.json();
const phone = data.data;
showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `<img src=" ${phone.image}" alt = "" />
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
        <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>`



    my_modal.showModal();
}


// handle search button

const handleSearch = () =>{
    loadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}


const loadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

