import { dark_mode,light_mode } from './ThemePack'

export const themeChecker=()=>{
   
    const userTheme=localStorage.getItem("theme");
    const systemTheme=window.matchMedia("(prefers-color-scheme:dark)").matches;
    if(userTheme==="dark" ||(!userTheme && systemTheme)){
        return "dark"
    }
    else{
        return "light"
    }
}

export const handleThemeToggle=(currentTheme)=>{
    
    if(currentTheme==='dark'){
            localStorage.setItem("theme","light")
            return "light"
        
    }
    else{
            localStorage.setItem("theme","dark")
            return "dark"
    }
}

const themeHandler=()=>{
    const theme=localStorage.getItem('theme')
    if(theme==='dark'){
        return dark_mode
    }else{
        return light_mode
    }
}

export const windowViewWidthChecker=()=>{
    const windowWidth=window.innerWidth
    if(windowWidth>768){
        return true
    }
    else{
        return false
    }

}
