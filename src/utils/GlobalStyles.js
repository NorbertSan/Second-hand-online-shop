import { createGlobalStyle } from "styled-components";
import theme from "utils/theme";

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');
    *,*::after,*::before{
        box-sizing:border-box;
    }
    html{
        font-size:62.5%;
        overflow-x:hidden;
    }
    body{
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
