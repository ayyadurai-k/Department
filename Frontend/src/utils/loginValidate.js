

const loginValidate = (input) => {
    let error = {}
    const { email, password } = input;

    if (!email.trim()) {
        error.email="Email is Required!"
    }
    else if(!email.includes("@maduracollege.edu.in")) {
        error.custom="Invalid Crendetials !"
    }

    if (!password.trim()) {
        error.password="Password is Required !"
    }
    else if (password.length < 6) {
        error.password="Enter Valid Password"
    }
    return error;
}

export default loginValidate