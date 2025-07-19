
const Login = () => {

    const loginWithSpotify = async () => {
        window.location.href = "http://127.0.0.1:9090/oauth2/authorization/spotify";
    }

    return(
        <div>
            <p>
                Login
            </p>
            <button onClick={loginWithSpotify}>
                Login with Spotify
            </button>
        </div>
    )
}

export default Login;