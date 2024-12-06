import { Link } from "react-router-dom"
import { useTeamContext } from "../Context/TeamContext"
import { useEffect } from "react";



export const AppHeader = () => {

    const {teamColor} = useTeamContext()

    useEffect(() => {
        if (teamColor) {
          document.documentElement.style.setProperty('--team-color', teamColor);
        }
      }, [teamColor]);

    return(
        <section className="w-full min-h-[10svh] bg-dynamic flex items-center justify-center md:min-h-[8svh]">
            
                <Link to='/'
                className="w-[30%] md:w-[20%] lg:w-[180px]"
                >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/F1_%28white%29.svg/1280px-F1_%28white%29.svg.png" alt="" 
                className=""
                />
                </Link>


                
            
        </section>
    )
}