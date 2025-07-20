import { Button } from "@mui/material";

const Login = () => {
    const loginWithSpotify = async () => {
        window.location.href = "http://127.0.0.1:9090/oauth2/authorization/spotify";
    }

    return(
        <div className="flex flex-col w-[25%] py-[10%] justify-self-center items-center rounded mt-[8%] border-2 border-[#32a88d] gap-18">
            <img src="/spotify.png" width="80px" height="80px" />
            <p className="font-mono text-[30px] font-bold">Login with Spotify</p>
            <Button variant="outlined" sx={{ 
                borderRadius: "8px",
                width: "50%",
                padding: "20px"
            }}
            onClick={loginWithSpotify}
            >
                Login
            </Button>
        </div>
    )
}

export default Login;