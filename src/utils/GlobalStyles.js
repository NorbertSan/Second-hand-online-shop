import { createGlobalStyle } from "styled-components";
import theme from "utils/theme";

const GlobalStyles = createGlobalStyle`
    *,*::after,*::before{
        box-sizing:border-box;
    }
    html{
        font-size:62.5%;
        overflow-x:hidden;
        min-height:100vh;
    }
    body{
        min-height:100vh;
        overflow-x:hidden;
        font-size:1.6rem;
        font-family: 'Roboto', sans-serif;
        background:${theme.colors.whiteish};
        color:${theme.colors.blackish};
        margin:0;
        width:100vw;
    }  
    a{
        text-decoration:none!important;
        color:${theme.colors.blackish}!important;
    }
`;

export default GlobalStyles;
