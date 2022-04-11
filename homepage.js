console.log("Home page- Personal details");

localStorage.clear();
const name1 = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
let validname = false;
let validemail = false;
let validphone = false;
let url = "http://127.0.0.1:5500/multiplepage/thankupage.html";

// validate name 
name1.addEventListener('blur', () => {
    let regex = /^([a-zA-Z]){4,20}\s([a-zA-Z]){4,20}/
    let str = name1.value;
    if (regex.test(str)) {
        const shownotvalid1 = document.getElementById('shownotvalid1');
        shownotvalid1.style.display = 'none';
        validname = true;
    }
    else {
        shownotvalid1.style.display = 'block';
        validname = false;
    }
})


//validate email
email.addEventListener('blur', () => {
    let regex = /^[a-zA-Z]([_\-\.0-9a-zA-Z]+)@([\.a-z0-9]+)\.([a-z]){2,7}$/;
    let str = email.value;
    result = regex.exec(str);
    if (regex.test(str)) {
        const shownotvalid2 = document.getElementById('shownotvalid2');
        shownotvalid2.style.display = 'none';
        validemail = true;
    }
    else {
        shownotvalid2.style.display = 'block';
        validemail = false;
    }
})


//validate phone
phone.addEventListener('keyup', () => {

    let regex = /^\((62[1-9]|63[0-9]|64[0-9]|65[0-9]|66[0-9]|67[0-9]|68[0-9]|69[0-9]|7[0-9][0-9]|8[0-9][0-9]|9[0-9][0-9])\)-([0-9][0-9][0-9])-[0-9][0-9][0-9][0-9]$/;

    let stateinfo = { 0: "Andhra Pradesh", 1: "Arunachal Pradesh", 2: "Assam", 3: "Bihar", 4: "Chhaattisgarh", 5: "Goa", 6: "Gujarat", 7: "Haryana", 8: "Himachal Pradesh", 9: "Jharkhand", 10: "Karnataka", 11: "Kerala", 12: "Madhya Pradesh", 13: "Maharashtra", 14: "Manipur", 15: "Meghalaya", 16: "Mizoram", 17: "Nagaland", 18: "Odisha", 19: "Punjab", 20: "Rajasthan", 21: "Sikkim", 22: "TamilNadu", 23: "Telangana", 24: "Tripura", 25: "Uttar Pradesh", 26: "Uttarakhand", 27: "West Bengal", 28: "Andman & Nicobar", 29: "Chandigarh", 30: "Dadara & Nagar Haveli & Daman diu", 31: "Delhi", 32: "Jammu & Kashmir", 33: "Ladhak", 34: "Lakshyadweep", 35: "Pudducherry" };

    let keyevent = phone.value.length
    if (keyevent == 1) { phone.value = `(${phone.value}` };
    if (keyevent == 2) { phone.value = `${phone.value}` };
    if (keyevent == 4) { phone.value = `${phone.value})-` };
    if (keyevent == 9) { phone.value = `${phone.value}-` };

    if (keyevent > 13) {
        phone.setAttribute('readonly', true);
        let str = phone.value;
        var cmpname = str.slice(1, 4);
        result = regex.exec(str);
        let serviceprovider = '';
        if (regex.test(str)) {
            const shownotvalid3 = document.getElementById('shownotvalid3');
            shownotvalid3.style.display = 'none';
            if (cmpname > 620 && cmpname < 800) {
                serviceprovider = "Reliance Jio";
            } else {
                if (cmpname > 800 && cmpname < 921) {
                    serviceprovider = "Idea";
                }
                else {
                    if (cmpname > 920 && cmpname < 1000) {
                        serviceprovider = "Vodafone";
                    }
                }
            }
            var statename = parseInt(str.slice(6, 9));
            keystate = Math.floor(statename / 28);
            const showdetail = document.getElementById('showdetail');
            showdetail.innerHTML = `<p>${serviceprovider}, ${stateinfo[keystate]}.</p>`
            validphone = true;
        }
        else {
            shownotvalid3.style.display = 'block';
            validphone = false;
            phone.value = '';
            keyevent = 0;
            phone.removeAttribute('readonly');
        }

        phone.addEventListener('blur', () => {
            console.log("blur event");
            console.log(phone.value);
            phone.removeAttribute('readonly');
            keyevent = 0;

        })

    }
})


//On submit event
let counter = 0;
let hideold = document.getElementById('hideold');
let submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("ckicked");
    counter = counter + 1;
    // localStorage.clear();
    console.log(validname, validemail, validphone);

    if (validname && validemail && validphone) {
        console.log("submited...");
        let username = localStorage.getItem('username');
        if (username == null) {
            nameobj = [];
        }
        nameobj.push(name1.value);
        localStorage.setItem('username', JSON.stringify(nameobj));

        let phonename = localStorage.getItem('phonename');
        if (phonename == null) {
            phoneobj = [];
        }
        phoneobj.push(phone.value);
        localStorage.setItem('phonename', JSON.stringify(phoneobj));
        name1.value = '';
        email.value = '';
        phone.value = '';
        window.location.href = url;
    }
    else {
        let newele = document.createElement('p');
        newele.innerText = "**(Fill all fields)";
        newele.style.color = 'red';
        newele.style.fontSize = '14px';
        newele.style.fontStyle = 'italic';
        if (counter < 2) {
            hideold.appendChild(newele);
        }
    }
})



