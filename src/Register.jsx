import React from "react"
import { useRef, useEffect, useState } from "react"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]){8,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])[a-zA-Z0-9!@#$%]{8,24}$/;

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        console.log(`user: ${user} password: ${pwd}`);
        setSucess(true);
        // faz o post no backend com API fetch (try catch)
    }

    return (
        <>
            {sucess ? (
                <section>
                    <h1>Sucess!</h1>
                    {/* Inves dessa section com um link para a pagina de login podemos usar o Redirect do react router para redirecionar para o componente de Login */}
                </section>
            ) : (
                <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
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

                <label htmlFor="confirm_pwd">Password: </label>
                <input 
                    type="password" 
                    id="confirm_pwd" 
                    onChange={(e) => setMatchPwd(e.target.value)} 
                    required 
                    aria-invalid={validMatch ? "false" : "true"} 
                    aria-describedby="confirmnote" 
                    onFocus={() => setMatchFocus(true)} 
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    Must match the first password input field.
                </p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>
            <p>
                Already registered?<br />
                <span className="line">
                    {/* aqui coloca o Link da Route para a pagina de criar conta */}
                    <a href="#">Sign in</a>
                </span>
            </p>
        </section>
            )}
        </>
        
    )
}