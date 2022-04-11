console.log("Welcome about page");
let validotp = false;
let validblankfield = false;
let validdigitlength = false;


//Get user data from localstorage
let username = localStorage.getItem('username');
let setname = JSON.parse(username);
let str = setname[0];
let regspace = /\s/;
let result1 = regspace.exec(str)
var firstname = str.slice(0, result1.index);
let phonename = localStorage.getItem('phonename');
let setphone = JSON.parse(phonename);

//show details on thanku page 
let userinfo = document.getElementById('userinfo');
let html = `<P>Dear ${firstname}, <br> Thank for your inquiry. A 4 digit verification number has been sent to your phone number, ${setphone[0]}. <br> Please enter in the following box and submit for confirmation: </P>`
userinfo.innerHTML = html;

//otp generate
let otpnumber = Math.floor(1000 + Math.random() * 9000);
console.log(otpnumber);

//Check otp entered
let otp = document.getElementById('otp');
let validate = document.getElementById('validate');

otp.addEventListener('blur', (e) => {
    e.preventDefault();
    let regex = /[0-9][0-9][0-9][0-9]/;
    let str = otp.value;
        if(otp.value.length==0){
            otp.value='';
        validblankfield = false;
        otpin("**Field should not blank");
        }
        else{
            validblankfield=true
        }
        
        if(otp.value.length>4){
        otp.value='';
        validdigitlength=false;
        otpin("**Didit should not greater than 4");
        }
        else{validdigitlength=true};
    if (regex.test(str)) {
        validotp = true;
    }
    else {
        validotp = false;
        otpin("**Number only valid atlist 4 digit");
    }
})


//Validate otp
validate.addEventListener('click', (e) => {
    e.preventDefault();
    if(validotp&&validblankfield&&validdigitlength){
    if (otpnumber == otp.value) {
        setTimeout(() => {
            shownew.innerHTML = "<h3>Validation Successfull!!</h3>";
        }, 1000);
        // localStorage.clear();
        window.location.href = "http://pixel6.co";
    }
    else {
        let otpfail = document.getElementById('otpfail');
        otp.value = '';

        let notes = localStorage.getItem('notes');
        if (notes == null) {
            notesobj = [];
        }
        else {
            notesobj = JSON.parse(notes);
        }
        notesobj.push(1);
        localStorage.setItem("notes", JSON.stringify(notesobj));

        if (notesobj.length < 3) {
           otpcheck();
        }
        if (notesobj.length >= 3) {
            invalidotp();
        }
    }
}
})

//called after 3 invalid attempts
function invalidotp() {
    setTimeout(() => {
        shownew.innerHTML = "<h2>404(page not found)</h2>";
    }, 500);
    // localStorage.clear();
    window.location.href = "http://pixel6.co";
}

function otpcheck(){
    let newele = document.createElement('p');
    newele.innerText = `**Renter correct otp - you have ${3 - notesobj.length} attemts remaining`;
    newele.style.color = 'red';
    newele.style.fontSize = '14px';
    newele.style.fontStyle = 'italic';
    otpfail.appendChild(newele);
    otp.addEventListener('blur', () => {
        newele.style.display = 'none';
    })
}

function otpin(msg){
    let newele = document.createElement('p');
    newele.innerText = `${msg}`;
    newele.style.color = 'red';
    newele.style.fontSize = '14px';
    newele.style.fontStyle = 'italic';
    otpfail.appendChild(newele);
    otp.addEventListener('blur', () => {
        newele.style.display = 'none';
    })

}