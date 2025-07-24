import { Button, Card } from "@mui/material";

const Login = () => {
    const loginWithSpotify = async () => {
        window.location.href = "http://127.0.0.1:9090/oauth2/authorization/spotify";
    }

    return(
        <Card className="flex flex-col w-[25%] py-[10%] justify-self-center items-center rounded mt-[8%] gap-18">
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
        </Card>
    )
}

export default Login;``