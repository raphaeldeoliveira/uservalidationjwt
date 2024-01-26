import React from "react"
import { useRef, useEffect, useState } from "react"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]){8,24}$/;


// criar uma logica na label "username" para quando o regex bater ele mostrar um icone do react icon que demonstre que esta correto (check) e caso contrario um icone de errado (uncheck)

export default function Register() {
    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [sucess, setSucess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">Username: </label>
                <input 
                    type="text" 
                    id="username" 
                    ref={userRef} 
                    autoComplete="off" 
                    onChange={(e) => setUser(e.target.value)} 
                    required 
                    aria-invalid={validName ? "false" : "true"} 
                    aria-describedby="uidnote" 
                    onFocus={() => setUserFocus(true)} 
                    onBlur={() => setUserFocus(false)} 
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    id="password" 
                    onChange={(e) => setPwd(e.target.value)} 
                    required 
                    aria-invalid={validPwd ? "false" : "true"} 
                    aria-describedby="pwdnote" 
                    onFocus={() => setPwdFocus(true)} 
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: ! @ # $ %
                </p>
            </form>
        </section>
    )
}